import { StyleSheet, Text, View } from "react-native";

export default function KingHighlights({ chess, squareWidth, rows, cols }) {
    const sideToMove = chess.turn();
    const otherSide = sideToMove === "w" ? "b" : "w";
    const isCheck = chess.inCheck();
    const isCheckmate = chess.isCheckmate();
    const isStalemate = chess.isStalemate();
    const isGameOver = chess.isGameOver();
    const chessboard = chess.board();

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
                                color = "grey";
                            } else if (highlightType === "check") {
                                color = "blue";
                            } else if (highlightType === "checkmate") {
                                color = "red";
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
                                            <View style={[styles.circle, {backgroundColor: color}]} />
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
