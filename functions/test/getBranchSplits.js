const getBranchSplits = (tree, color) => {
    const branchSplits = [];
    const moveNumber = -1;
    const numberToMatch = color === "white" ? 0 : 1;

    const getBranchSplitsHelper = (node, moveNumber) => {
        if (!node.children || node.children.length === 0) {
            return;
        } else {
            if (node.children.length > 1 && moveNumber > 8 && moveNumber % 2 === numberToMatch) {
                branchSplits.push({ node: node, color: color, confidence: node.splitConfidence || 0 });
            }
            node.children.forEach((child) => getBranchSplitsHelper(child, moveNumber + 1));
        }
    };

    getBranchSplitsHelper(tree, moveNumber);
    return branchSplits;
};

export default getBranchSplits;