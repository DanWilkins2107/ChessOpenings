import { Colors } from "../../styling";

export default function validateBranchMove(
    from,
    to,
    chess,
    moveList,
    moveIndex,
    setMessageObj,
    streak,
    setStreak
) {
    const move = chess.move({ from: from, to: to });

    const currentMove = moveList[moveIndex].move;

    if (move.san === currentMove) {
        setMessageObj({
            message: `Correct Move! ${streak + 1} in a Row.`,
            backgroundColor: Colors.correctMove,
            textColor: Colors.correctMoveText,
        });
        setStreak((streak) => streak + 1);
        return true;
    } else {
        chess.undo();
        setStreak(0);
        setMessageObj({
            message: "Try Again.",
            backgroundColor: Colors.incorrectMove,
            textColor: Colors.incorrectMoveText,
        });
        return false;
    }
}
