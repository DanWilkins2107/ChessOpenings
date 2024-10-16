import Chessboard from "../components/chessboard/Chessboard.jsx";
import Container from "../components/containers/Container";
import { Chess } from "chess.js";
import { ScrollView, StyleSheet, Text } from "react-native";
import MessageBox from "../components/chessboard/MessageBox.jsx";
import { Colors, Fonts } from "../styling";
import BottomProgressBar from "../components/training/BottomProgressBar.jsx";
import HintAndSkipButtons from "../components/training/HintAndSkipButtons.jsx";
import { useEffect, useState } from "react";
import getStudyStringArray from "../functions/fetch/getStudyStringArray.js";
import setUpTraining from "../functions/fetch/setUpTraining.js";
import getTrainingTrees from "../functions/fetch/getTrainingTrees.js";
import chooseLineToTrain from "../functions/test/chooseLineToTrain.js";
import setUpBranchTest from "../functions/test/setUpBranchTest.js";
import validateBranchMove from "../functions/test/validateBranchMove.js";
import pause from "../functions/test/pause.js";
import updateBranchScores from "../functions/test/updateBranchScores.js";
import setUpSplitTest from "../functions/test/setUpSplitTest.js";
import validateSplitMove from "../functions/test/validateSplitMove.js";
import checkRepeatedSplitMove from "../functions/test/checkRepeatedSplitMove.js";
import isSplitFinished from "../functions/test/isSplitFinished.js";
import setUpOtherBranchTest from "../functions/test/setUpOtherBranchTest.js";
import otherBranchSkipMoves from "../functions/test/otherBranchSkipMoves.js";
import { MessageBoxContext } from "../components/chessboard/MessageBoxContextProvider.jsx";
import { useContext } from "react";
import updateSplitScores from "../functions/test/updateSplitScores.js";
import updateOtherBranchScores from "../functions/test/updateOtherBranchScores.js";
import checkAllSplits from "../functions/test/checkAllSplits.js";
import createConfidenceObj from "../functions/test/createConfidenceObj.js";

