import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../styling";

export default function KingHighlights({ chess, squareWidth, rows, cols, pov }) {
    const sideToMove = chess.turn();
    const otherSide = sideToMove === "w" ? "b" : "w";
    const isCheck = chess.inCheck();
    const isCheckmate = chess.isCheckmate();
    const isStalemate = chess.isStalemate();
    const isGameOver = chess.isGameOver();
    let chessboard = chess.board();

    if (pov !== "white") {
        chessboard = chessboard.reverse().map((row) => row.reverse());
    }

    const sidesToHighlight = [];
    let highlightType;
    if (isCheck) {
        sidesToHighlight.push(sideToMove);
        highlightType = "check";
    }

    if (isCheckmate) {
        highlightType = "checkmate";
    }

    if (isStalemate) {
        sidesToHighlight.push(sideToMove);
        highlightType = "draw";
    }

    if (isGameOver && !isCheckmate && !isStalemate) {
        sidesToHighlight.push(sideToMove);
        sidesToHighlight.push(otherSide);
        highlightType = "draw";
    }

    return (
        <View style={styles.container}>
            {chessboard.map((row, i) => {
                return (
                    <View key={i} style={styles.rowContainer}>
                        {row.map((square, j) => {
                            const squareName = cols[j] + rows[i];
                            let color = "transparent";
                            if (highlightType === "draw") {
                                color = Colors.inStalemate;
                            } else if (highlightType === "check") {
                                color = Colors.inCheck;
                            } else if (highlightType === "checkmate") {
                                color = Colors.inCheckmate;
                            }

                            return (
                                <View
                                    style={[
                                        { width: squareWidth, height: squareWidth },
                                        styles.squareContainer,
                                    ]}
                                    key={squareName}
                                >
                                    {square?.type === "k" &&
                                        sidesToHighlight.includes(square?.color) && (
                                            <View
                                                style={[styles.circle, { backgroundColor: color }]}
                                            />
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
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
    rowContainer: {
        flexDirection: "row",
    },
    squareContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    circle: {
        width: "100%",
        opacity: 0.5,
        height: "100%",
    },
});
