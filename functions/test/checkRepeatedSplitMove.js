import { Colors } from "../../styling";

export default function checkRepeatedSplitMove(move, moveList, setTempMessage) {
    if (moveList[move]?.guessed) {
        setTempMessage({
            message: `Already Guessed.`,
            backgroundColor: Colors.card1,
            textColor: Colors.text,
        });
        return true;
    } else {
        return false;
    }
}
