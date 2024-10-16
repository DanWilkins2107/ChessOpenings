function getBranchSplits(combinedTree, color) {
    const splits = [];
    console.log("COLOR:", color);
    const colorNumber = color === "white" ? 0 : 1;
    const initialMoveNumber = -1;

    const combinedTreeHelper = (node, moveNumber) => {
        if (!node.children || node.children.length === 0) {
            return;
        }
        if (node.children.length > 1) {
            console.log(node.children.length, moveNumber, colorNumber);
            if (moveNumber % 2 === colorNumber) {
                splits.push(node);
            }
        }
        node.children.forEach((child) => {
            combinedTreeHelper(child, moveNumber + 1);
        });
    };

    combinedTreeHelper(combinedTree, initialMoveNumber);
    console.log("Splits:", splits);
    return splits;
}

export default getBranchSplits;
