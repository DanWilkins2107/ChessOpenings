function treeToPgn(currentNode) {
    while (currentNode.parent) {
        currentNode = currentNode.parent;
    }

    function addPGNNode(node) {
        let pgn = [];
        while (node.children.length > 0) {
            firstChildNode = node.children[0];
            pgn.push({move: firstChildNode.move});

            if (node.children.length > 1) {
                pgn[pgn.length - 1].ravs = [];
                for (let i = 1; i < node.children.length; i++) {
                    ravsNode = node.children[i];
                    ravToAdd = [{move: ravsNode.move}].concat(addPGNNode(ravsNode));
                    pgn[pgn.length - 1].ravs.push(ravToAdd);
                }
            }
            node = firstChildNode;
        }
        return pgn;
    } 

    const pgn = addPGNNode(currentNode);
    console.log(JSON.stringify(pgn, null, 2));

    return pgn;
}


export default treeToPgn;