import Container from "../components/Container";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { useState } from "react";
import Header from "../components/Header";

const CustomTestingScreen = () => {
    const pgnParser = require("pgn-parser");

    const pgn = `
[Event "Alekhine Defence: Modern Variation (4...Bg4)"]
[Site "https://lichess.org/study/4PWwuog5/s0lf0C9J"]
[Result "*"]
[Variant "Standard"]
[ECO "B05"]
[Opening "Alekhine Defense: Modern Variation, Main Line"]
[Annotator "https://lichess.org/@/dd2107"]
[UTCDate "2024.02.28"]
[UTCTime "12:52:37"]

1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 Bg4 5. Be2 e6 6. O-O Be7 (6... Nc6 { Not a good move, but important to know why. } 7. c4 Nb6 8. exd6 cxd6 9. d5 Bxf3 10. Bxf3 exd5 11. a4 dxc4 12. a5 Nd7 13. a6) 7. h3 Bh5 8. c4 Nb6 9. Nc3 O-O 10. Be3 Nc6?? 11. exd6 cxd6 12. d5!! Bxf3 13. Bxf3 Ne5 14. b3 *
`;
    const [game] = pgnParser.parse(pgn);
    const gameMoves = game.moves;

    const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

    class MoveNode {
        constructor(move, annotation) {
            this.move = move;
            this.annotation = annotation;
            this.children = [];
        }

        addChild(node) {
            this.children.push(node);
        }
    }

    const pgnSort = (moves) => {
        const root = new MoveNode(null, null);
        let currentNode = root;

        for (let i = 0; i < moves.length; i++) {
            let move = moves[i].move;
            // Check for move annotations and remove them
            if (move.includes("!!") || move.includes("!") || move.includes("?")) {
                move = move.replace(/!!|!|\?/g, "");
            }
            const child = new MoveNode(move, moves[i].annotation);
            currentNode.addChild(child);

            if (moves[i].ravs) {
                for (let j = 0; j < moves[i].ravs.length; j++) {
                    const ravChild = pgnSort(moves[i].ravs[j].moves);
                    child.addChild(ravChild); // Add ravs to the current child instead of currentNode
                }
            }

            if (!moves[i].ravs || moves[i].ravs.length === 0) {
                currentNode = child;
            } else {
                currentNode = root;
            }
        }

        return root;
    };

    const displayMoves = (node, indent = 0) => {
        if (node.move) {
            console.log("  ".repeat(indent) + node.move);
        }
        for (const child of node.children) {
            displayMoves(child, indent + 1);
        }
    };

    const sortedMoves = pgnSort(gameMoves);
    displayMoves(sortedMoves);

    return (
        <Container style={styles.container}>
            <Header showBackButton />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text>{JSON.stringify(sortedMoves, null, 2)}</Text>
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
