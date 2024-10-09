import saveTreesToDb from "./saveTreesToDb";

export default function updateBranchConfidenceScores(
    isCorrect,
    moveList,
    moveIndex,
    trees,
    color
) {
    const treesToUpdate = [];

    trees.forEach((tree) => {
        if (tree.color !== color) {
            return;
        }
        let currentNode = tree.tree;
        let needsSaving = false;

        for (let i = 0; i < moveIndex + 1; i++) {
            const move = moveList[i].move;
            const nextNode = currentNode.children?.find((child) => child.move === move);
            if (nextNode) {
                currentNode = nextNode;
            } else {
                return;
            }
        }

        if (isCorrect) {
            if ((currentNode.confidence || 0) < 5) {
                currentNode.confidence = (currentNode.confidence || 0) + 1;
                needsSaving = true;
            }
        } else {
            if ((currentNode.confidence || 0) > 0) {
                currentNode.confidence = (currentNode.confidence || 0) - 1;
                needsSaving = true;
            }
        }

        if (needsSaving) {
            saveTreesToDb(tree.tree, tree.pgnUUID);
            treesToUpdate.push(tree);
        }
    });

    return treesToUpdate;
}
