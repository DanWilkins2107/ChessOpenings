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

export default function Training({ route }) {
    const [chess, setChess] = useState(new Chess());
    const [chessboardLoading, setChessboardLoading] = useState(true);
    const [pov, setPov] = useState("white");
    const [forceRerender, setForceRerender] = useState(false);

    const [trees, setTrees] = useState([]);

    // Branch Array contains all branches
    const [branchObj, setBranchObj] = useState({ unselected: [], selected: [], finished: [] });
    const [trackedBranchObj, setTrackedBranchObj] = useState({
        unselected: [],
        selected: [],
        finished: [],
    });
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

    const [messageObj, setMessageObj] = useState({
        message: "Setting Up Training",
        backgroundColor: Colors.card1,
        textColor: Colors.text,
    });
    const [streak, setStreak] = useState(0);

    // State Management for during training
    const [moveList, setMoveList] = useState([]);
    const [moveIndex, setMoveIndex] = useState(0);
    const [isMoveCorrect, setIsMoveCorrect] = useState(true);

    useEffect(() => {
        const initialize = async () => {
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
                blackCombinedTree
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
        blackCombinedTree
    ) => {
        const { typeOfTraining, chosenItem } = chooseLineToTrain(
            branchObj,
            splitObj,
            otherBranchObj,
            15
        );
        setTypeOfTraining(typeOfTraining);
        setCurrentItem(chosenItem);

        setupBoard(typeOfTraining, chosenItem, whiteCombinedTree, blackCombinedTree);
    };

    const setupBoard = (typeOfTraining, chosenItem, whiteCombinedTree, blackCombinedTree) => {
        if (typeOfTraining === "branch") {
            console.log("Setting up branch test");
            setUpBranchTest(chosenItem, chess, setMessageObj, setPov, setMoveList, setMoveIndex);
            setCurrentItem(chosenItem);
            setTrackedBranchObj({
                unselected: [...branchObj.unselected],
                selected: [...branchObj.selected],
                finished: [...branchObj.finished],
            });
        } else if (typeOfTraining === "split") {
            console.log("Setting up split test");
            setUpSplitTest(chosenItem, chess, setMessageObj, setPov, setMoveList);
        } else if (typeOfTraining === "otherBranch") {
            console.log("Setting up other branch test");
            setUpOtherBranchTest(
                chosenItem,
                chess,
                setMessageObj,
                setPov,
                setMoveList,
                setMoveIndex,
                whiteCombinedTree,
                blackCombinedTree
            );
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
                    setMessageObj,
                    streak,
                    setStreak
                )
            ) {
                setIsMoveCorrect(true);
                const { newBranchObj, newTrackedBranchObj } = updateBranchScores(
                    branchObj,
                    trackedBranchObj,
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
                setTrackedBranchObj(newTrackedBranchObj);
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
                        blackCombinedTree
                    );
                }
            } else {
                setIsMoveCorrect(false);
            }
        } else if (typeOfTraining === "split") {
            const move = validateSplitMove(from, to, chess, moveList, setMessageObj);
            if (move) {
                const repeated = checkRepeatedSplitMove(move, moveList, setMessageObj);
                if (!repeated) {
                    setMessageObj({
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
                        // DEAL WITH SPLIT FINISHING CONFIDENCE AFFECTING

                        // Then restart training
                        createTraining(
                            branchObj,
                            splitObj,
                            otherBranchObj,
                            whiteCombinedTree,
                            blackCombinedTree
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
            // moveOtherBranchTest(chosenItem, chess);
            console.log("Moved on Other Branch: TODO");
            if (
                validateBranchMove(
                    from,
                    to,
                    chess,
                    moveList,
                    moveIndex,
                    setMessageObj,
                    streak,
                    setStreak
                )
            ) {
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
                            blackCombinedTree
                        );
                    }
                } else {
                    createTraining(
                        branchObj,
                        splitObj,
                        otherBranchObj,
                        whiteCombinedTree,
                        blackCombinedTree
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
            <MessageBox
                message={messageObj.message}
                backgroundColor={messageObj.backgroundColor}
                textColor={messageObj.textColor}
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
