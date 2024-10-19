function treeToPgn(currentNode) {
    while (currentNode.parent) {
        currentNode = currentNode.parent;
    }

    console.log("StarterMove", currentNode.move);

    const pgn = [];

    function createPGNTree(node, pgnList) {
        const noOfChildren = node.children?.length || 0;
        if (noOfChildren === 0) {
            return;
        }

        if (noOfChildren === 1) {
            pgnList.push({
                move: node.children[0].move,
                confidence: node.children[0].confidence || null,
                comment: node.children[0].comment || null,
            });
            createPGNTree(node.children[0], pgnList);
            return;
        }

        if (noOfChildren > 1) {
            const ravsArray = [];
            pgnList.push({
                move: node.children[0].move,
                confidence: node.children[0].confidence || null,
                comment: node.children[0].comment || null,
                ravs: ravsArray,
            });
            createPGNTree(node.children[0], pgnList);
            for (let i = 1; i < noOfChildren; i++) {
                const addMoveToArray = [
                    {
                        move: node.children[i].move,
                        confidence: node.children[i].confidence || null,
                        comment: node.children[i].comment || null,
                    },
                ];
                const ravsObj = { moves: addMoveToArray };
                ravsArray.push(ravsObj);
                createPGNTree(node.children[i], addMoveToArray);
            }
            return;
        }
    }

    createPGNTree(currentNode, pgn);
    return pgn;
}

export default treeToPgn;
