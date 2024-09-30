import getMoveListFromNode from "./getMoveListFromNode";
import saveTreesToDb from "./saveTreesToDb";

export default function updateSplitScores(split, splitObj, trees) {
    const moves = getMoveListFromNode(split.splitNode, split.color);

    trees.forEach((tree) => {
        let currentNode = tree.tree;
        let currentMoveIndex = 0;

        for (let index = 0; index < moves.length; index++) {
            const move = moves[index].move;
            const nextNode = currentNode.children?.find((child) => child.move === move);
            if (nextNode) {
                currentNode = nextNode;
                currentMoveIndex = index;
            } else {
                treeContainsSplit = false;
                return;
            }
        }

        // Update the confidence score
        let needsSaving = false;
        splitObj.forEach((splitMoveObj) => {
            currentNode.children?.forEach((child) => {
                if (child.move === splitMoveObj.move) {
                    const currentConfidence = child.confidence || 0;

                    if (splitMoveObj.correct) {
                        if (currentConfidence < 2) {
                            child.confidence = currentConfidence + 1;
                            needsSaving = true;
                        }
                    } else {
                        if (currentConfidence > 0) {
                            child.confidence = currentConfidence - 1;
                            needsSaving = true;
                        }
                    }
                }
            });
        });

        if (needsSaving) {
            saveTreesToDb(tree.tree, tree.pgnUUID);
        }
    });
}
