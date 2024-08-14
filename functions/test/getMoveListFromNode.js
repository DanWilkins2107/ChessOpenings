const getMoveListFromNode = (node) => {
    const moveList = [];

    const getMoveListFromNodeHelper = (node) => {
        if (!node) {
            return;
        }
        if (node.parent) {
            console.log(node.parent)
            moveList.push(node.move);
            getMoveListFromNodeHelper(node.parent);
        }
    };

    getMoveListFromNodeHelper(node);
    return moveList.reverse();
}

export default getMoveListFromNode;