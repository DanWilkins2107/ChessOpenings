import { Colors } from "../../styling";
import getMoveListFromNode from "./getMoveListFromNode";

export default function setUpSplitTest(split, chess, setPermMessage, setPov, setMoveList) {
    const moveList = getMoveListFromNode(split.splitNode, split.color);
    const otherColor = split.color === "white" ? "black" : "white";
    chess.reset();
    for (moveObj of moveList) {
        chess.move(moveObj.move);
    }
    setPermMessage({
        message: `What are ${otherColor}'s moves?`,
        backgroundColor: Colors.card1,
        textColor: Colors.text,
    });
    setPov(split.color);

    const correctMoveArray = [];
    split.splitNode.children.forEach((child) => {
        correctMoveArray.push({ move: child.move, guessed: false, correct: false });
    });

    setMoveList(correctMoveArray);
}
