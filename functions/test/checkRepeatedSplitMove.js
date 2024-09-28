import { Colors } from "../../styling";

export default function checkRepeatedSplitMove(move, moveList, setMessageObj) {
    if (moveList[move]?.guessed) {
        setMessageObj({
            message: `Already Guessed.`,
            backgroundColor: Colors.card1,
            textColor: Colors.text,
        });
        return true;
    } else {
        return false;
    }
}
