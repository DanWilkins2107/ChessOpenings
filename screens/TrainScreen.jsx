import { useEffect, useState } from "react";
import Container from "../components/Container";
import { View, StyleSheet, Text } from "react-native";
import getUserStudies from "../functions/fetch/getUserStudies";
import getStudyDataFromStudyUUID from "../functions/fetch/getStudyDataFromStudyUUID";
import getPGNfromPGNUUID from "../functions/fetch/getPGNfromPGNUUID";
import pgnToTree from "../functions/tree/pgnToTree";
import getBranchEnds from "../functions/test/getBranchEnds";
import scanBranchForMistakes from "../functions/test/scanBranchForMistakes";
import getBranchSplits from "../functions/test/getBranchSplits";
import getMoveListFromNode from "../functions/test/getMoveListFromNode";
import checkForFullConfidenceMoveList from "../functions/test/checkForFullConfidenceMoveList";
import { Chess } from "chess.js";
import Chessboard from "../components/chessboard/chessboard";
import updateConfidenceScores from "../functions/test/updateConfidenceScores";
import findBranchCategory from "../functions/test/findInitialCategory";
import ChapterAndStudyToString from "../functions/test/chapterAndStudyToString";

const TrainScreen = ({ navigation, route }) => {
    const [initialLoad, setInitialLoad] = useState(true);
    const [selectedBranches, setSelectedBranches] = useState([]);
    const [unselectedBranches, setUnselectedBranches] = useState([]);
    const [finishedBranches, setFinishedBranches] = useState([]);
    const [testStyle, setTestStyle] = useState("branch");
    const [splits, setSplits] = useState([]);
    const [mistakes, setMistakes] = useState([]);
    const [moveList, setMoveList] = useState([]);
    const [moveIndex, setMoveIndex] = useState(0);
    const [boardPOV, setBoardPOV] = useState("white");
    const [chess, _setChess] = useState(new Chess());

    // Used for setting the confidence levels
    const [isCorrect, setIsCorrect] = useState(true);
    const [trackedBranchesSelected, setTrackedBranchesSelected] = useState([]);
    const [trackedBranchesUnselected, setTrackedBranchesUnselected] = useState([]);
    const [trackedBranchesFinished, setTrackedBranchesFinished] = useState([]);
    const [trees, setTrees] = useState([]);

    useEffect(() => {
        const initialize = async () => {
            const chosenPGNs = route.params.chosenPGNs || null;
            const pgnList = chosenPGNs || [];

            // If train all is selected
            if (!chosenPGNs) {
                const userStudies = await getUserStudies();
                const studyUUIDs = Object.keys(userStudies);

                await Promise.all(
                    studyUUIDs.map(async (studyUUID) => {
                        const studyData = await getStudyDataFromStudyUUID(studyUUID);
                        const chapters = studyData.chapters;

                        chapters.forEach((chapter) => {
                            const chapterString = ChapterAndStudyToString(chapter, studyData);
                            pgnList.push(chapterString);
                        });
                    })
                );
            }

            // Deal with pgnList
            const selectedBranchArray = [];
            const finishedBranchArray = [];
            const unselectedBranchArray = [];
            const splitArray = [];
            const mistakeNodeArray = [];
            const treeArray = [];

            await Promise.all(
                pgnList.map(async (pgnString) => {
                    const [pgnUUID, color, title, chapterName] = pgnString.split("___");
                    const pgnData = await getPGNfromPGNUUID(pgnUUID);
                    if (!pgnData) {
                        return;
                    }
                    const tree = { pgnUUID: pgnUUID, tree: pgnToTree(pgnData) };
                    treeArray.push(tree);
                    const ends = getBranchEnds(tree.tree, color);

                    ends.forEach((end) => {
                        const category = findBranchCategory(end, color, "unselected");
                        const endObj = {
                            endNode: end.endNode,
                            color: color,
                            title: title,
                            chapterName: chapterName,
                            moveNumber: end.lastMoveNumber,
                        };

                        if (category === "selected") {
                            selectedBranchArray.push(endObj);
                            const mistakeArray = scanBranchForMistakes(
                                end.endNode,
                                color,
                                end.confidence,
                                end.lastMoveNumber
                            );
                            mistakeArray.forEach((mistakeNode) => {
                                mistakeNodeArray.push({
                                    node: mistakeNode,
                                    color: color,
                                    title: title,
                                    chapterName: chapterName,
                                });
                            });
                        } else if (category === "unselected") {
                            unselectedBranchArray.push(endObj);
                        } else {
                            finishedBranchArray.push(endObj);
                        }
                    });

                    const splits = getBranchSplits(tree, color);
                    splits.forEach((split) => {
                        splitArray.push({
                            splitNode: split.node,
                            color: color,
                            title: title,
                            chapterName: chapterName,
                        });
                    });
                })
            );

            setSelectedBranches(selectedBranchArray);
            setUnselectedBranches(unselectedBranchArray);
            setFinishedBranches(finishedBranchArray);
            setSplits(splitArray);
            setMistakes(mistakeNodeArray);
            setTrees(treeArray);

            setTrackedBranchesFinished(finishedBranchArray);
            setTrackedBranchesSelected(selectedBranchArray);
            setTrackedBranchesUnselected(unselectedBranchArray);

            selectMovesToTest(
                selectedBranchArray,
                unselectedBranchArray,
                splitArray,
                mistakeNodeArray
            );
        };
        initialize();
    }, []);

    const selectMovesToTest = (selectedBranches, unselectedBranches, splits, mistakes) => {
        //  For now, just select the first branch from unselectedBranches. This will be changed later.
        if (
            (Math.random() < 0.3 || selectedBranches.length <= 2) &&
            selectedBranches.length <= 10
        ) {
            const randomIndex = Math.floor(Math.random() * unselectedBranches.length);
            selectedBranches.push(unselectedBranches[randomIndex]);
            unselectedBranches.splice(randomIndex, 1);
        }

        console.log("");
        console.log("No of unselected branches: ", unselectedBranches.length);
        console.log("No of selected branches: ", selectedBranches.length);
        console.log("No of finished branches: ", finishedBranches.length);

        const randomIndex = Math.floor(Math.random() * selectedBranches.length);
        const branchToTest = selectedBranches[randomIndex];

        setTestStyle("branch");
        setUpBranchTest(branchToTest);
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

        // Make the moves up to the move we are testing
        for (let i = 0; i < move; i++) {
            chess.move(moveList[i].move);
        }
        const colorNo = branch.color === "white" ? 1 : 0;
        if (move % 2 === colorNo) {
            chess.move(moveList[move].move);
            setMoveIndex(move + 1);
        }
    };

    const moveFunction = (from, to) => {
        let move = null;
        try {
            move = chess.move({ from: from, to: to });
        } catch (error) {
            return;
        }

        if (move.san === moveList[moveIndex].move) {
            // Deal with confidence scores
            const {
                newTrackedBranchesUnselected,
                newTrackedBranchesSelected,
                newTrackedBranchesFinished,
                newUnselectedBranches,
                newSelectedBranches,
                newFinishedBranches,
            } = updateConfidenceScores(
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
                // -2 as we make another move after this if the colour is not tested
                selectMovesToTest(newSelectedBranches, newUnselectedBranches, splits, mistakes);
            } else {
                // Deal with
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
                    pov={boardPOV === "white" ? "w" : "b"}
                />
                <Text style={styles.text}>{JSON.stringify(moveList)}</Text>
                <Text style={styles.text}>{JSON.stringify(moveIndex)}</Text>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    text: {
        color: "white",
    },
});

export default TrainScreen;
