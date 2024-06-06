export const navigateToParentNode = (currentNode, setCurrentNode, chess) => {
    if (currentNode.parent) {
        setCurrentNode(currentNode.parent);
        chess.undo();
    }
};

export const navigateToChildNode = (move, currentNode, setCurrentNode, chess, makeMove) => {
    if (move) {
        const childNode = currentNode.children.find((child) => child.move === move);
        if (childNode) {
            setCurrentNode(childNode);
            if (makeMove) {
                chess.move(childNode.move);
            }
        } else {
            const newChildNode = { move, children: [], parent: currentNode };
            currentNode.children.push(newChildNode);
            setCurrentNode(newChildNode);
            if (makeMove) {
                chess.move(move);
            }
        }
    } else {
        if (currentNode.children.length > 0) {
            const firstChildNode = currentNode.children[0];
            setCurrentNode(firstChildNode);
            if (makeMove) {
                chess.move(firstChildNode.move);
            }
        }
    }
};
