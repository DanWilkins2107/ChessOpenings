import { Colors } from "../../styling";

export default function validateSplitMove(from, to, chess, moveList, setMessageObj) {
    const testMove = chess.move({ from: from, to: to });
    const move = testMove.san;

    let correctMove = null;
    moveList.forEach((splitMove) => {
        if (splitMove.move === move) {
            correctMove = move;
        }
    });

    if (!correctMove) {
        setMessageObj({
            message: `Try Again.`,
            backgroundColor: Colors.incorrectMove,
            textColor: Colors.incorrectMoveText,
        });
    }

    return correctMove;
}