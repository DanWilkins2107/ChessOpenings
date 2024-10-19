import { ScrollView, StyleSheet } from "react-native";
import Card from "../containers/Card";
import Subheading2 from "../text/Subheading2";

export default function OtherBranchInfo({ moveList, moveIndex }) {
    const moveArray = moveList.slice(0, moveIndex).map((moveObj, index) => {
        const isMoveShown = index % 2 === 0;
        const move = moveObj.move;
        const moveNumber = Math.floor(index / 2) + 1;
        return `${isMoveShown ? `${moveNumber}.` : ""}${move}`;
    });

    return (
        <Card style={styles.container}>
            <ScrollView>
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