export default function Training({ navigation, route }) {
    const [chess, setChess] = useState(new Chess());
    const [chessboardLoading, setChessboardLoading] = useState(true);
    const [pov, setPov] = useState("white");
    const [forceRerender, setForceRerender] = useState(false);

    const [trees, setTrees] = useState([]);

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

    // States for the Message Box
    const [streak, setStreak] = useState(0);
    const { permMessage, temp, setPermMessage, setTempMessage } = useContext(MessageBoxContext);

    // State Management for during training
    const [moveList, setMoveList] = useState([]);
    const [moveIndex, setMoveIndex] = useState(0);
    const [isMoveCorrect, setIsMoveCorrect] = useState(true);

    const [confidenceScore, setConfidenceScore] = useState(0);
    const [confidenceScoreObj, setConfidenceScoreObj] = useState({});

    useEffect(() => {
        const initialize = async () => {
            setPermMessage({
                message: "Setting up Training...",
                backgroundColor: Colors.card1,
                textColor: Colors.text,
            });
            const studyStringArray = route?.params?.chosenPGNs || (await getStudyStringArray());
            const trees = await getTrainingTrees(studyStringArray);
            setTrees(trees);

            const { branchObj, splitObj, otherBranchObj, whiteCombinedTree, blackCombinedTree } =
                await setUpTraining(trees);

            createTraining(
                branchObj,
                splitObj,
                otherBranchObj,
                whiteCombinedTree,
                blackCombinedTree,
                trees
            );

            setBranchObj(branchObj);
            setSplitObj(splitObj);
            setOtherBranchObj(otherBranchObj);
            setWhiteCombinedTree(whiteCombinedTree);
            setBlackCombinedTree(blackCombinedTree);

            setChessboardLoading(false);
        };
        initialize();
    }, []);

    const createTraining = (
        branchObj,
        splitObj,
        otherBranchObj,
        whiteCombinedTree,
        blackCombinedTree,
        trees
    ) => {
        const { typeOfTraining, chosenItem } = chooseLineToTrain(
            branchObj,
            splitObj,
            otherBranchObj,
            15
        );
        setTypeOfTraining(typeOfTraining);
        setCurrentItem(chosenItem);
        console.log("Type of Training: ", typeOfTraining);
        const { score, confidenceObj } = createConfidenceObj(trees);
        setConfidenceScoreObj(confidenceObj);
        setConfidenceScore(score);

        setupBoard(typeOfTraining, chosenItem, whiteCombinedTree, blackCombinedTree);
    };

    const setupBoard = (typeOfTraining, chosenItem, whiteCombinedTree, blackCombinedTree) => {
        if (typeOfTraining === "branch") {
            setUpBranchTest(chosenItem, chess, setPermMessage, setPov, setMoveList, setMoveIndex);
            setCurrentItem(chosenItem);
        } else if (typeOfTraining === "split") {
            setUpSplitTest(chosenItem, chess, setPermMessage, setPov, setMoveList);
            setIsMoveCorrect(true);
        } else if (typeOfTraining === "otherBranch") {
            setUpOtherBranchTest(
                chosenItem,
                chess,
                setPermMessage,
                setPov,
                setMoveList,
                setMoveIndex,
                whiteCombinedTree,
                blackCombinedTree
            );
            setIsMoveCorrect(true);
        }
    };

    const moveFunction = async (from, to) => {
        if (typeOfTraining === "branch") {
            if (
                validateBranchMove(
                    from,
                    to,
                    chess,
                    moveList,
                    moveIndex,
                    setTempMessage,
                    streak,
                    setStreak
                )
            ) {
                setIsMoveCorrect(true);
                const newBranchObj = updateBranchScores(
                    branchObj,
                    whiteCombinedTree,
                    blackCombinedTree,
                    splitObj,
                    otherBranchObj,
                    isMoveCorrect,
                    moveList,
                    moveIndex,
                    trees,
                    currentItem.color
                );
                setBranchObj(newBranchObj);
                if (moveIndex + 2 < moveList.length) {
                    await pause(200);
                    chess.move(moveList[moveIndex + 1].move);
                    setForceRerender(!forceRerender);
                    setMoveIndex(moveIndex + 2);
                } else {
                    createTraining(
                        branchObj,
                        splitObj,
                        otherBranchObj,
                        whiteCombinedTree,
                        blackCombinedTree,
                        trees
                    );
                }
            } else {
                setIsMoveCorrect(false);
            }
        } else if (typeOfTraining === "split") {
            const move = validateSplitMove(from, to, chess, moveList, setTempMessage);
            if (move) {
                const repeated = checkRepeatedSplitMove(move, moveList, setTempMessage);
                if (!repeated) {
                    setTempMessage({
                        message: `Correct Move! ${streak + 1} in a Row.`,
                        backgroundColor: Colors.correctMove,
                        textColor: Colors.correctMoveText,
                    });
                    setStreak((streak) => streak + 1);
                    moveList.forEach((splitMoveObj) => {
                        if (splitMoveObj.move === move) {
                            splitMoveObj.guessed = true;
                            if (isMoveCorrect) {
                                splitMoveObj.correct = true;
                            }
                        }
                    });
                    const finished = isSplitFinished(moveList);
                    if (finished) {
                        updateSplitScores(
                            currentItem,
                            moveList,
                            trees,
                            whiteCombinedTree,
                            blackCombinedTree
                        );
                        // Check split status and move
                        const newSplitObj = checkAllSplits(splitObj);
                        setSplitObj(newSplitObj);
                        createTraining(
                            branchObj,
                            newSplitObj,
                            otherBranchObj,
                            whiteCombinedTree,
                            blackCombinedTree,
                            trees
                        );
                    } else {
                        chess.undo();
                    }
                } else {
                    chess.undo();
                }
            } else {
                setIsMoveCorrect(false);
                setStreak(0);
                chess.undo();
            }
        } else if (typeOfTraining === "otherBranch") {
            if (
                validateBranchMove(
                    from,
                    to,
                    chess,
                    moveList,
                    moveIndex,
                    setTempMessage,
                    streak,
                    setStreak
                )
            ) {
                updateOtherBranchScores(
                    moveList,
                    moveIndex,
                    isMoveCorrect,
                    trees,
                    whiteCombinedTree,
                    blackCombinedTree,
                    currentItem.color
                );
                if (moveIndex + 2 < moveList.length) {
                    const newMoveIndex = await otherBranchSkipMoves(
                        chess,
                        moveList,
                        moveIndex,
                        forceRerender,
                        setForceRerender
                    );
                    setMoveIndex(newMoveIndex);
                    if (!newMoveIndex) {
                        createTraining(
                            branchObj,
                            splitObj,
                            otherBranchObj,
                            whiteCombinedTree,
                            blackCombinedTree,
                            trees
                        );
                    }
                } else {
                    createTraining(
                        branchObj,
                        splitObj,
                        otherBranchObj,
                        whiteCombinedTree,
                        blackCombinedTree,
                        trees
                    );
                }
            } else {
                setIsMoveCorrect(false);
            }
        }
    };

    return (
        <Container theme="light" style={styles.container}>
            <Chessboard
                chess={chess}
                chessboardLoading={chessboardLoading}
                pov={pov}
                style={styles.chessBoard}
                moveFunction={moveFunction}
                key={forceRerender}
            />
            <MessageBox tempObj={temp} permObj={permMessage} style={styles.messageBox} />
            <HintAndSkipButtons style={styles.hintAndSkipButtons} />

            {/* <CurrentStudyViewer style={styles.studyViewer} /> */}
            <ScrollView>
                <Text>{JSON.stringify(moveList)}</Text>
            </ScrollView>

            <BottomProgressBar
                progress={confidenceScore}
                style={styles.progressBar}
                progressObj={confidenceScoreObj}
                whiteCombinedTree={whiteCombinedTree}
                blackCombinedTree={blackCombinedTree}
                onReset={() => {
                    const confidenceObj = createConfidenceObj(trees);
                    setConfidenceScore(confidenceObj.score);
                    setConfidenceScoreObj(confidenceObj.confidenceObj);
                }}
            />
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
