import { useState, useRef, useEffect } from "react";
import { View, Image, Text, StyleSheet, PanResponder } from "react-native";

const Chessboard = ({ chess }) => {
    const position = chess.board();
    const turnToMove = chess.turn();
    const [isChessboardRendered, setIsChessboardRendered] = useState(false);
    const rows = "abcdefgh".split("");
    const columns = "87654321".split("");
    const [activePiece, setActivePiece] = useState(null);
    const [activePieceMoves, setActivePieceMoves] = useState([]);
    const [coordinates, setCoordinates] = useState(null);
    const [mousePressed, setMousePressed] = useState(false);
    const [chessboardPosition, setChessboardPosition] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });
    const [hoveredSquare, setHoveredSquare] = useState(null);

    const findMoveSquares = (square) => {
        const moves = chess.moves({ square: square, verbose: true });
        const moveSquares = moves.map((move) => move.to);
        return moveSquares;
    };

    const chessboardRef = useRef(null);

    useEffect(() => {
        console.log("useEffect called");
        if (chessboardRef.current) {
            console.log("chessboardRef is available");
            chessboardRef.current.measure((x, y, width, height, pageX, pageY) => {
                console.log("measured chessboard position as: ", pageX, pageY, width, height);
                setChessboardPosition({ x: pageX, y: pageY, width, height });
            });
        } else {
            console.log("chessboardRef is not available");
        }
    }, [chessboardRef]);

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
        onStartShouldSetPanResponderCapture: (event) => {
            const { pageX, pageY } = event.nativeEvent;
            const columnIndex = Math.floor(
                (pageX - chessboardPosition.x) / (chessboardPosition.width / 8)
            );
            const rowIndex = Math.floor(
                (pageY - chessboardPosition.y) / (chessboardPosition.height / 8)
            );

            if (columnIndex >= 0 && columnIndex < 8 && rowIndex >= 0 && rowIndex < 8) {
                setHoveredSquare(rows[columnIndex] + columns[rowIndex]);
                const piece = position[rowIndex][columnIndex];
                const square = rows[columnIndex] + columns[rowIndex];
                if (piece && piece.color === turnToMove && square !== activePiece) {
                    setActivePiece(square);
                    setActivePieceMoves(findMoveSquares(square));
                } else {
                    setActivePiece(null);
                    setActivePieceMoves([]);
                }
            } else {
                setHoveredSquare(null);
            }
            return false;
        },
        onPanResponderGrant: (event) => {
            const { pageX, pageY } = event.nativeEvent;
            setCoordinates({ x: pageX, y: pageY });
            setMousePressed(true);
        },
        onPanResponderMove: (event) => {
            const { pageX, pageY } = event.nativeEvent;
            setCoordinates({ x: pageX, y: pageY });

            const columnIndex = Math.floor(
                (pageX - chessboardPosition.x) / (chessboardPosition.width / 8)
            );
            const rowIndex = Math.floor(
                (pageY - chessboardPosition.y) / (chessboardPosition.height / 8)
            );

            if (columnIndex >= 0 && columnIndex < 8 && rowIndex >= 0 && rowIndex < 8) {
                setHoveredSquare(rows[columnIndex] + columns[rowIndex]);
            } else {
                setHoveredSquare(null);
            }
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
                    if (square !== activePiece) {
                        setActivePiece(null);
                        setActivePieceMoves([]);
                    }
                } else {
                    setActivePiece(null);
                }
            }
            setMousePressed(false);
        },
    });

    return (
        <View style={styles.chessboardContainer} {...panResponder.panHandlers}>
            <View
                ref={chessboardRef}
                style={styles.chessboard}
                onLayout={(event) => {
                    if (!isChessboardRendered) {
                        setIsChessboardRendered(true);
                    } else {
                        const { x, y, width, height } = event.nativeEvent.layout;
                        console.log("measured chessboard position as: ", x, y, width, height);
                        setChessboardPosition({ x, y, width, height });
                    }
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
                                            style={styles.piece}
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
            <Text style={[styles.coordinates, styles.redText]}>
                {coordinates ? `X: ${coordinates.x}, Y: ${coordinates.y}` : ""}
            </Text>
            <Text style={[styles.mousePressed, styles.redText]}>
                {mousePressed ? "Mouse Pressed" : "Mouse Released"}
            </Text>
            <Text style={[styles.topLeftCoordinates, styles.redText]}>
                Top Left: X: {chessboardPosition.x}, Y: {chessboardPosition.y}
            </Text>
            <Text style={[styles.bottomRightCoordinates, styles.redText]}>
                Bottom Right: X: {chessboardPosition.x + chessboardPosition.width}, Y:{" "}
                {chessboardPosition.y + chessboardPosition.height}
            </Text>
            <Text style={[styles.hoveredSquare, styles.redText]}>
                Hovered Square: {hoveredSquare}
            </Text>
            <Text style={[styles.activePiece, styles.redText]}>Active Piece: {activePiece}</Text>
            <Text style={[styles.activePieceMoves, styles.redText]}>
                Active Piece Moves: {activePieceMoves.join(", ")}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    chessboardContainer: {
        width: "100%",
        aspectRatio: 1,
        backgroundColor: "white",
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
        borderColor: "black", // Changed from orange to black
    },
    row: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
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
    piece: {
        width: "80%",
        height: "80%",
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
    coordinates: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    mousePressed: {
        position: "absolute",
        top: 20,
        left: 0,
    },
    topLeftCoordinates: {
        position: "absolute",
        top: 40,
        left: 0,
    },
    bottomRightCoordinates: {
        position: "absolute",
        bottom: 0,
        right: 0,
    },
    hoveredSquare: {
        position: "absolute",
        top: 60,
        left: 0,
    },
    activePiece: {
        position: "absolute",
        top: 80,
        left: 0,
    },
    activePieceMoves: {
        position: "absolute",
        top: 100,
        left: 0,
    },
    redText: {
        color: "red",
    },
});

export default Chessboard;
