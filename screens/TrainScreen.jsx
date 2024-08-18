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
import checkForFullConfidence from "../functions/test/checkForFullConfidence";
import { Chess } from "chess.js";
import Chessboard from "../components/chessboard/chessboard";

const TrainScreen = ({ navigation, route }) => {

    const [initialLoad, setInitialLoad] = useState(true);
    const [selectedBranches, setSelectedBranches] = useState([]);
    const [unselectedBranches, setUnselectedBranches] = useState([]);
    const [testStyle, setTestStyle] = useState("branch");
    const [splits, setSplits] = useState([]);
    const [mistakes, setMistakes] = useState([]);
    const [moveList, setMoveList] = useState([]);
    const [moveIndex, setMoveIndex] = useState(0);
    const [boardPOV, setBoardPOV] = useState("white");
    const [chess, _setChess] = useState(new Chess());



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
                        if (end.confidence === 0) {
                            unselectedBranchArray.push({
                                endNode: end.endNode,
                                color: color,
                                title: title,
                                chapterName: chapterName,
                            });
                        } else {
                            selectedBranchArray.push({
                                endNode: end.endNode,
                                color: color,
                                title: title,
                                chapterName: chapterName,
                            });
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
            setSplits(splitArray);
            setMistakes(mistakeNodeArray);

            selectMovesToTest(selectedBranchArray, unselectedBranchArray, splitArray, mistakeNodeArray);
        };
        initialize();
    }, []);

    const selectMovesToTest = (selectedBranches, unselectedBranches, splits, mistakes) => {
        //  For now, just select the first branch from unselectedBranches. This will be changed later.
        const branchToTest = unselectedBranches[0];
        setTestStyle("branch");
        setUpBranchTest(branchToTest);
    }

    const setUpBranchTest = (branch) => {
        const moveList = getMoveListFromNode(branch.endNode, branch.color);
        const move = checkForFullConfidence(moveList);
        if (move === -1) {
            //  TODO: DEAL WITH FULLY CONFIDENT BRANCH
        } else {
            setMoveIndex(moveIndex, branch.color);
            setBoardPOV(branch.color);
            setMoveList(moveList);
            setMoveIndex(move);
        }
    }

    // useEffect(() => {
    //     if (!branchEnds) {
    //         return;
    //     }
    //     const isUserMove =
    //         currentColorToTest === "white"
    //             ? currentMoveIndex % 2 === 0
    //             : currentMoveIndex % 2 === 1;

    //     const moveToMake = currentMoveList[currentMoveIndex];

    //     if (!isUserMove) {
    //         try {
    //             if (!moveToMake) {
    //                 handleChooseBranchEnd();
    //                 return;
    //             }
    //             chess.move(moveToMake);
    //             setCurrentMoveIndex((currentMoveIndex) => currentMoveIndex + 1);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     } else {
    //         if (!moveToMake) {
    //             handleChooseBranchEnd(branchEnds);
    //             return;
    //         }
    //     }
    // }, [currentMoveIndex]);

    // const moveFunction = (from, to) => {
    //     try {
    //         const move = chess.move({ from: from, to: to, promotion: "q" });
    //         const moveSAN = move.san;

    //         if (moveSAN === moveList[curren]) {
    //             setCurrentMoveIndex((currentMoveIndex) => currentMoveIndex + 1);
    //         } else {
    //             chess.undo();
    //         }
    //     } catch (error) {}
    // };
    const moveFunction = (from, to) => {
        try {
            const move = chess.move({ from: from, to: to })
            if (move.san === moveList[moveIndex].move) {
                setMoveIndex((moveIndex) => moveIndex + 1);
                
                // Deal with the confidences for every single move.

            } else {
                chess.undo();
            }
        } catch (error) {}
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
