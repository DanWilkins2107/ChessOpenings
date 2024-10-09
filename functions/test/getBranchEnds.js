export default function getBranchEnds(tree) {
    const branchEnds = [];
    const moveNumber = -1;
    const numberToMatch = tree.color === "white" ? 0 : 1;
    const getBranchEndsHelper = (node, moveNumber) => {
        if (!node.children || node.children.length === 0) {
            if (node.move === "Start") return;
            const lastCorrectColourNode = moveNumber % 2 === numberToMatch ? node : node.parent;
            const confidence = lastCorrectColourNode?.confidence || 0;

            branchEnds.push({
                title: tree.title,
                chapterName: tree.chapterName,
                endNode: node,
                confidence: confidence,
                lastMoveNumber: moveNumber,
                color: tree.color,
                pgnUUID: tree.pgnUUID
            });
        } else {
            node.children.forEach((child) => getBranchEndsHelper(child, moveNumber + 1));
        }
    };

    getBranchEndsHelper(tree.tree, moveNumber);
    return branchEnds;
}
