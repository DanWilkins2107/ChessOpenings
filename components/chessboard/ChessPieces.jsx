import { View, StyleSheet, Image } from "react-native";
import { useMemo } from "react";

export default function ChessPieces({ chessboard, activePiece, squareWidth, rows, cols }) {
    const pieceImages = useMemo(
        () => ({
            b: {
                b: require("../../assets/pieces/bb.png"),
                k: require("../../assets/pieces/bk.png"),
                n: require("../../assets/pieces/bn.png"),
                p: require("../../assets/pieces/bp.png"),
                q: require("../../assets/pieces/bq.png"),
                r: require("../../assets/pieces/br.png"),
            },
            w: {
                b: require("../../assets/pieces/wb.png"),
                k: require("../../assets/pieces/wk.png"),
                n: require("../../assets/pieces/wn.png"),
                p: require("../../assets/pieces/wp.png"),
                q: require("../../assets/pieces/wq.png"),
                r: require("../../assets/pieces/wr.png"),
            },
        }),
        []
    );

    const activeSquareRow = activePiece ? activePiece.square[1] : null;
    const activeSquareCol = activePiece ? activePiece.square[0] : null;

    return (
        <View style={styles.container}>
            {chessboard.map((row, i) => {
                return (
                    <View key={i} style={styles.row}>
                        {row.map((piece, j) => {
                            if (piece === null || (activeSquareRow === rows[i] && activeSquareCol === cols[j])) {
                                return (
                                    <View
                                        key={j}
                                        style={{
                                            width: squareWidth,
                                            height: squareWidth,
                                        }}
                                    />
                                );
                            } else {
                                return (
                                    <View
                                        key={j}
                                        style={[
                                            styles.pieceWrapper,
                                            { width: squareWidth, height: squareWidth },
                                        ]}
                                    >
                                        <Image
                                            source={pieceImages[piece.color][piece.type]}
                                            style={styles.piece}
                                        />
                                    </View>
                                );
                            }
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
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
    },
    row: {
        display: "flex",
        flexDirection: "row",
    },
    pieceWrapper: {
        justifyContent: "center",
        alignItems: "center",
    },
    piece: {
        width: "95%",
        height: "95%",
    },
});
