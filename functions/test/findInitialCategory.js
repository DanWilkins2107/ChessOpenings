export default function findBranchCategory(branchEnd, color, previousStatus, threshold) {
    // Find out how many moves the branch has

    const moves = branchEnd.lastMoveNumber;
    const colorValue = color === "white" ? 0 : 1;
    let endNode = branchEnd.endNode;

    if (moves % 2 != colorValue) {
        endNode = endNode.parent;
    }

    if ((endNode.confidence || 0) === 0) {
        if (previousStatus === "selected") {
            return "selected";
        } else {
            return "unselected";
        }
    } else if (endNode.confidence >= 1 && endNode.confidence < threshold) {
        return "selected";
    }

    const findBranchCategoryHelper = (node, moveNumber) => {
        if (moveNumber % 2 != colorValue) {
            node = node.parent;
        } else if ((node.confidence || 0) !== threshold && node.move !== "Start") {
            return "selected";
        }
    };

    findBranchCategoryHelper(endNode, moves);
    return "finished";
}
