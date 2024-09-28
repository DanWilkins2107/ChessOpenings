import { Colors } from "../../styling";
import checkForFullConfidenceMoveList from "./checkForFullConfidenceMoveList";
import getMoveListFromNode from "./getMoveListFromNode";

export default function setUpBranchTest(
    branch,
    chess,
    setPermMessage,
    setPov,
    setMoveList,
    setMoveIndex
) {
    const moveList = getMoveListFromNode(branch.endNode, branch.color);
    const moveIndex = checkForFullConfidenceMoveList(moveList, branch.color, 5);

    if (moveIndex === -1) {
        console.log("Fully Confident. TODO");
    }

    chess.reset();
    moveList.slice(0, moveIndex).forEach((move) => {
        chess.move(move.move);
    });

    const color = branch.color === "white" ? "White" : "Black";

    setPov(branch.color);
    setPermMessage({
        message: `${color} to Move.`,
        backgroundColor: Colors.card1,
        textColor: Colors.text,
    });
    setMoveList(moveList);
    setMoveIndex(moveIndex);
}
