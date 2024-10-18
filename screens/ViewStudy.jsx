import { useState, useEffect, useContext } from "react";
import Container from "../components/containers/Container";
import Subheading from "../components/text/Subheading";
import { StyleSheet, View, Text } from "react-native";
import Chessboard from "../components/chessboard/Chessboard";
import { Chess } from "chess.js";
import Navigation from "../components/studies/Navigation";
import getStudyDataFromStudyUUID from "../functions/fetch/getStudyDataFromStudyUUID";
import getPGNfromPGNUUID from "../functions/fetch/getPGNfromPGNUUID";
import pgnToTree from "../functions/tree/pgnToTree";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabSelector from "../components/studies/TabSelector";
import Card from "../components/containers/Card";
import {
    handleDoubleLeftPress,
    handleDoubleRightPress,
    navigateToChildNode,
    navigateToParentNode,
} from "../functions/tree/treeFunctions";
import MoveList from "../components/studies/MoveList";
import ChapterSelector from "../components/studies/ChapterSelector";
import OpacityPressable from "../components/genericButtons/OpacityPressable";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../styling";
import { ref, set } from "firebase/database";
import { db } from "../firebase";
import { AlertContext } from "../components/alert/AlertContextProvider";
import deleteChapter from "../functions/set/deleteChapter";
import addChapterToStudy from "../functions/set/addChapterToStudy";
import { ModalContext } from "../components/modal/ModalContextProvider";
import StudyOptionsModal from "../components/studies/StudyOptionsModal";
import saveTreesToDb from "../functions/test/saveTreesToDb";
import OpeningExplorer from "../components/studies/OpeningExplorer";
import EngineAnalysis from "../components/studies/EngineAnalysis";

