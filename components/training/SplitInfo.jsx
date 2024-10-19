import { ScrollView, StyleSheet } from "react-native";
import getMoveListFromNode from "../../functions/test/getMoveListFromNode";
import Card from "../containers/Card";
import Subheading2 from "../text/Subheading2";

export default function SplitInfo({ split, splitObj }) {
    const moveList = getMoveListFromNode(split.splitNode, split.color);
    const moveArray = moveList.map((moveObj, index) => {
        const isMoveShown = index % 2 === 0;
        const move = moveObj.move;
        const moveNumber = Math.floor(index / 2) + 1;
        return `${isMoveShown ? `${moveNumber}.` : ""}${move}`;
    });
    const correctMoves = splitObj.map((moveObj) => {
        if (moveObj.guessed) {
            return moveObj.move;
        }
        return "?";
    });
    return (
        <Card style={styles.container}>
            <ScrollView>
                <Subheading2 style={styles.text}>
                    Correct Moves: {correctMoves.join(", ")}
                </Subheading2>
                <Subheading2 style={styles.text}>Previous Moves: {moveArray.join(" ")}</Subheading2>
            </ScrollView>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    text: {
        marginBottom: 5,
    },
});
