import branchMinConfScore from "./branchMinConfScore";

export default function findInitialBranchCategory(branch) {
    const moves = branch.lastMoveNumber;
    const colorValue = branch.color === "white" ? 0 : 1;

    let currentMove = branch.endNode;
    let currentMoveNo = moves;
    if (moves % 2 !== colorValue) {
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
