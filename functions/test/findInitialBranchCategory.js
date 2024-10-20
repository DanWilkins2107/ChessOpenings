import branchMinConfScore from "./branchMinConfScore";

export default function findInitialBranchCategory(branch) {
    const noOfMoves = branch.lastMoveNumber;
    const colorValue = branch.color === "white" ? 0 : 1;

    if (noOfMoves < colorValue) {
        return "untrainable";
    }

    let currentMove = branch.endNode;
    let currentMoveNo = noOfMoves;
    if (noOfMoves % 2 !== colorValue) {
        currentMove = currentMove.parent;
        currentMoveNo--;
    }

    if ((currentMove.confidence || 0) === 0) {
        return "unselected";
    }

    const branchConfidence = branchMinConfScore(branch);

    if (branchConfidence === 5) {
        return "finished";
    }
    return "selected";
}
