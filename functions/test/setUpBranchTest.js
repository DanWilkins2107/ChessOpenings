import { Colors } from "../../styling";
import checkForFullConfidenceMoveList from "./checkForFullConfidenceMoveList";
import getMoveListFromNode from "./getMoveListFromNode";

export default function setUpBranchTest(
    branch,
    chess,
    setMessageObj,
    setPov,
    setMoveList,
    setMoveIndex,
    isOtherBranch
) {
    const threshold = isOtherBranch ? 2 : 5;
    const moveList = getMoveListFromNode(branch.endNode, branch.color);
    const moveIndex = checkForFullConfidenceMoveList(moveList, branch.color, threshold);

    if (moveIndex === -1) {
        console.log("Fully Confident. TODO");
    }

    if (isOtherBranch) {
        console.log(branch.color);
        console.log(moveList);
    }

    chess.reset();
    moveList.slice(0, moveIndex).forEach((move) => {
        chess.move(move.move);
    });

    const color = branch.color === "white" ? "White" : "Black";
    const povColor = isOtherBranch ? (branch.color === "white" ? "black" : "white") : branch.color;

    setPov(povColor);
    if (isOtherBranch) {
        setMessageObj({
            message: `What is ${color}'s move?`,
            backgroundColor: Colors.card1,
            textColor: Colors.text,
        });
    } else {
        setMessageObj({
            message: `${color} to Move.`,
            backgroundColor: Colors.card1,
            textColor: Colors.text,
        });
    }

    setMoveList(moveList);
    setMoveIndex(moveIndex);
}
