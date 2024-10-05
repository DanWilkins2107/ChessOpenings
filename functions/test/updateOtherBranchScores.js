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
    console.log(movesPlayed);
    trees.forEach((tree) => {
        let currentNode = tree.tree;
        let currentMoveIndex = 0;

        for (let index = 0; index < movesPlayed.length; index++) {
            const move = movesPlayed[index].move;
            const nextNode = currentNode.children?.find((child) => child.move === move);
            if (nextNode) {
                currentNode = nextNode;
                currentMoveIndex = index;
            } else {
                return;
            }
        }

        // Update the confidence score
        console.log("Current node", currentNode.move);
        console.log(isCorrect)
        const currentConfidence = currentNode.confidence || 0;
        console.log("Current confidence", currentConfidence);

        if (isCorrect) {
            if (currentConfidence < 2) {
                console.log("Increasing confidence");
                currentNode.confidence = currentConfidence + 1;
                saveTreesToDb(tree.tree, tree.pgnUUID);
            }
        } else {
            if (currentConfidence > 0) {
                console.log("Decreasing confidence");
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
