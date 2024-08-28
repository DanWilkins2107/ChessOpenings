import Chessboard from "../components/chessboard/Chessboard";
import Container from "../components/Container";
import { Chess } from "chess.js";
import { StyleSheet } from "react-native";
import MessageBox from "../components/chessboard/MessageBox.jsx";
import { Colors, Fonts } from "../styling";
import ProgressBar from "../components/training/ProgressBar.jsx";
import CurrentStudyViewer from "../components/training/CurrentStudyViewer.jsx";
import HintAndSkipButtons from "../components/training/HintAndSkipButtons.jsx";

export default function Training() {
    const chess = new Chess();
    const chessboardLoading = false;

    return (
        <Container theme="light" style={styles.container}>
            <Chessboard
                chess={chess}
                chessboardLoading={chessboardLoading}
                pov="white"
                style={styles.chessBoard}
                moveFunction={() => {
                    console.log("Move function");
                }}
            />
            <MessageBox
                message="White to Move"
                backgroundColor={Colors.card1}
                textColor={Colors.text}
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
