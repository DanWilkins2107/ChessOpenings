import { useState, useRef, useEffect } from "react";
import { View, Image, Text, StyleSheet, PanResponder } from "react-native";

const Chessboard = ({ chess, moveFunction, backgroundColor }) => {
    const position = chess.board();
    const turnToMove = chess.turn();
    const [isChessboardMeasured, setIsChessboardMeasured] = useState(false);
    const rows = "abcdefgh".split("");
    const columns = "87654321".split("");
    const [activePiece, setActivePiece] = useState(null);
    const [startSquare, setStartSquare] = useState(null);
    const [activePieceMoves, setActivePieceMoves] = useState([]);
    const [coordinates, setCoordinates] = useState(null);
    const [chessboardPosition, setChessboardPosition] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });
    const [draggingPiece, setDraggingPiece] = useState(null);
    const [blurSquare, setBlurSquare] = useState(null);
    const [blurColour, setBlurColour] = useState(null);

    useEffect(() => {
        const isCheck = chess.isCheck();
        const isCheckmate = chess.isCheckmate();
        const isStalemate = chess.isStalemate();

        if (isCheck || isCheckmate || isStalemate) {
            const kingColor = turnToMove === "w" ? "w" : "b";
            const kingSquare = findKingSquare(position, kingColor);

            setBlurSquare(kingSquare);

            if (isCheckmate) {
                setBlurColour("red");
            } else if (isCheck) {
                setBlurColour("green");
            } else if (isStalemate) {
                setBlurColour("orange");
            }
        } else {
            setBlurSquare(null);
            setBlurColour(null);
        }
    }, [position, turnToMove]);

    const findKingSquare = (position, kingColor) => {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = position[i][j];
                if (piece && piece.type === "k" && piece.color === kingColor) {
                    return rows[j] + columns[i];
                }
            }
        }
        return null;
    };

    const findMoveSquares = (square) => {
        const moves = chess.moves({ square: square, verbose: true });
        const moveSquares = moves.map((move) => move.to);
        return moveSquares;
    };

    const chessboardRef = useRef(null);

    const measureChessboard = () => {
        chessboardRef.current.measure((x, y, width, height, pageX, pageY) => {
            setChessboardPosition({ x: pageX, y: pageY, width: width, height: height });
        });
    };

    const pieceImages = {
        b: {
            b: require("./pieces/bb.png"),
            k: require("./pieces/bk.png"),
            n: require("./pieces/bn.png"),
            p: require("./pieces/bp.png"),
            q: require("./pieces/bq.png"),
            r: require("./pieces/br.png"),
        },
        w: {
            b: require("./pieces/wb.png"),
            k: require("./pieces/wk.png"),
            n: require("./pieces/wn.png"),
            p: require("./pieces/wp.png"),
            q: require("./pieces/wq.png"),
            r: require("./pieces/wr.png"),
        },
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (event) => {
            if (!isChessboardMeasured) {
                measureChessboard();
                setIsChessboardMeasured(true);
            }
            const { pageX, pageY } = event.nativeEvent;
            setCoordinates({ x: pageX, y: pageY });
            const columnIndex = Math.floor(
                (pageX - chessboardPosition.x) / (chessboardPosition.width / 8)
            );
            const rowIndex = Math.floor(
                (pageY - chessboardPosition.y) / (chessboardPosition.height / 8)
            );

            if (columnIndex >= 0 && columnIndex < 8 && rowIndex >= 0 && rowIndex < 8) {
                const piece = position[rowIndex][columnIndex];
                const square = rows[columnIndex] + columns[rowIndex];
                if (activePiece && square) {
                    moveFunction(activePiece, square);
                    setStartSquare(null);
                    setActivePiece(null);
                    setActivePieceMoves([]);
                }
                if (startSquare === null) {
                    // If startSquare is null, set it to the clicked square if it's a piece of the color whose turn it is
                    if (piece && piece.color === turnToMove) {
                        setDraggingPiece(square);
                        setStartSquare(square);
                        setActivePiece(square);
                        setActivePieceMoves(findMoveSquares(square));
                    } else {
                        setActivePiece(null);
                        setActivePieceMoves([]);
                    }
                } else if (startSquare === square) {
                    // If startSquare is the same as the clicked square, reset startSquare and activePiece
                    setStartSquare(null);
                    setActivePiece(null);
                    setActivePieceMoves([]);
                } else {
                    // If startSquare is not null and not the same as the clicked square, check if the clicked square is a piece of the color whose turn it is
                    if (piece && piece.color === turnToMove) {
                        // If it is, set the clicked square as the new startSquare and activePiece
                        setStartSquare(square);
                        setActivePiece(square);
                        setActivePieceMoves(findMoveSquares(square));
                    } else {
                        // If it's not, make a move from startSquare to the clicked square
                        moveFunction(startSquare, square);
                        setStartSquare(null);
                        setActivePiece(null);
                        setActivePieceMoves([]);
                    }
                }
            } else {
                setStartSquare(null);
                setActivePiece(null);
                setActivePieceMoves([]);
            }
        },
        onPanResponderMove: (event) => {
            const { pageX, pageY } = event.nativeEvent;
            setCoordinates({ x: pageX, y: pageY });
        },
        onPanResponderRelease: (event) => {
            const { pageX, pageY } = event.nativeEvent;
            if (chessboardPosition.width > 0 && chessboardPosition.height > 0) {
                const squareWidth = chessboardPosition.width / 8;
                const squareHeight = chessboardPosition.height / 8;
                const columnIndex = Math.floor((pageX - chessboardPosition.x) / squareWidth);
                const rowIndex = Math.floor((pageY - chessboardPosition.y) / squareHeight);

                if (columnIndex >= 0 && columnIndex < 8 && rowIndex >= 0 && rowIndex < 8) {
                    const square = rows[columnIndex] + columns[rowIndex];
                    if (square !== activePiece && activePiece) {
                        moveFunction(activePiece, square);
                        setActivePiece(null);
                        setActivePieceMoves([]);
                    }
                } else {
                    setActivePiece(null);
                    setActivePieceMoves([]);
                }
            }
            setDraggingPiece(false);
            setStartSquare(null);
        },
    });
    return (
        <View
            style={[styles.chessboardContainer, { backgroundColor: backgroundColor }]}
            {...panResponder.panHandlers}
        >
            <View
                ref={chessboardRef}
                style={styles.chessboard}
                onTouchStart={(event) => {
                    measureChessboard();
                }}
            >
                {columns.map((column, columnIndex) => (
                    <View key={column} style={styles.row}>
                        {rows.map((row, rowIndex) => {
                            const piece = position[columnIndex][rowIndex];
                            const square = rows[rowIndex] + columns[columnIndex];
                            return (
                                <View
                                    key={row}
                                    style={[
                                        styles.square,
                                        (columnIndex + rowIndex) % 2 === 0
                                            ? styles.whiteSquare
                                            : styles.blackSquare,
                                        square === activePiece ? styles.activeSquare : null,
                                    ]}
                                >
                                    {piece && (
                                        <Image
                                            source={pieceImages[piece.color][piece.type]}
                                            style={[
                                                styles.piece,
                                                draggingPiece && activePiece === square
                                                    ? {
                                                          position: "absolute",
                                                          transform: [
                                                              {
                                                                  translateX:
                                                                      coordinates.x -
                                                                      chessboardPosition.x -
                                                                      (chessboardPosition.width *
                                                                          (rowIndex + 0.5)) /
                                                                          8,
                                                              },
                                                              {
                                                                  translateY:
                                                                      coordinates.y -
                                                                      chessboardPosition.y -
                                                                      (chessboardPosition.height *
                                                                          (columnIndex + 0.5)) /
                                                                          8,
                                                              },
                                                          ],
                                                      }
                                                    : null,
                                            ]}
                                        />
                                    )}
                                    {activePieceMoves.includes(square) && (
                                        <View style={styles.validMove}>
                                            {piece ? (
                                                <View style={styles.validMoveSquare} />
                                            ) : (
                                                <View style={styles.validMoveCircle} />
                                            )}
                                        </View>
                                    )}
                                    {blurSquare === square && (
                                        <View
                                            style={[
                                                styles.blur,
                                                {
                                                    shadowColor: blurColour,
                                                    backgroundColor: blurColour,
                                                },
                                            ]}
                                        />
                                    )}
                                </View>
                            );
                        })}
                    </View>
                ))}
            </View>
            <View style={[styles.topAxis, styles.axis]}>
                {rows.map((row) => (
                    <View key={row} style={styles.axisHolder}>
                        <Text style={styles.axisText}>{row}</Text>
                    </View>
                ))}
            </View>
            <View style={[styles.leftAxis, styles.axis]}>
                {columns.map((column) => (
                    <View key={column} style={styles.axisHolder}>
                        <Text style={styles.axisText}>{column}</Text>
                    </View>
                ))}
            </View>
            <View style={[styles.rightAxis, styles.axis]}>
                {columns.map((column) => (
                    <View key={column} style={styles.axisHolder}>
                        <Text style={styles.axisText}>{column}</Text>
                    </View>
                ))}
            </View>
            <View style={[styles.bottomAxis, styles.axis]}>
                {rows.map((row) => (
                    <View key={row} style={styles.axisHolder}>
                        <Text style={styles.axisText}>{row}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chessboardContainer: {
        width: "100%",
        aspectRatio: 1,
    },
    chessboard: {
        position: "absolute",
        top: "5%",
        left: "5%",
        width: "90%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
    },
    row: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
    },
    piece: {
        width: "100%",
        height: "100%",
    },
    square: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    whiteSquare: {
        backgroundColor: "white",
    },
    blackSquare: {
        backgroundColor: "gray",
    },
    activeSquare: {
        backgroundColor: "lightblue",
    },
    axis: {
        position: "absolute",
        display: "flex",
        justifyContent: "space-between",
    },
    topAxis: {
        left: "5%",
        width: "90%",
        height: "5%",
        flexDirection: "row",
    },
    leftAxis: {
        top: "5%",
        width: "5%",
        height: "90%",
        flexDirection: "column",
    },
    rightAxis: {
        right: "0%",
        top: "5%",
        width: "5%",
        height: "90%",
        flexDirection: "column",
    },
    bottomAxis: {
        bottom: "0%",
        left: "5%",
        width: "90%",
        height: "5%",
        flexDirection: "row",
    },
    axisHolder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    axisText: {
        textAlign: "center",
        fontWeight: "bold",
    },
    validMove: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    validMoveCircle: {
        width: "20%",
        height: "20%",
        borderRadius: "10%",
        backgroundColor: "#ADD8E6",
    },
    validMoveSquare: {
        width: "90%",
        height: "90%",
        borderWidth: "5%",
        borderColor: "#ADD8E6",
    },
    blur: {
        position: "absolute",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: "100%",
        width: "20%",
        height: "20%",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: "80%",
        elevation: 200,
    },
});

export default Chessboard;