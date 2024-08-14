import { useEffect, useState, useContext } from "react";
import Container from "../components/Container";
import { Text, View, StyleSheet } from "react-native";
import { auth, db } from "../firebase";
import { ref, get } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import pgnToTree from "../functions/tree/pgnToTree";
import { Chess } from "chess.js";
import Chessboard from "../components/chessboard/chessboard";
import { AlertContext } from "../components/alert/AlertContextProvider";

import getBranchEnds from "../functions/test/getBranchEnds";
import getMoveListFromNode from "../functions/test/getMoveListFromNode";

const TrainScreen = ({ navigation, route }) => {
    const chosenPGNs = route.params.chosenPGNs || null;
    const [chapters, setChapters] = useState(chosenPGNs);
    const [loading, setLoading] = useState(true);
    const [trees, setTrees] = useState([]);
    const [chess, setChess] = useState(new Chess());
    const [backgroundColor, setBackgroundColor] = useState("white");
    const [pov, setPov] = useState("w");
    const [chessboardLoading, setChessboardLoading] = useState(true);

    const [currentMoveList, setCurrentMoveList] = useState([]);
    const [currentMoveIndex, setCurrentMoveIndex] = useState(null);
    const [currentColorToTest, setCurrentColorToTest] = useState("white");

    const [typeOfTest, setTypeOfTest] = useState(null)

    const [branchEnds, setBranchEnds] = useState([]);

    const { setAlert } = useContext(AlertContext);

    const handleChooseBranchEnd = (line) => {
        // TODO: Improve algorithm
        const randomBranch = branchEnds[Math.floor(Math.random() * branchEnds.length)];
        const moveList = getMoveListFromNode(randomBranch);
        setCurrentMoveList(moveList);
        setCurrentMoveIndex(0);
        chess.reset();
    };

    useEffect(() => {
        const setStudies = async () => {
            let pgnData = [];
            if (!chosenPGNs) {
                try {
                    const userStudiesRef = ref(db, `users/${auth.currentUser.uid}/studies`);
                    const snapshot = await get(userStudiesRef);
                    const studyUUIDs = Object.keys(snapshot.val());
                    await Promise.all(
                        studyUUIDs.map(async (studyUUID) => {
                            const studyRef = ref(db, `studies/${studyUUID}`);
                            const studySnapshot = await get(studyRef);
                            const chapters = studySnapshot.val().chapters;
                            const color = studySnapshot.val().color;

                            chapters.forEach((chapter) => {
                                const chapterString = chapter.pgn + color;
                                pgnData.push(chapterString);
                            });
                        })
                    );
                } catch (error) {
                    console.error(error);
                }
            } else {
                pgnData = chosenPGNs;
            }

            const chapterInfo = [];

            for (const pgnString of pgnData) {
                const color = pgnString.slice(-5);
                const pgnUUID = pgnString.slice(0, -5);

                const chapterObj = {
                    pgnUUID: pgnUUID,
                    color: color,
                };
                chapterInfo.push(chapterObj);
            }

            setChapters(chapterInfo);

            const treeArray = [];

            const treePromises = chapterInfo.map(async (chapter) => {
                // Check AsyncStorage for pgn
                const pgnAsync = await AsyncStorage.getItem("pgnData/" + chapter.pgnUUID);
                if (pgnAsync) {
                    const tree = pgnToTree(JSON.parse(pgnAsync));
                    treeArray.push(tree);
                } else {
                    const pgnRef = ref(db, `pgns/${chapter.pgnUUID}`);
                    const pgnSnapshot = await get(pgnRef);
                    if (!pgnSnapshot.exists()) {
                        return;
                    }
                    const pgn = pgnSnapshot.val();
                    const tree = pgnToTree(pgn);
                    treeArray.push(tree);
                }
            });

            await Promise.all(treePromises);
            setTrees(treeArray);

            const branchArray = [];

            if (treeArray.length === 0) {
                setAlert("No moves were found", "red");
                navigation.navigate("Dashboard");
            }

            for (const tree of treeArray) {
                const ends = getBranchEnds(tree);
                branchArray.push(...ends);
            }

            setBranchEnds(branchArray);
            setLoading(false);
        };

        setStudies();
    }, []);

    useEffect(() => {
        if (branchEnds.length > 0) {
            handleChooseBranchEnd();
        }
    }, [branchEnds]);

    useEffect(() => {
        if (currentMoveList.length > 0) {
            chess.reset();
        }
    }, [currentMoveList]);

    useEffect(() => {
        const isUserMove =
            currentColorToTest === "white"
                ? currentMoveIndex % 2 === 0
                : currentMoveIndex % 2 === 1;

        const moveToMake = currentMoveList[currentMoveIndex];

        if (!isUserMove) {
            try {
                if (!moveToMake) {
                    console.log("END OF LINE");
                    handleChooseBranchEnd();
                    return;
                }
                chess.move(moveToMake);
                setCurrentMoveIndex((currentMoveIndex) => currentMoveIndex + 1);
            } catch (error) {
                console.log(error);
            }
        } else {
            if (!moveToMake) {
                console.log("END OF LINE");
                handleChooseBranchEnd();
                return;
            }
        }
    }, [currentMoveIndex]);

    const moveFunction = (from, to) => {
        try {
            const move = chess.move({ from: from, to: to, promotion: "q" });
            const moveSAN = move.san;

            if (moveSAN === currentMoveList[currentMoveIndex]) {
                setCurrentMoveIndex((currentMoveIndex) => currentMoveIndex + 1);
            } else {
                console.log("Wrong move");
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
                    backgroundColor={backgroundColor}
                    pov={pov}
                />
                <Text style={styles.text}>{JSON.stringify(currentMoveList)}</Text>
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
