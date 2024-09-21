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

export default function Training({ route }) {
    const [chess, _setChess] = useState(new Chess());
    const [chessboardLoading, setChessboardLoading] = useState(true);

    // Branch Array contains all branches
    // Branch Obj has them split into unselected, selected, finished
    // Tracked Branches then has the tracked branches
    const [branchArray, setBranchArray] = useState([]);
    const [branchObj, setBranchObj] = useState({});
    const [trackedBranches, setTrackedBranches] = useState([]);

    // When implementing:
    // 3 Types of Testing: Branch, Splits, Other Side.

    // For branches:
    // Unselected, Selected, Finished.
    // Then, we have tracked branches for updating

    // For Splits:
    // Reached?
    // We track these through the tree and child confidences
    // Initially?

    // For Other Side:
    // Track Reached Also?

    // To Start: Split into branches.
    // Run through branches and add reached marks on tree
    // Then, run through the tree and get the splits
    // Then get the other colour branches
    // Run through the tree and get the other colour branches from what is reached
    // Make sure to account for when branch is one longer (i.e do when parent is reached?)

    // We then need the branches

    useEffect(() => {
        const initialize = async () => {
            const studyStringArray = route?.params?.chosenPGNs || (await getStudyStringArray());
            const trees = await getTrainingTrees(studyStringArray);
            const { branchObj, splitObj, otherBranchObj, whiteCombinedTree, blackCombinedTree } =
                setUpTraining(trees);
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
