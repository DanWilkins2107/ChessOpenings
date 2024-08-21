export default function resetConfidence(tree, color) {
    const moveNumber = -1;

    const colorNumber = color === "white" ? 0 : 1;

    const treeHelperFunction = (node, currentMoveNumber) => {
        if (currentMoveNumber % 2 === colorNumber) {
            node.confidence = 0;
        } 
        if (!node.children || node.children.length === 0) {
            return;
        }
        for (const child of node.children) {
            treeHelperFunction(child, currentMoveNumber + 1);
        }
    }

    treeHelperFunction(tree, moveNumber);

    return tree;
}
