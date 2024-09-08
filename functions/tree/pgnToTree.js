function pgnToTree(pgn) {
    let tree = {
        move: "Start",
        children: [],
        parent: null,
    };

    function addNode(newObject, parent) {
        const firstMove = newObject[0];
        if (!firstMove) {
            return
        }
        const newNode = {
            move: firstMove.move,
            comments: firstMove.comments,
            children: [],
            parent: parent,
        };

        if (firstMove.confidence) {
            newNode.confidence = firstMove.confidence;
        }

        parent.children.push(newNode);

        if (firstMove.ravs) {
            for (const rav of firstMove.ravs) {
                addNode(rav.moves, parent);
            }
        }
        const newObj = newObject.slice(1);
        if (newObj.length === 0) {
            return;
        }
        addNode(newObj, newNode);
    }

    addNode(pgn, tree);

    return tree;
}

export default pgnToTree;
