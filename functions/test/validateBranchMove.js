import { Colors } from "../../styling";

export default function validateBranchMove(
    from,
    to,
    chess,
    moveList,
    moveIndex,
    setTempMessage,
    streak,
    setStreak
) {
    console.log("VALIDATING MOVE");
    const move = chess.move({ from: from, to: to });

    const currentMove = moveList[moveIndex].move;

    if (move.san === currentMove) {
        setTempMessage({
            message: `Correct Move! ${streak + 1} in a Row.`,
            backgroundColor: Colors.correctMove,
            textColor: Colors.correctMoveText,
        });
        setStreak((streak) => streak + 1);
        console.log("RETURNING TRUE");
        return true;
    } else {
        chess.undo();
        setStreak(0);
        setTempMessage({
            message: "Try Again.",
            backgroundColor: Colors.incorrectMove,
            textColor: Colors.incorrectMoveText,
        });
        console.log("RETURNING FALSE");
        return false;
    }
}
