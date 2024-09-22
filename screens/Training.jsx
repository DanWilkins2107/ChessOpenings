import Chessboard from "../components/chessboard/Chessboard";
import Container from "../components/Container";
import { Chess } from "chess.js";
import { StyleSheet } from "react-native";
import MessageBox from "../components/chessboard/MessageBox.jsx";
import { Colors, Fonts } from "../styling";
import ProgressBar from "../components/training/ProgressBar.jsx";
import CurrentStudyViewer from "../components/training/CurrentStudyViewer.jsx";
import HintAndSkipButtons from "../components/training/HintAndSkipButtons.jsx";
import { useEffect, useState } from "react";
import getStudyStringArray from "../functions/fetch/getStudyStringArray.js";
import setUpTraining from "../functions/fetch/setUpTraining.js";
import getTrainingTrees from "../functions/fetch/getTrainingTrees.js";
import chooseLineToTrain from "../functions/test/chooseLineToTrain.js";
import { set } from "firebase/database";

export default function Training({ route }) {
    const [chess, _setChess] = useState(new Chess());
    const [chessboardLoading, setChessboardLoading] = useState(true);

    // Branch Array contains all branches
    const [branchObj, setBranchObj] = useState({ unselected: [], selected: [], finished: [] });
    const [splitObj, setSplitObj] = useState({ unselected: [], selected: [], finished: [] });
    const [otherBranchObj, setOtherBranchObj] = useState({
        unselected: [],
        selected: [],
        finished: [],
    });
    const [whiteCombinedTree, setWhiteCombinedTree] = useState({});
    const [blackCombinedTree, setBlackCombinedTree] = useState({});

    const [typeOfTraining, setTypeOfTraining] = useState("");
    const [currentItem, setCurrentItem] = useState({});

    useEffect(() => {
        const initialize = async () => {
            const studyStringArray = route?.params?.chosenPGNs || (await getStudyStringArray());
            const trees = await getTrainingTrees(studyStringArray);

            const { branchObj, splitObj, otherBranchObj, whiteCombinedTree, blackCombinedTree } =
                await setUpTraining(trees);

            const { typeOfTraining, chosenItem } = chooseLineToTrain(
                branchObj,
                splitObj,
                otherBranchObj,
                15
            );

            setTypeOfTraining(typeOfTraining);
            setCurrentItem(chosenItem);

            setBranchObj(branchObj);
            setSplitObj(splitObj);
            setOtherBranchObj(otherBranchObj);
            setWhiteCombinedTree(whiteCombinedTree);
            setBlackCombinedTree(blackCombinedTree);

            setChessboardLoading(false);
        };
        initialize();
    }, []);

    return (
        <Container theme="light" style={styles.container}>
            <Chessboard
                chess={chess}
                chessboardLoading={chessboardLoading}
                pov="white"
                style={styles.chessBoard}
                moveFunction={() => {
                    console.log("Move function");
                }}
            />
            <MessageBox
                message="White to Move"
                backgroundColor={Colors.card1}
                textColor={Colors.text}
                style={styles.messageBox}
            />
            <HintAndSkipButtons style={styles.hintAndSkipButtons} />

            <CurrentStudyViewer style={styles.studyViewer} />

            <ProgressBar progress={50} style={styles.progressBar} />
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    chessBoard: {
        marginTop: 10,
    },
    hintAndSkipButtons: {
        marginTop: 10,
    },
    button: {
        flex: 1,
        backgroundColor: Colors.card2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: Colors.text,
        fontFamily: Fonts.main,
        fontSize: 22,
    },
    studyViewer: {
        marginTop: 10,
    },
    messageBox: {
        marginTop: 10,
    },
    progressBar: {
        marginTop: 10,
    },
});
