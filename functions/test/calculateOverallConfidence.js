export default function calculateOverallConfidence(tree, color) {
    const moveNumber = -1;
    const valueList = [];

    const thresholdValues = [];

    const colorNumber = color === "white" ? 0 : 1;

    const treeHelperFunction = (node, currentMoveNumber) => {
        if (node.move !== "Start") {
            valueList.push(node.confidence || 0);
            if (currentMoveNumber % 2 === colorNumber) {
                thresholdValues.push(5);
            } else {
                thresholdValues.push(2);
            }
        }
        if (!node.children || node.children.length === 0) {
            return;
        }
        for (const child of node.children) {
            treeHelperFunction(child, currentMoveNumber + 1);
        }
    };

    treeHelperFunction(tree, moveNumber);

    if (valueList.length === 0) {
        return { score: 100, total: 0 };
    }

    let valueTotal = 0;
    let thresholdTotal = 0;

    for (let i = 0; i < valueList.length; i++) {
        valueTotal += valueList[i];
        thresholdTotal += thresholdValues[i];
    }

    const total = (valueTotal / thresholdTotal) * 100;

    // Account for rounding error!
    if (total > 99.99) {
        return { score: 100, total: thresholdTotal };
    } else {
        return { score: Math.floor(total), total: thresholdTotal };
    }
}
