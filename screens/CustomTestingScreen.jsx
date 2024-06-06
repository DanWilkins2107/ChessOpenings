import Container from "../components/Container";
import { ScrollView, StyleSheet } from "react-native";
import Header from "../components/Header";
import PGNViewer from "../components/chessboard/pgnViewer";
import pgnToTree from "../functions/pgnToTree";
import { pgn1, pgn2, pgn3, pgn4 } from "../functions/test_pgn";

const CustomTestingScreen = () => {
    const pgnParser = require("pgn-parser");
    const pgn = pgn2;
    const [game] = pgnParser.parse(pgn);
    const gameMoves = game.moves;
    console.log(gameMoves)

    const tree = pgnToTree(gameMoves);

    return (
        <Container style={styles.container}>
            <Header showBackButton />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <PGNViewer tree={tree} />
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    scrollView: {
        flexGrow: 1,
    },
});

export default CustomTestingScreen;
