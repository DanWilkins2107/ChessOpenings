import { View, StyleSheet, Image } from "react-native";
import { useMemo } from "react";
import bb from "../../assets/pieces/bb.png";
import bk from "../../assets/pieces/bk.png";
import bn from "../../assets/pieces/bn.png";
import bp from "../../assets/pieces/bp.png";
import bq from "../../assets/pieces/bq.png";
import br from "../../assets/pieces/br.png";
import wb from "../../assets/pieces/wb.png";
import wk from "../../assets/pieces/wk.png";
import wn from "../../assets/pieces/wn.png";
import wp from "../../assets/pieces/wp.png";
import wq from "../../assets/pieces/wq.png";
import wr from "../../assets/pieces/wr.png";

export default function ChessPieces({ chessboard, activePiece, squareWidth, rows, cols }) {
    const pieceImages = useMemo(
        () => ({
            b: {
                b: bb,
                k: bk,
                n: bn,
                p: bp,
                q: bq,
                r: br,
            },
            w: {
                b: wb,
                k: wk,
                n: wn,
                p: wp,
                q: wq,
                r: wr,
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
                            if (
                                piece === null ||
                                (activeSquareRow === rows[i] && activeSquareCol === cols[j])
                            ) {
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
