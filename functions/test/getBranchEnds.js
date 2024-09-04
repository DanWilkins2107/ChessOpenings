// Returns in the form { endNode, confidenceOfLastCorrectColourNode, lastMoveNumber}

export default function getBranchEnds(tree, color) {
    const branchEnds = [];
    const moveNumber = -1;
    const numberToMatch = color === "white" ? 0 : 1;
    const getBranchEndsHelper = (node, moveNumber) => {
        if (!node.children || node.children.length === 0) {
            const lastCorrectColourNode = moveNumber % 2 === numberToMatch ? node : node.parent;
            const confidence = lastCorrectColourNode.confidence || 0;

            branchEnds.push({ endNode: node, confidence: confidence, lastMoveNumber: moveNumber });
        } else {
            node.children.forEach((child) => getBranchEndsHelper(child, moveNumber + 1));
        }
    };

    getBranchEndsHelper(tree, moveNumber);
    return branchEnds;
}
