import { useState, useEffect } from "react";
import Container from "../components/Container";
import Subheading from "../components/text/Subheading";
import { StyleSheet, View, Text } from "react-native";
import Chessboard from "../components/chessboard/Chessboard";
import { Chess } from "chess.js";
import Navigation from "../components/studies/Navigation";
import getStudyDataFromStudyUUID from "../functions/fetch/getStudyDataFromStudyUUID";
import getPGNfromPGNUUID from "../functions/fetch/getPGNfromPGNUUID";
import pgnToTree from "../functions/tree/pgnToTree";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ViewStudy({ navigation, route }) {
    const [studyLoading, setStudyLoading] = useState(true);
    const [boardLoading, setBoardLoading] = useState(true);

    const [studyData, setStudyData] = useState({});
    const [chess] = useState(new Chess());
    const [currentChapter, setCurrentChapter] = useState(0);

    const [currentNode, setCurrentNode] = useState({
        move: "Start",
        children: [],
        parent: null,
    });
    const [pov, setPov] = useState("white");

    // Set up study
    useEffect(() => {
        const setUpStudy = async () => {
            const studyUUID = route.params.studyUUID;
            const studyData = await getStudyDataFromStudyUUID(studyUUID);
            console.log(studyData);
            setStudyData(studyData);
        };
        setUpStudy();
    }, []);

    // Set up PGN
    useEffect(() => {
        const getPGN = async () => {
            // This line is needed to prevent the function from running before the study data is set
            if (!studyData.chapters) return;

            const chapterPGN = studyData.chapters[currentChapter].pgn;

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
        getPGN();
    }, [studyData, currentChapter]);

    return (
        <Container theme="light" style={styles.container}>
            <View style={styles.subheadingView}>
                <Subheading style={styles.title}>
                    {studyLoading ? "Loading Study..." : studyData.title}
                </Subheading>
            </View>
            <Chessboard
                chess={chess}
                chessboardLoading={boardLoading}
                pov={pov}
                moveFunction={() => {}}
                onTopHeight={46}
                style={styles.chessboard}
            />
            <Navigation />
            <Text>TODO: STUFF NEEDS TO BE LOOKED AT! IDK WHAT I WANT IT TO LOOK LIKE YET </Text>
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
    },
    chessboard: {
        marginBottom: 10,
    },
});
