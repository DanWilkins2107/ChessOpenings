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

export const handleDoubleRightPress = (currentNode, setCurrentNode, chess) => {
    let lastChild = currentNode;
    while (lastChild.children.length > 0) {
        lastChild = lastChild.children[0];
    }
    setCurrentNode(lastChild);
    const moves = [];
    let tempNode = lastChild;
    while (tempNode.parent) {
        moves.push(tempNode.move);
        tempNode = tempNode.parent;
    }
    chess.reset();
    for (let i = moves.length - 1; i >= 0; i--) {
        chess.move(moves[i]);
    }
};

export const handleDoubleLeftPress = (currentNode, setCurrentNode, chess) => {
    if (currentNode.parent) {
        let tempNode = currentNode;
        while (tempNode.parent) {
            tempNode = tempNode.parent;
            chess.undo();
        }
        setCurrentNode(tempNode);
    }
};

export const deleteNodes = (currentNode, setCurrentNode, chess) => {
    if (currentNode.parent) {
        const parent = currentNode.parent;
        const index = parent.children.indexOf(currentNode);
        parent.children.splice(index, 1);
        chess.undo();
        setCurrentNode(parent);
    } else {
        // In this case, the current node is the root node, and we want to delete all children
        currentNode.children = [];
        chess.reset();
    }
};
