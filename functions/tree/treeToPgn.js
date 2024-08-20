function treeToPgn(currentNode) {
    while (currentNode.parent) {
        currentNode = currentNode.parent;
    }

    function addPGNNode(node) {
        let pgn = [];
        while (node.children.length > 0) {
            firstChildNode = node.children[0];
            if (firstChildNode.confidence !== undefined) {
                pgn.push({ move: firstChildNode.move, confidence: firstChildNode.confidence });
            } else {
                pgn.push({ move: firstChildNode.move });
            }

            if (node.children.length > 1) {
                pgn[pgn.length - 1].ravs = [];
                for (let i = 1; i < node.children.length; i++) {
                    ravsNode = node.children[i];
                    let ravToAdd;
                    if (ravsNode.confidence !== undefined) {
                        ravToAdd = [
                            { move: ravsNode.move, confidence: ravsNode.confidence },
                        ].concat(addPGNNode(ravsNode));
                    } else {
                        ravToAdd = [{ move: ravsNode.move }].concat(addPGNNode(ravsNode));
                    }
                    pgn[pgn.length - 1].ravs.push({ moves: ravToAdd });
                }
            }
            node = firstChildNode;
        }
        return pgn;
    }

    const pgn = addPGNNode(currentNode);
    return pgn;
}

export default treeToPgn;
