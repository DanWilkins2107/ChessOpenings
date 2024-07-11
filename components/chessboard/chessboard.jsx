import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { View, Image, Text, StyleSheet, PanResponder } from "react-native";

const Chessboard = ({ chess, moveFunction, backgroundColor, pov }) => {
    const turnToMove = chess.turn();
    const [isChessboardMeasured, setIsChessboardMeasured] = useState(false);
    const rows = "abcdefgh".split("");
    const columns = "87654321".split("");

    if (pov === "b") {
        rows.reverse();
        columns.reverse();
    }

    const position = useMemo(() => {
        let position = chess.board();
        if (pov === "b") {
            position = position.map((innerArray) => innerArray.slice().reverse()).reverse();
        }
        return position;
    }, [pov, chess.board()]);

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
    const [draggingOverSquare, setDraggingOverSquare] = useState(null);

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

    const findKingSquare = useCallback(
        (position, kingColor) => {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    const piece = position[i][j];
                    if (piece && piece.type === "k" && piece.color === kingColor) {
                        return rows[j] + columns[i];
                    }
                }
            }
            return null;
        },
        [position, turnToMove]
    );

    const findMoveSquares = useCallback((square) => {
        const moves = chess.moves({ square: square, verbose: true });
        const moveSquares = moves.map((move) => move.to);
        return moveSquares;
    }, []);

    const chessboardRef = useRef(null);

    const measureChessboard = useCallback(() => {
        chessboardRef.current.measure((x, y, width, height, pageX, pageY) => {
            setChessboardPosition({ x: pageX, y: pageY, width: width, height: height });
        });
    }, [chessboardRef, isChessboardMeasured]);

    useEffect(() => {
        measureChessboard();
    }, [measureChessboard]);

    const pieceImages = useMemo(
        () => ({
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
        }),
        []
    );

    const onPanResponderGrant = useCallback(
        (event) => {
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
        [
            isChessboardMeasured,
            measureChessboard,
            chessboardPosition,
            position,
            rows,
            columns,
            activePiece,
            startSquare,
            turnToMove,
            moveFunction,
            findMoveSquares,
        ]
    );

    const onPanResponderMove = useCallback(
        (event) => {
            const { pageX, pageY } = event.nativeEvent;
            setCoordinates({ x: pageX, y: pageY });
            if (chessboardPosition.width > 0 && chessboardPosition.height > 0) {
                const squareWidth = chessboardPosition.width / 8;
                const squareHeight = chessboardPosition.height / 8;
                const columnIndex = Math.floor((pageX - chessboardPosition.x) / squareWidth);
                const rowIndex = Math.floor((pageY - chessboardPosition.y) / squareHeight);

                if (columnIndex >= 0 && columnIndex < 8 && rowIndex >= 0 && rowIndex < 8) {
                    const square = rows[columnIndex] + columns[rowIndex];
                    setDraggingOverSquare(square);
                } else {
                    setDraggingOverSquare(null);
                }
            }
        },
        [chessboardPosition, rows, columns, setCoordinates]
    );

    const onPanResponderRelease = useCallback(
        (event) => {
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
            setDraggingOverSquare(null);
            setStartSquare(null);
        },
        [
            chessboardPosition,
            rows,
            columns,
            activePiece,
            moveFunction,
            setDraggingPiece,
            setStartSquare,
        ]
    );

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onPanResponderGrant,
        onPanResponderMove,
        onPanResponderRelease,
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
                <>
                    {columns.map((column, columnIndex) => (
                        <React.Fragment key={columnIndex}>
                            {rows.map((row, rowIndex) => {
                                const piece = position[columnIndex][rowIndex];
                                const square = rows[rowIndex] + columns[columnIndex];
                                if (square !== activePiece) {
                                    return (
                                        <View
                                            key={row}
                                            style={[
                                                styles.square,
                                                (columnIndex + rowIndex) % 2 === 0
                                                    ? styles.whiteSquare
                                                    : styles.blackSquare,
                                                {
                                                    position: "absolute",
                                                    top: `${(columnIndex / 8) * 100}%`,
                                                    left: `${(rowIndex / 8) * 100}%`,
                                                    width: "12.5%",
                                                    height: "12.5%",
                                                },
                                            ]}
                                        >
                                            {piece && (
                                                <Image
                                                    source={pieceImages[piece.color][piece.type]}
                                                    style={styles.piece}
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
                                                            backgroundColor: blurColour,
                                                        },
                                                    ]}
                                                />
                                            )}
                                        </View>
                                    );
                                }
                            })}
                        </React.Fragment>
                    ))}
                    {activePiece && draggingOverSquare && (
                        <View
                            style={[
                                styles.square,
                                {
                                    position: "absolute",
                                    top: `${(columns.indexOf(draggingOverSquare[1]) / 8) * 100}%`,
                                    left: `${(rows.indexOf(draggingOverSquare[0]) / 8) * 100}%`,
                                    width: "12.5%",
                                    height: "12.5%",
                                },
                            ]}
                        >
                            <View style={styles.draggingOverCircle} />
                        </View>
                    )}
                    {activePiece && (
                        <View
                            style={[
                                styles.square,
                                styles.activeSquare,
                                {
                                    position: "absolute",
                                    top: `${(columns.indexOf(activePiece[1]) / 8) * 100}%`,
                                    left: `${(rows.indexOf(activePiece[0]) / 8) * 100}%`,
                                    width: "12.5%",
                                    height: "12.5%",
                                },
                            ]}
                        >
                            {position[columns.indexOf(activePiece[1])][
                                rows.indexOf(activePiece[0])
                            ] && (
                                <Image
                                    source={
                                        pieceImages[
                                            position[columns.indexOf(activePiece[1])][
                                                rows.indexOf(activePiece[0])
                                            ].color
                                        ][
                                            position[columns.indexOf(activePiece[1])][
                                                rows.indexOf(activePiece[0])
                                            ].type
                                        ]
                                    }
                                    style={[
                                        styles.piece,
                                        draggingPiece
                                            ? {
                                                  transform: [
                                                      {
                                                          translateX:
                                                              coordinates.x -
                                                              chessboardPosition.x -
                                                              (chessboardPosition.width *
                                                                  (rows.indexOf(activePiece[0]) +
                                                                      0.5)) /
                                                                  8,
                                                      },
                                                      {
                                                          translateY:
                                                              coordinates.y -
                                                              chessboardPosition.y -
                                                              (chessboardPosition.height *
                                                                  (columns.indexOf(activePiece[1]) +
                                                                      0.5)) /
                                                                  8,
                                                      },
                                                  ],
                                                  width: "125%",
                                                  height: "125%",
                                              }
                                            : null,
                                    ]}
                                />
                            )}
                            {activePieceMoves.includes(activePiece) && (
                                <View style={styles.validMove}>
                                    {position[columns.indexOf(activePiece[1])][
                                        rows.indexOf(activePiece[0])
                                    ] ? (
                                        <View style={styles.validMoveSquare} />
                                    ) : (
                                        <View style={styles.validMoveCircle} />
                                    )}
                                </View>
                            )}
                            {blurSquare === activePiece && (
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
                    )}
                </>
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
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
    },
    piece: {
        width: "100%",
        height: "100%",
        position: "relative",
        zIndex: 5,
    },
    square: {
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
        borderRadius: 1000,
        backgroundColor: "#ADD8E6",
    },
    validMoveSquare: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderWidth: 6,
        borderColor: "#ADD8E6",
    },
    blur: {
        position: "absolute",
        top: "5%",
        left: "5%",
        width: "90%",
        height: "90%",
        opacity: 0.5,
        borderRadius: 10,
    },
    draggingOverCircle: {
        position: "absolute",
        top: "-40%",
        left: "-40%",
        width: "180%",
        height: "180%",
        borderRadius: 1000,
        backgroundColor: "black",
        opacity: 0.2,
    },
});

export default Chessboard;
