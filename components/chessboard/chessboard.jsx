import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { StyleSheet, useWindowDimensions, PanResponder } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import Card from "../containers/Card";
import ChessSquares from "./ChessSquares";
import ChessPieces from "./ChessPieces";
import BoardLoading from "./BoardLoading";
import ActivePiece from "./ActivePiece";
import ValidMoveSquares from "./ValidMoveSquares";
import DraggingOverSquare from "./DraggingOverSquare";
import KingHighlights from "./KingHighlights";

const Chessboard = ({ chess, moveFunction, chessboardLoading, pov, onTopHeight = 10, style }) => {
    const screenDetails = useWindowDimensions();
    const screenHeight = screenDetails.height;
    const screenWidth = screenDetails.width;
    const dimensions = Math.min(screenHeight / 2, screenWidth - 20);
    const squareWidth = dimensions / 8;
    const headerHeight = useHeaderHeight();

    const columns = "abcdefgh".split("");
    const rows = "87654321".split("");
    let chessboard = chess.board();
    if (pov === "black") {
        rows.reverse();
        columns.reverse();
        chessboard = chessboard.map((innerArray) => innerArray.slice().reverse()).reverse();
    }
    const turnToMove = chess.turn();

    const xBoardValue = (screenWidth - dimensions) / 2;
    const yBoardValue = headerHeight + onTopHeight;

    const [activePiece, setActivePiece] = useState(null);
    const [activeMoveSquares, setActiveMoveSquares] = useState([]);
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [draggingOverSquare, setDraggingOverSquare] = useState(null);
    const [startSquare, setStartSquare] = useState(null);

    const getIndexes = (pageX, pageY) => {
        const x = pageX - xBoardValue;
        const y = pageY - yBoardValue;

        const columnIndex = Math.floor(x / squareWidth);
        const rowIndex = Math.floor(y / squareWidth);

        return { columnIndex, rowIndex };
    };

    const findMoveSquares = (square) => {
        const moves = chess.moves({ square, verbose: true });
        const moveSquares = moves.map((move) => move.to);
        return moveSquares;
    };

    const onPanResponderGrant = useCallback(
        (event) => {
            const { pageX, pageY } = event.nativeEvent;
            const { columnIndex, rowIndex } = getIndexes(pageX, pageY);

            const square = columns[columnIndex] + rows[rowIndex];
            const piece = chessboard[rowIndex][columnIndex];

            setCoordinates({ x: pageX - xBoardValue, y: pageY - yBoardValue });

            if (piece && piece.color === turnToMove) {
                if (activePiece && piece.square === activePiece.square) {
                    setStartSquare(square);
                } else {
                    setDraggingOverSquare(square);
                    setActivePiece(piece);
                    setActiveMoveSquares(findMoveSquares(piece.square));
                }
            } else if (activePiece) {
                if (activeMoveSquares.includes(square)) {
                    moveFunction(activePiece.square, square);
                    setActivePiece(null);
                    setActiveMoveSquares([]);
                } else {
                    setActivePiece(null);
                    setActiveMoveSquares([]);
                }
            }
        },
        [chess, chessboard, turnToMove, activePiece, activeMoveSquares, columns, rows]
    );

    const onPanResponderMove = useCallback(
        (event) => {
            const { pageX, pageY } = event.nativeEvent;
            const { columnIndex, rowIndex } = getIndexes(pageX, pageY);

            setCoordinates({ x: pageX - xBoardValue, y: pageY - yBoardValue });
            if (
                columnIndex >= 0 &&
                columnIndex <= 7 &&
                rowIndex >= 0 &&
                rowIndex <= 7 &&
                activePiece
            ) {
                const square = columns[columnIndex] + rows[rowIndex];
                setDraggingOverSquare(square);
            } else {
                setDraggingOverSquare(null);
            }
        },
        [columns, rows, activePiece, xBoardValue, yBoardValue]
    );

    const onPanResponderRelease = useCallback(
        (event) => {
            const { pageX, pageY } = event.nativeEvent;
            const { columnIndex, rowIndex } = getIndexes(pageX, pageY);
            setCoordinates(null);
            setDraggingOverSquare(null);

            if (columnIndex >= 0 && columnIndex <= 7 && rowIndex >= 0 && rowIndex <= 7) {
                const square = columns[columnIndex] + rows[rowIndex];
                if (activePiece && square !== activePiece.square) {
                    if (activeMoveSquares.includes(square)) {
                        moveFunction(activePiece.square, square);
                        setActivePiece(null);
                        setActiveMoveSquares([]);
                    }
                } else if (startSquare === square) {
                    setActivePiece(null);
                    setActiveMoveSquares([]);
                    setStartSquare(null);
                }
            }
        },
        [columns, rows, activePiece, activeMoveSquares, moveFunction]
    );

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onStartShouldSetPanResponderCapture: () => true,
                onPanResponderGrant,
                onPanResponderMove,
                onPanResponderRelease,
            }),
        [onPanResponderGrant, onPanResponderMove, onPanResponderRelease]
    );

    return (
        <Card
            style={[{ width: dimensions, height: dimensions }, style]}
            padding={false}
            {...panResponder.panHandlers}
        >
            <ChessSquares pov={pov} squareWidth={squareWidth} />
            {chessboardLoading && <BoardLoading />}
            {!chessboardLoading && (
                <>
                    <KingHighlights
                        chess={chess}
                        squareWidth={squareWidth}
                        rows={rows}
                        cols={columns}
                        pov={pov}
                    />
                    <ValidMoveSquares
                        chessboard={chessboard}
                        validMoves={activeMoveSquares}
                        squareWidth={squareWidth}
                        rows={rows}
                        cols={columns}
                        activePiece={activePiece}
                    />
                    <ChessPieces
                        pov={pov}
                        squareWidth={squareWidth}
                        chessboard={chessboard}
                        activePiece={activePiece}
                        rows={rows}
                        cols={columns}
                    />
                    <DraggingOverSquare
                        square={draggingOverSquare}
                        squareWidth={squareWidth}
                        rows={rows}
                        cols={columns}
                    />
                    <ActivePiece
                        pov={pov}
                        squareWidth={squareWidth}
                        activePiece={activePiece}
                        rows={rows}
                        cols={columns}
                        coordinates={coordinates}
                    />
                </>
            )}
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {},
});

export default Chessboard;
