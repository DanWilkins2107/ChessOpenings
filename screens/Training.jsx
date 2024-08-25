import Chessboard from "../components/chessboard2/chessboard";
import Container from "../components/Container";
import { Chess } from "chess.js";
import { StyleSheet } from "react-native";
import Title from "../components/text/Title";

export default function Training() {
    const chess = new Chess();
    const chessboardLoading = false;

    return (
        <Container theme="light" style={styles.container}>
            <Chessboard
                chess={chess}
                chessboardLoading={chessboardLoading}
                pov="black"
                style={styles.chessBoard}
            />
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
});
