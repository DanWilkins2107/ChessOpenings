import { useEffect, useState } from "react";
import Container from "../components/Container";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import getMoveListFromNode from "../functions/test/getMoveListFromNode";
import checkForFullConfidenceMoveList from "../functions/test/checkForFullConfidenceMoveList";
import { Chess } from "chess.js";
import Chessboard from "../components/chessboard/Chessboard";
import updateBranchConfidenceScores from "../functions/test/updateBranchConfidenceScores";
import minimumConfidenceScore from "../functions/test/minimumConfidenceScore";
import calculateOverallConfidence from "../functions/test/calculateOverallConfidence";
import getDataForTraining from "../functions/fetch/setUpTraining";
import otherColorMoveInstructions from "../functions/test/otherColorMoveInstructions";
import pause from "../functions/test/pause";

const TrainScreen = ({ navigation, route }) => {
    const [initialLoad, setInitialLoad] = useState(true);
    const [selectedBranches, setSelectedBranches] = useState([]);
    const [unselectedBranches, setUnselectedBranches] = useState([]);
    const [finishedBranches, setFinishedBranches] = useState([]);
    const [testStyle, setTestStyle] = useState("branch");
    const [splits, setSplits] = useState([]);
    const [whiteSplits, setWhiteSplits] = useState([]);
    const [blackSplits, setBlackSplits] = useState([]);
    const [mistakes, setMistakes] = useState([]);
    const [moveList, setMoveList] = useState([]);
    const [moveIndex, setMoveIndex] = useState(0);
    const [boardPOV, setBoardPOV] = useState("white");
    const [chess, _setChess] = useState(new Chess());
    const [isCorrect, setIsCorrect] = useState(true);
    const [trackedBranchesSelected, setTrackedBranchesSelected] = useState([]);
    const [trackedBranchesUnselected, setTrackedBranchesUnselected] = useState([]);
    const [trackedBranchesFinished, setTrackedBranchesFinished] = useState([]);
    const [trees, setTrees] = useState([]);
    const [overallTree, setOverallTree] = useState({});
    const [overallConfidences, setOverallConfidences] = useState({});
    const [splitChildMoveList, setSplitChildMoveList] = useState([]);
    const [whiteTree, setWhiteTree] = useState({});
    const [blackTree, setBlackTree] = useState({});
    const [forceRender, setForceRender] = useState(false); // State to force re-render

    useEffect(() => {
        const initialize = async () => {
            const chosenPGNs = route.params.chosenPGNs || null;
            const {
                selectedBranchArray,
                finishedBranchArray,
                unselectedBranchArray,
                whiteSplits,
                blackSplits,
                mistakeNodeArray,
                treeArray,
                whiteCombinedTree,
                blackCombinedTree,
            } = await getDataForTraining(chosenPGNs);

            setSelectedBranches(selectedBranchArray);
            setUnselectedBranches(unselectedBranchArray);
            setFinishedBranches(finishedBranchArray);
            setWhiteSplits(whiteSplits);
            setBlackSplits(blackSplits);
            setMistakes(mistakeNodeArray);
            setTrees(treeArray);
            setWhiteTree(whiteCombinedTree);
            setBlackTree(blackCombinedTree);

            setTrackedBranchesFinished(finishedBranchArray);
            setTrackedBranchesSelected(selectedBranchArray);
            setTrackedBranchesUnselected(unselectedBranchArray);

            selectMovesToTest(
                selectedBranchArray,
                unselectedBranchArray,
                whiteSplits,
                blackSplits,
                whiteCombinedTree,
                blackCombinedTree
            );
        };

        initialize();
    }, []);

    const selectMovesToTest = (
        selectedBranches,
        unselectedBranches,
        whiteSplits,
        blackSplits,
        whiteCombinedTree,
        blackCombinedTree
    ) => {
        if (selectedBranches.length === 0) {
            if (unselectedBranches.length === 0) {
                console.log("Finished");
            } else {
                const randomIndex = Math.floor(Math.random() * unselectedBranches.length);
                selectedBranches.push(unselectedBranches[randomIndex]);
                unselectedBranches.splice(randomIndex, 1);
            }
        }

        const minConfidenceObj = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
        };

        selectedBranches.forEach((branch) => {
            const minConfidence = minimumConfidenceScore(branch);
            minConfidenceObj[minConfidence].push(branch);
        });

        if (blackSplits.length !== 0) {
            const selectedBlackSplit = blackSplits[Math.floor(Math.random() * blackSplits.length)];
            setTestStyle("split");
            setUpSplitTest(selectedBlackSplit, "black");
            return;
        }

        const confidenceWeightings = {
            0: 2,
            1: 1.5,
            2: 1,
            3: 0.7,
            4: 0.5,
        };

        let randomValueCap = 0;
        for (let i = 0; i < 5; i++) {
            randomValueCap += confidenceWeightings[i] * minConfidenceObj[i].length;
        }

        const randomNumber = Math.random() * randomValueCap;

        let currentSum = 0;
        let selectedBranch = null;
        for (let i = 0; i < 5; i++) {
            currentSum += confidenceWeightings[i] * minConfidenceObj[i].length;

            if (randomNumber < currentSum) {
                const randomIndex = Math.floor(Math.random() * minConfidenceObj[i].length);
                selectedBranch = minConfidenceObj[i][randomIndex];
                break;
            }
        }

        if (randomValueCap < 15) {
            if (unselectedBranches.length > 0) {
                const randomIndex = Math.floor(Math.random() * unselectedBranches.length);
                selectedBranches.push(unselectedBranches[randomIndex]);
                unselectedBranches.splice(randomIndex, 1);
            }
        }

        setTestStyle("otherColor");
        setUpOtherColorTest(selectedBranch, whiteCombinedTree, blackCombinedTree);
        setSelectedBranches(selectedBranches);
        setUnselectedBranches(unselectedBranches);

        setTestStyle("branch");
        setUpBranchTest(selectedBranch);
        setSelectedBranches(selectedBranches);
        setUnselectedBranches(unselectedBranches);
    };

    const setUpBranchTest = (branch) => {
        const moveList = getMoveListFromNode(branch.endNode, branch.color);
        const move = checkForFullConfidenceMoveList(moveList, branch.color);

        setMoveIndex(moveIndex, branch.color);
        setBoardPOV(branch.color);
        setMoveList(moveList);
        setMoveIndex(move);
        chess.reset();

        for (let i = 0; i < move; i++) {
            chess.move(moveList[i].move);
        }
        const colorNo = branch.color === "white" ? 1 : 0;
        if (move % 2 === colorNo) {
            chess.move(moveList[move].move);
            setMoveIndex(move + 1);
        }

        setForceRender((prev) => !prev);
    };

    const setUpSplitTest = (split, color) => {
        chess.reset();
        const moveList = getMoveListFromNode(split, color);
        setMoveList(moveList);

        setBoardPOV(color);

        const childMoveObj = {};
        split.children.forEach((child) => {
            childMoveObj[child.move] = false;
        });
        setSplitChildMoveList(childMoveObj);

        const moves = [];

        for (let i = 0; i < moveList.length; i++) {
            chess.move(moveList[i].move);
            moves.push(moveList[i].move);
        }

        setForceRender((prev) => !prev);
    };

    const setUpOtherColorTest = (branch, whiteCombinedTree, blackCombinedTree) => {
        chess.reset();
        const povColor = branch.color === "white" ? "black" : "white";
        const moveList = getMoveListFromNode(branch.endNode, povColor);
        const { instructionArray, isTestable } = otherColorMoveInstructions(
            moveList,
            povColor === "white" ? blackCombinedTree : whiteCombinedTree,
            povColor
        );

        if (!isTestable) {
            console.log("NOT TESTABLE IMPLEMENT BACK TO START HERE!");
        }
        setBoardPOV(branch.color);
        setMoveList(instructionArray);
        setMoveIndex(0);

        setForceRender((prev) => !prev);
    };

    const moveFunction = (from, to) => {
        if (testStyle === "branch") {
            branchMoveFunction(from, to);
        } else if (testStyle === "split") {
            splitMoveFunction(from, to);
        } else if (testStyle === "otherColor") {
            otherMoveFunction(from, to);
        }
    };

    const otherColorHelper = async (moveList, tempMoveIndex) => {
        if (tempMoveIndex >= moveList.length) {
            console.log("End of Line");
            return;
        }
        if (moveList[tempMoveIndex].instruction === "test") {
            setMoveIndex(tempMoveIndex);
            return;
        }
        await pause(500);
        console.log(moveList[tempMoveIndex].move);
        chess.move(moveList[tempMoveIndex].move);
        setForceRender((prev) => !prev);
        otherColorHelper(moveList, tempMoveIndex + 1);
    };

    const otherMoveFunction = (from, to) => {
        let move = chess.move({ from: from, to: to });
        if (move.san === moveList[moveIndex].move) {
            console.log("Correct");
            otherColorHelper(moveList, moveIndex + 1);
        } else {
            chess.undo();
        }
    };

    const splitMoveFunction = (from, to) => {
        let move = chess.move({ from: from, to: to });
        if (Object.keys(splitChildMoveList).includes(move.san)) {
            if (splitChildMoveList[move.san]) {
                console.log("Already Moved!");
                chess.undo();
            } else {
                console.log("Correct!");
                const newMoveObj = { ...splitChildMoveList, [move.san]: true };
                setSplitChildMoveList(newMoveObj);
                let allMoved = true;
                const moveList = Object.keys(newMoveObj);
                for (let i = 0; i < moveList.length; i++) {
                    if (!newMoveObj[moveList[i]]) {
                        allMoved = false;
                    }
                }
                if (allMoved) {
                    selectMovesToTest(
                        selectedBranches,
                        unselectedBranches,
                        whiteSplits,
                        blackSplits,
                        mistakes
                    );
                } else {
                    chess.undo();
                }
            }
        } else {
            console.log("Incorrect Move!");
            chess.undo();
        }
    };

    const branchMoveFunction = (from, to) => {
        let move = null;
        try {
            move = chess.move({ from: from, to: to });
        } catch (error) {
            return;
        }

        if (move.san === moveList[moveIndex].move) {
            const {
                newTrackedBranchesUnselected,
                newTrackedBranchesSelected,
                newTrackedBranchesFinished,
                newUnselectedBranches,
                newSelectedBranches,
                newFinishedBranches,
            } = updateBranchConfidenceScores(
                trackedBranchesUnselected,
                trackedBranchesSelected,
                trackedBranchesFinished,

                unselectedBranches,
                selectedBranches,
                finishedBranches,

                isCorrect,
                moveList,
                moveIndex,

                trees
            );

            setSelectedBranches(newSelectedBranches);
            setUnselectedBranches(newUnselectedBranches);
            setFinishedBranches(newFinishedBranches);
            setTrackedBranchesSelected(newTrackedBranchesSelected);
            setTrackedBranchesUnselected(newTrackedBranchesUnselected);
            setTrackedBranchesFinished(newTrackedBranchesFinished);

            setIsCorrect(true);
            if (moveIndex >= moveList.length - 2) {
                selectMovesToTest(newSelectedBranches, newUnselectedBranches, splits, mistakes);
            } else {
                const nextMove = moveList[moveIndex + 1];
                chess.move(nextMove.move);
                setMoveIndex((moveIndex) => moveIndex + 2);
            }
        } else {
            setIsCorrect(false);
            chess.undo();
        }
    };

    return (
        <Container>
            <View>
                <Chessboard
                    chess={chess}
                    moveFunction={moveFunction}
                    backgroundColor={"white"}
                    pov={boardPOV}
                    key={forceRender} // Force re-render by changing key
                />
                {testStyle === "branch" ||
                    (testStyle === "otherColor" && (
                        <Text style={styles.text}>{JSON.stringify(moveList)}</Text>
                    ))}
                {testStyle === "branch" ||
                    (testStyle === "otherColor" && (
                        <Text style={styles.text}>{JSON.stringify(moveIndex)}</Text>
                    ))}
                {testStyle === "split" && <Text style={styles.text}>SPLITTIME</Text>}

                {testStyle === "split" && (
                    <Text style={styles.text}>{JSON.stringify(splitChildMoveList)}</Text>
                )}
            </View>
            <ScrollView style={styles.scroll} contentContainerStyle={{ flexGrow: 1, height: 400 }}>
                {trees.map((tree) => {
                    const confidenceScore = calculateOverallConfidence(tree.tree, tree.color);
                    return (
                        <Text style={styles.text} key={tree.pgnUUID}>
                            {confidenceScore} {tree.chapterName}
                        </Text>
                    );
                })}
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    text: {
        color: "white",
    },
    scroll: {
        flex: 1,
        backgroundColor: "green",
        width: "100%",
    },
});

export default TrainScreen;
