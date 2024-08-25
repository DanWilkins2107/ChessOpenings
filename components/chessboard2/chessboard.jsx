import Card from "../containers/Card";
import { StyleSheet, useWindowDimensions } from "react-native";
import ChessSquares from "./chessSquares";
import { useState } from "react";
import ChessPieces from "./chessPieces";
import BoardLoading from "./boardLoading";

export default function Chessboard({ chess, chessboardLoading, pov, style }) {
    const screenDetails = useWindowDimensions();

    const screenHeight = screenDetails.height;
    const screenWidth = screenDetails.width;

    const dimensions = Math.min(screenHeight / 2, screenWidth - 20);
    const squareWidth = dimensions / 8;

    const [activeRow, setActiveRow] = useState(1);
    const [activeCol, setActiveCol] = useState(1);

    return (
        <Card
            style={[styles.card, { width: dimensions, height: dimensions }, style]}
            padding={false}
        >
            <ChessSquares pov={pov} squareWidth={squareWidth} />
            {chessboardLoading && <BoardLoading />}
            {!chessboardLoading && (
                <ChessPieces
                    pov={pov}
                    squareWidth={squareWidth}
                    chessboard={chess.board()}
                    activeCol={activeCol}
                    activeRow={activeRow}
                />
            )}
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {},
});
