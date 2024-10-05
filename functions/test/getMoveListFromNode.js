const getMoveListFromNode = (node, color) => {
    const moveList = [];
    const reversedMoveList = [];
    const movesToRemoveConfidence = color === "white" ? 1 : 0;

    const getMoveListFromNodeHelper = (node) => {
        if (!node) {
            return;
        }
        if (node.parent) {
            moveList.push({ move: node.move, confidence: node.confidence || 0 });
            getMoveListFromNodeHelper(node.parent);
        }
    };

    getMoveListFromNodeHelper(node);
    const moveListTemp = moveList.reverse();

    for (let i = 0; i < moveListTemp.length; i++) {
        if (true) {
            // Note indexing starts at 0
            reversedMoveList.push({ move: moveListTemp[i].move });
        } else {
            reversedMoveList.push({
                move: moveListTemp[i].move,
                confidence: moveListTemp[i].confidence,
            });
        }
    }

    return reversedMoveList;
};

export default getMoveListFromNode;
