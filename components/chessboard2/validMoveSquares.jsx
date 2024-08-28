import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../styling";

const ValidMoveSquares = ({ chessboard, validMoves, squareWidth, rows, cols, activePiece }) => {
    return (
        <View style={styles.container}>
            {chessboard.map((row, i) => {
                return (
                    <View key={i} style={styles.rowContainer}>
                        {row.map((square, j) => {
                            const squareName = cols[j] + rows[i];
                            const valid = validMoves.includes(squareName);
                            const isPieceThere = square !== null;
                            const isSquareActive = activePiece && activePiece.square === squareName;
                            return (
                                <View
                                    style={[
                                        { width: squareWidth, height: squareWidth },
                                        styles.squareContainer,
                                        isSquareActive && { backgroundColor: Colors.activePiece },
                                    ]}
                                    key={squareName}
                                >
                                    {valid && isPieceThere && (
                                        <View style={styles.squareOuterStyle}>
                                            <View style={styles.squareInnerStyle} />
                                        </View>
                                    )}
                                    {valid && !isPieceThere && <View style={styles.circle} />}
                                </View>
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
};

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
    squareOuterStyle: {
        width: "100%",
        height: "100%",
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
    },
    squareInnerStyle: {
        width: "80%",
        height: "80%",
        backgroundColor: Colors.card2,
    },
    circle: {
        width: "30%",
        height: "30%",
        borderRadius: 100,
        backgroundColor: Colors.activePiece,
    },
});

export default ValidMoveSquares;
