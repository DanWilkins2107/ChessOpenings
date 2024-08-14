import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { Chess } from "chess.js";
import Chessboard from "../components/chessboard/chessboard.jsx";
import Container from "../components/Container.jsx";
import MessageBox from "../components/chessboard/messagebox.jsx";
import MoveNavigator from "../components/studies/MoveNavigator.jsx";
import Navigation from "../components/studies/Navigation.jsx";
import { navigateToParentNode, navigateToChildNode } from "../functions/tree/treeFunctions";
import treeToPgn from "../functions/tree/treeToPgn.js";
import { db } from "../firebase";
import { get, ref, set } from "firebase/database";
import MoveList from "../components/studies/MoveList.jsx";
import { AlertContext } from "../components/alert/AlertContextProvider";
import pgnToTree from "../functions/tree/pgnToTree.js";
import TabSelector from "../components/studies/TabSelector.jsx";
import Colors from "../colors.js";
import ChapterSelector from "../components/studies/ChapterSelector.jsx";
import StudyOptions from "../components/studies/StudyOptions.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";

const ViewStudyScreen = ({ navigation, route }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [chess] = useState(new Chess());
    const [backgroundColor, setBackgroundColor] = useState("white");
    const [message, setMessage] = useState({
        text: `It's White's turn`,
        color: "black",
        backgroundColor: "white",
    });
    const tree = {
        move: "Start",
        children: [],
        parent: null,
    };
    const [currentNode, setCurrentNode] = useState(tree);
    const [pov, setPov] = useState("w");
    const { setAlert } = useContext(AlertContext);
    const [currentChapter, setCurrentChapter] = useState(null);
    const [studyLoading, setStudyLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [studyData, setStudyData] = useState({});

    // Get study info
    useEffect(() => {
        const studyUUID = route.params.study;
        const studyRef = ref(db, `studies/${studyUUID}`);
        get(studyRef).then((snapshot) => {
            if (snapshot.exists()) {
                const studyData = snapshot.val();
                setStudyData(studyData);
                studyData.color === "white" ? setPov("w") : setPov("b");
                setCurrentChapter(0);
            } else {
                setAlert("Study not Found", "red");
            }
        });
    }, []);

    // Get PGN data
    useEffect(() => {
        const getPGN = async () => {
            const chapterPGN = studyData.chapters[currentChapter].pgn;
            const pgnRef = ref(db, `pgns/${chapterPGN}`);
            chess.reset();

            const asyncStorageData = await AsyncStorage.getItem("pgnData/" + chapterPGN);
            if (asyncStorageData) {
                const tree = pgnToTree(JSON.parse(asyncStorageData));
                setCurrentNode(tree);
                setLoading(false);
                return;
            }

            get(pgnRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const pgnData = snapshot.val();
                    const tree = pgnToTree(pgnData);
                    setCurrentNode(tree);
                    setLoading(false);
                } else {
                    const tree = {
                        move: "Start",
                        children: [],
                        parent: null,
                    };
                    setCurrentNode(tree);
                    setLoading(false);
                }
            });
        };
        getPGN();
    }, [currentChapter, studyData]);

    const addChapterFunction = (name, pieceColor) => {
        let finalName = name || `Chapter ${studyData.chapters.length + 1}`;
        const newChapter = {
            name: finalName,
            pgn: randomUUID(),
            color: pieceColor,
        };
        const newChapters = [...studyData.chapters, newChapter];

        // Update the database
        try {
            const studyRef = ref(db, `studies/${route.params.study}`);
            set(studyRef, { ...studyData, chapters: newChapters });
            setStudyData({ ...studyData, chapters: newChapters });
            setCurrentChapter(newChapters.length - 1);
            setAlert("Chapter Added", "green");
        } catch (error) {
            setAlert("Could not add Chapter", "red");
        }
    };

    const uploadPgn = async () => {
        const chapterPGN = studyData.chapters[currentChapter].pgn;
        const pgnRef = ref(db, `pgns/${chapterPGN}`);
        const pgnData = treeToPgn(currentNode);
        try {
            await set(pgnRef, pgnData);
        } catch (error) {
            setAlert("Error Uploading PGN", "red");
        }

        let writingToDb = true;
        const lastUploadTime = (await AsyncStorage.getItem("lastUploadTime/" + chapterPGN)) || null;
        if (lastUploadTime) {
            const currentTime = Date.now();
            if (currentTime - Number(lastUploadTime) < 3600000) {
                writingToDb = false;
            }
        }

        if (writingToDb) {
            try {
                await Promise.all([
                    AsyncStorage.setItem("lastUploadTime/" + chapterPGN, Date.now().toString()),
                    set(ref(db, `pgns/${chapterPGN}`), pgnData),
                    AsyncStorage.removeItem("pgnData/" + chapterPGN),
                ]);
            } catch {
                setAlert("Error Uploading PGN", "red");
            }
        } else {
            try {
                await AsyncStorage.setItem("pgnData/" + chapterPGN, JSON.stringify(pgnData));
            } catch {
                setAlert("Error Uploading PGN", "red");
            }
        }
    };

    useEffect(() => {
        updateMoveMessage();
    }, [chess.turn()]);

    const updateMoveMessage = () => {
        setMessage({
            text: `It's ${chess.turn() === "w" ? "White" : "Black"}'s turn`,
            color: `${chess.turn() === "b" ? "white" : "black"}`,
            backgroundColor: `${chess.turn() === "w" ? "white" : "black"}`,
        });
    };

    const moveFunction = (from, to) => {
        try {
            const move = chess.move({ from: from, to: to });
            navigateToChildNode(move.san, currentNode, setCurrentNode, chess, false);
            uploadPgn();
        } catch (error) {}
    };

    const handleParentPress = () => {
        navigateToParentNode(currentNode, setCurrentNode, chess);
    };

    const handleRightPress = () => {
        navigateToChildNode(null, currentNode, setCurrentNode, chess, true);
    };

    const handleDoubleRightPress = () => {
        let lastChild = currentNode;
        while (lastChild.children.length > 0) {
            lastChild = lastChild.children[0];
        }
        setCurrentNode(lastChild);
        const moves = [];
        let tempNode = lastChild;
        while (tempNode.parent) {
            moves.push(tempNode.move);
            tempNode = tempNode.parent;
        }
        chess.reset();
        for (let i = moves.length - 1; i >= 0; i--) {
            chess.move(moves[i]);
        }
    };

    const handleBackToStartPress = () => {
        if (currentNode.parent) {
            let tempNode = currentNode;
            while (tempNode.parent) {
                tempNode = tempNode.parent;
                chess.undo();
            }
            setCurrentNode(tempNode);
        }
    };

    const handleDeleteChapter = (index) => {
        try {
            const newChapters = studyData.chapters.filter((_chapter, i) => i !== index);
            setStudyData({ ...studyData, chapters: newChapters });
            setCurrentChapter(index - 1 >= 0 ? index - 1 : 0);

            const chapterPGNref = ref(db, `pgns/${studyData.chapters[index].pgn}`);
            const studyRef = ref(db, `studies/${route.params.study}`);

            set(studyRef, { ...studyData, chapters: newChapters });
            set(chapterPGNref, null);
            setAlert("Chapter Deleted", "green");
        } catch (error) {
            setAlert("Could not delete chapter", "red");
        }
    };

    return (
        <Container>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{studyData.title || ""}</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.chessboardContainer}>
                    <Chessboard
                        chess={chess}
                        moveFunction={moveFunction}
                        backgroundColor={backgroundColor}
                        pov={pov}
                    />
                    {/* <MessageBox
                        message={message.text}
                        textColor={message.color}
                        backgroundColor={message.backgroundColor}
                    /> */}
                </View>
                <View style={styles.navigatorContainer}>
                    <Navigation
                        onDoubleLeftPress={handleBackToStartPress}
                        onLeftPress={handleParentPress}
                        onFlipPress={() => {
                            pov === "w" ? setPov("b") : setPov("w");
                        }}
                        onRightPress={handleRightPress}
                        onDoubleRightPress={handleDoubleRightPress}
                    />
                    <View style={styles.pagerView}>
                        <View style={styles.tab}>
                            {currentPage === 0 ? (
                                <MoveNavigator
                                    currentNode={currentNode}
                                    chess={chess}
                                    setCurrentNode={setCurrentNode}
                                    uploadPgn={uploadPgn}
                                />
                            ) : currentPage === 1 ? (
                                <MoveList
                                    currentNode={currentNode}
                                    chess={chess}
                                    setCurrentNode={setCurrentNode}
                                />
                            ) : currentPage === 2 ? (
                                <ChapterSelector
                                    chapters={studyData.chapters || []}
                                    currentChapter={currentChapter}
                                    setCurrentChapter={setCurrentChapter}
                                    addChapterFunction={addChapterFunction}
                                    deleteChapterFunction={handleDeleteChapter}
                                />
                            ) : (
                                <StudyOptions study={studyData} />
                            )}
                        </View>
                    </View>
                    <View style={styles.tabContainer}>
                        <TabSelector selectedTab={currentPage} setSelectedTab={setCurrentPage} />
                    </View>
                </View>
            </View>
        </Container>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    chessboardContainer: {
        width: "100%",
        display: "flex",
    },
    navigatorContainer: {
        width: "90%",
        flex: 1,
        display: "flex",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 10,
    },
    pagerView: {
        width: "100%",
        flex: 1,
        borderWidth: 2,
        borderBottomWidth: 0,
        borderColor: Colors.primaryBorder,
    },
    tab: {
        flex: 1,
    },
    tabContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    titleContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: Colors.primary,
        padding: 4,
        marginTop: 5,
        borderWidth: 2,
        borderColor: Colors.primaryBorder,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
};

export default ViewStudyScreen;
