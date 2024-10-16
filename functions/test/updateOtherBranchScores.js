import saveTreesToDb from "./saveTreesToDb";

export default function updateOtherBranchScores(
    moveList,
    moveIndex,
    isCorrect,
    trees,
    whiteCombinedTree,
    blackCombinedTree,
    color
) {
    const movesPlayed = moveList.slice(0, moveIndex + 1);
    trees.forEach((tree) => {
        let currentNode = tree.tree;
        for (let index = 0; index < movesPlayed.length; index++) {
            const move = movesPlayed[index].move;
            const nextNode = currentNode.children?.find((child) => child.move === move);
            if (nextNode) {
                currentNode = nextNode;
            } else {
                return;
            }
        }

        // Update the confidence score
        const currentConfidence = currentNode.confidence || 0;

        if (isCorrect) {
            if (currentConfidence < 2) {
                currentNode.confidence = currentConfidence + 1;
                saveTreesToDb(tree.tree, tree.pgnUUID);
            }
        } else {
            if (currentConfidence > 0) {
                currentNode.confidence = currentConfidence - 1;
                saveTreesToDb(tree.tree, tree.pgnUUID);
            }
        }
    });

    // Update combined tree
    const relevantTree = color === "white" ? blackCombinedTree : whiteCombinedTree;

    let currentNode = relevantTree;
    for (let index = 0; index < movesPlayed.length; index++) {
        const move = movesPlayed[index].move;
        const nextNode = currentNode.children?.find((child) => child.move === move);
        if (nextNode) {
            currentNode = nextNode;
        } else {
            return;
        }
    }

    // Update the confidence score
    const currentConfidence = currentNode.confidence || 0;

    if (isCorrect) {
        if (currentConfidence < 2) {
            currentNode.confidence = currentConfidence + 1;
        }
    } else {
        if (currentConfidence > 0) {
            currentNode.confidence = currentConfidence - 1;
        }
    }
}
