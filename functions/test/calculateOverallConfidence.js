export default function calculateOverallConfidence(tree, color) {
    const moveNumber = -1;
    const valueList = [];

    const colorNumber = color === "white" ? 0 : 1;

    const treeHelperFunction = (node, currentMoveNumber) => {
        if (currentMoveNumber % 2 === colorNumber) {
            valueList.push(node.confidence || 0);
        } 
        if (!node.children || node.children.length === 0) {
            return;
        }
        for (const child of node.children) {
            treeHelperFunction(child, currentMoveNumber + 1);
        }
    }

    treeHelperFunction(tree, moveNumber);

    let total = 0;
    for (const value of valueList) {
        total += value;
    }
    
    total /= valueList.length;
    total *= 20;

    // Account for rounding error!
    if (total > 99.99) { 
        return 100;
    } else {
        return Math.floor(total);
    }
}