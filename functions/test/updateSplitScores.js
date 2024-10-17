import getMoveListFromNode from "./getMoveListFromNode";
import saveTreesToDb from "./saveTreesToDb";

export default function updateSplitScores(
    split,
    splitObj,
    trees,
    whiteCombinedTree,
    blackCombinedTree,
    treesToUpdate
) {
    const moves = getMoveListFromNode(split.splitNode, split.color);

    trees.forEach((tree) => {
        let currentNode = tree.tree;

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
        splitObj.forEach((splitMoveObj) => {
            currentNode.children?.forEach((child) => {
                if (child.move === splitMoveObj.move) {
                    const currentConfidence = child.confidence || 0;

                    if (splitMoveObj.correct) {
                        if (currentConfidence < 2) {
                            child.confidence = currentConfidence + 1;
                            if (!treesToUpdate.includes(tree.pgnUUID)) {
                                treesToUpdate.push(tree.pgnUUID);
                            }
                        }
                    } else {
                        if (currentConfidence > 0) {
                            child.confidence = currentConfidence - 1;
                            if (!treesToUpdate.includes(tree.pgnUUID)) {
                                treesToUpdate.push(tree.pgnUUID);
                            }
                        }
                    }
                }
            });
        });
    });

    const relevantTree = split.color === "white" ? whiteCombinedTree : blackCombinedTree;
    let currentNode = relevantTree;

    for (let index = 0; index < moves.length; index++) {
        const move = moves[index].move;
        const nextNode = currentNode.children?.find((child) => child.move === move);
        if (nextNode) {
            currentNode = nextNode;
        } else {
            return;
        }
    }

    for (const split of splitObj) {
        const correctChild = currentNode.children.find((child) => child.move === split.move);
        if (correctChild) {
            if (split.correct) {
                if (correctChild.confidence < 2) {
                    correctChild.confidence += 1;
                }
            } else {
                if (correctChild.confidence > 0) {
                    correctChild.confidence -= 1;
                }
            }
        }
    }
}
