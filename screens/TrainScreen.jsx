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
                            const chapterString =
                                chapter.pgn +
                                "___" +
                                (studyData.color || "white") +
                                "___" +
                                studyData.title +
                                "___" +
                                chapter.name;
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

            await Promise.all(
                pgnList.map(async (pgnString) => {
                    const [pgnUUID, color, title, chapterName] = pgnString.split("___");
                    const pgnData = await getPGNfromPGNUUID(pgnUUID);
                    if (!pgnData) {
                        return;
                    }
                    const tree = pgnToTree(pgnData);
                    const ends = getBranchEnds(tree, color);

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
        const branchToTest = unselectedBranches[0];
        setTestStyle("branch");
        setUpBranchTest(branchToTest);
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
            const updatedBranches = updateConfidenceScores(
                trackedBranchesUnselected,
                trackedBranchesSelected,
                trackedBranchesFinished,
                setTrackedBranchesUnselected,
                setTrackedBranchesSelected,
                setTrackedBranchesFinished,
                unselectedBranches,
                selectedBranches,
                finishedBranches,
                setUnselectedBranches,
                setSelectedBranches,
                setFinishedBranches,
                isCorrect,
                moveList,
                moveIndex
            );

            setIsCorrect(true);
            if (moveIndex >= moveList.length - 2) {
                // -2 as we make another move after this if the colour is not tested
                selectMovesToTest(selectedBranches, unselectedBranches, splits, mistakes);
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