export default function ViewStudy({ navigation, route }) {
    const studyUUID = route.params.studyUUID;

    const [studyLoading, setStudyLoading] = useState(true);
    const [boardLoading, setBoardLoading] = useState(true);

    const [studyData, setStudyData] = useState({});
    const [chess] = useState(new Chess());
    const [currentChapter, setCurrentChapter] = useState(0);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const { setAlert } = useContext(AlertContext);
    const { setModal } = useContext(ModalContext);

    const [currentNode, setCurrentNode] = useState({
        move: "Start",
        children: [],
        parent: null,
    });
    const [pov, setPov] = useState("white");

    // Set up study
    useEffect(() => {
        const setUpStudy = async () => {
            const studyData = await getStudyDataFromStudyUUID(studyUUID);
            setStudyData(studyData);
        };
        setUpStudy();
    }, []);

    // Set up PGN
    useEffect(() => {
        const getPGN = async () => {
            // This line is needed to prevent the function from running before the study data is set
            if (!studyData.chapters) return;

            const chapterPGN = studyData.chapters[currentChapter]?.pgn;

            const asyncStorageData = await AsyncStorage.getItem("pgnData/" + chapterPGN);

            if (asyncStorageData) {
                const tree = pgnToTree(JSON.parse(asyncStorageData));
                setPov(studyData.color);
                setCurrentNode(tree);
                setStudyLoading(false);
                setBoardLoading(false);
            } else {
                const pgn = await getPGNfromPGNUUID(chapterPGN);
                const tree = pgnToTree(pgn);
                setPov(studyData.color);
                setCurrentNode(tree);
                setStudyLoading(false);
                setBoardLoading(false);
            }
        };
        setBoardLoading(true);
        chess.reset();
        getPGN();
    }, [studyData, currentChapter]);

    // Functions for editing chapters
    const onEditChapter = async (newName, index) => {
        const chapterRef = ref(
            db,
            "studies/" + route.params.studyUUID + "/chapters/" + index + "/name"
        );
        try {
            await set(chapterRef, newName);
        } catch (error) {
            console.log(error);
            setAlert("Error editing chapter name", "red");
            return;
        }

        const newChapters = [...studyData.chapters];
        newChapters[index].name = newName;
        setStudyData({ ...studyData, chapters: newChapters });
    };

    const onDeleteChapter = async (index) => {
        if (studyData.chapters.length === 1) {
            setAlert("Cannot delete last chapter", "red");
            return;
        }
        try {
            await deleteChapter(route.params.studyUUID, studyData, index, setStudyData);
            if (index > studyData.chapters.length - 1) {
                setCurrentChapter(studyData.chapters.length - 1);
            }
        } catch (error) {
            setAlert("Error deleting chapter", "red");
        }
    };

    const onAddChapter = async (chapterName, chapterPGN) => {
        if (!chapterName) {
            setAlert("Please enter a chapter name.", "red");
            return;
        }

        try {
            await addChapterToStudy(
                route.params.studyUUID,
                studyData,
                chapterName,
                chapterPGN,
                setStudyData
            );
            setAlert("Chapter added successfully.", "green");
            setCurrentChapter(studyData.chapters.length - 1);
            setModal(null);
        } catch (error) {
            setAlert(error.message || "Error adding chapter.", "red");
        }
    };

    const moveWithSanFunction = async (san) => {
        let move;
        try {
            move = chess.move(san);
        } catch {
            return;
        }

        const updateNeeded = navigateToChildNode(
            move.san,
            currentNode,
            setCurrentNode,
            chess,
            false
        );
        if (updateNeeded) {
            saveTreesToDb(currentNode, studyData.chapters[currentChapter].pgn);
        }
    };

    const moveFunction = async (from, to) => {
        let move;
        try {
            move = chess.move({ from: from, to: to });
        } catch {
            return;
        }
        const updateNeeded = navigateToChildNode(
            move.san,
            currentNode,
            setCurrentNode,
            chess,
            false
        );
        if (updateNeeded) {
            saveTreesToDb(currentNode, studyData.chapters[currentChapter].pgn);
        }
    };

    return (
        <Container theme="light" style={styles.container}>
            <View style={styles.subheadingView}>
                <Subheading style={styles.title}>
                    {studyLoading ? "Loading Study..." : studyData.title}
                </Subheading>
                <OpacityPressable
                    shadow={false}
                    onPress={() => {
                        setModal(
                            <StudyOptionsModal
                                study={studyData}
                                studyUUID={studyUUID}
                                setStudy={setStudyData}
                                navigation={navigation}
                            />
                        );
                    }}
                >
                    <Icon name="cog" size={22} color={Colors.text} />
                </OpacityPressable>
            </View>
            <Chessboard
                chess={chess}
                chessboardLoading={boardLoading}
                pov={pov}
                moveFunction={moveFunction}
                onTopHeight={46}
                style={styles.chessboard}
            />
            <Navigation
                onDoubleLeftPress={() => handleDoubleLeftPress(currentNode, setCurrentNode, chess)}
                onLeftPress={() => {
                    navigateToParentNode(currentNode, setCurrentNode, chess);
                }}
                onFlipPress={() => setPov(pov === "white" ? "black" : "white")}
                onRightPress={() => {
                    navigateToChildNode(null, currentNode, setCurrentNode, chess, true);
                }}
                onDoubleRightPress={() => {
                    handleDoubleRightPress(currentNode, setCurrentNode, chess);
                }}
            />
            <Card style={styles.bottomSection} padding={false}>
                {selectedTabIndex === 0 && (
                    <MoveList
                        currentNode={currentNode}
                        setCurrentNode={setCurrentNode}
                        chess={chess}
                        onSave={() => {
                            saveTreesToDb(currentNode, studyData.chapters[currentChapter].pgn);
                        }}
                    />
                )}
                {selectedTabIndex === 1 && (
                    <OpeningExplorer chess={chess} onPress={moveWithSanFunction} />
                )}
                {selectedTabIndex === 2 && <EngineAnalysis chess={chess} />}
                {selectedTabIndex === 3 && (
                    <ChapterSelector
                        chapters={studyData.chapters}
                        currentChapter={currentChapter}
                        setCurrentChapter={setCurrentChapter}
                        addChapterFunction={onAddChapter}
                        editChapterFunction={onEditChapter}
                        deleteChapterFunction={onDeleteChapter}
                    />
                )}
                <TabSelector selectedTab={selectedTabIndex} setSelectedTab={setSelectedTabIndex} />
            </Card>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 10,
    },
    subheadingView: {
        height: 26,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: 10,
    },
    chessboard: {
        marginBottom: 10,
    },
    bottomSection: {
        flex: 1,
        marginVertical: 10,
    },
});
