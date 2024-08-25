import { View, Text, StyleSheet } from "react-native";
import { Colors, Fonts } from "../../styling";

export default function ChessSquares({ pov, squareWidth }) {
    const povNumber = pov === "white" ? 0 : 1;

    const rows = ["8", "7", "6", "5", "4", "3", "2", "1"];
    const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

    if (povNumber === 1) {
        rows.reverse();
        cols.reverse();
    }

    return (
        <View style={styles.container}>
            {rows.map((row, i) => {
                return (
                    <View key={row}>
                        {cols.map((col, j) => {
                            const colored = (i + j) % 2 === povNumber;
                            return (
                                <View
                                    style={[
                                        styles.square,
                                        { width: squareWidth, height: squareWidth },
                                        colored && styles.colored,
                                    ]}
                                    key={row + col}
                                >
                                    {i === 0 && (
                                        <Text
                                            style={[
                                                styles.text,
                                                styles.topLeftText,
                                                colored && styles.coloredText,
                                            ]}
                                        >
                                            {rows[j]}
                                        </Text>
                                    )}
                                    {j === 7 && (
                                        <Text
                                            style={[
                                                styles.text,
                                                styles.bottomRightText,
                                                colored && styles.coloredText,
                                            ]}
                                        >
                                            {cols[i]}
                                        </Text>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
    },
    text: {
        fontFamily: Fonts.main,
        fontSize: 10,
    },
    colored: {
        backgroundColor: Colors.primaryButton,
    },
    coloredText: {
        color: Colors.card1,
    },
    topLeftText: {
        position: "absolute",
        top: 0,
        left: 2,
    },
    bottomRightText: {
        position: "absolute",
        bottom: 0,
        right: 3,
    },
});
