import { View, StyleSheet, Image } from "react-native";
import { useMemo } from "react";
import { Colors } from "../../styling";

export default function ActivePiece({ activePiece, squareWidth, pov, rows, cols, coordinates }) {
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

    const activeRow = activePiece ? rows.indexOf(activePiece.square[1]) : null;
    const activeCol = activePiece ? cols.indexOf(activePiece.square[0]) : null;


    let topValue;
    let leftValue;

    if (coordinates !== null) {
        topValue = coordinates["y"] - squareWidth / 2;
        leftValue = coordinates["x"] - squareWidth / 2;
    } else {
        topValue = activeRow * squareWidth
        leftValue = activeCol * squareWidth
    }
    return (
        <View style={styles.container}>
            {activePiece && (
                <View
                    style={[
                        styles.pieceWrapper,
                        {
                            width: squareWidth,
                            height: squareWidth,
                            top: topValue,
                            left: leftValue,
                        },
                        
                    ]}
                >
                    <Image
                        source={pieceImages[activePiece.color][activePiece.type]}
                        style={coordinates ? styles.largePiece : styles.piece}
                    />
                </View>
            )}
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
        zIndex: 2,
    },
    pieceWrapper: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    largePiece: {
        width: "110%",
        height : "110%",
    },
    piece: {
        width: "95%",
        height: "95%",
    },
});
