// This should update the confidence scores and return array of PGNs that have changed confidence scores and need to be updated in the database.
import checkForFullConfidenceMoveList from "./checkForFullConfidenceMoveList";
import getMoveListFromNode from "./getMoveListFromNode";
import saveTreesToDb from "./saveTreesToDb";

export default function updateBranchConfidenceScores(
    trackedBranchObj,
    branchObj,
    isCorrect,
    moveList,
    moveIndex,
    trees,
    color
) {
    // Update the confidence scores in the trees
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
                console.log("upped confidence", currentNode.confidence);
                currentNode.confidence = (currentNode.confidence || 0) + 1;
                needsSaving = true;
            }
        } else {
            if ((currentNode.confidence || 0) > 0) {
                console.log("lowered confidence", currentNode.confidence);
                currentNode.confidence = (currentNode.confidence || 0) - 1;
                needsSaving = true;
            }
        }

        if (needsSaving) {
            saveTreesToDb(tree.tree, tree.pgnUUID);
        }
    });

    const moveBranches = (branch, arrayIfBecomingUntracked, testFunction) => {
        const lastMoveMoveNumber = branch.moveNumber;

        if (moveIndex > lastMoveMoveNumber) {
            return;
        }

        let currentNode = branch.endNode;
        const nodesToMoveBack = lastMoveMoveNumber - moveIndex;

        for (let i = 0; i < nodesToMoveBack; i++) {
            currentNode = currentNode.parent;
        }

        if (currentNode.move === moveList[moveIndex].move) {
            if (moveIndex !== 0) {
                const parentNode = currentNode.parent;
                if (parentNode.move === moveList[moveIndex - 1].move) {
                    testFunction(currentNode, branch, isCorrect);
                } else {
                    arrayIfBecomingUntracked.push(branch);
                }
            }
        }
    };

    const nodesToRemoveFromTrackedUnselected = [];
    const nodesToRemoveFromTrackedSelected = [];
    const nodesToRemoveFromTrackedFinished = [];

    // Possible changes: unselected -> finished, unselected -> selected, selected -> finished, finished -> selected
    const unselectedToFinished = [];
    const unselectedToSelected = [];
    const selectedToFinished = [];
    const finishedToSelected = [];

    trackedBranchObj.unselected.forEach((branch) => {
        moveBranches(branch, nodesToRemoveFromTrackedUnselected, (currentNode, branch) => {
            // Unselected can move to finished if it is fully confident
            const branchMoves = getMoveListFromNode(branch.endNode, branch.color);
            if (checkForFullConfidenceMoveList(branchMoves) === -1) {
                unselectedToFinished.push(branch);
            } else {
                // Unselected can move to selected if it is already being fully trained (+1 as if there's another wrong colour move it is untrainable)
                if (branchMoves.length <= moveIndex + 1) {
                    unselectedToSelected.push(branch);
                }
            }
        });
    });

    trackedBranchObj.selected.forEach((branch) => {
        moveBranches(branch, nodesToRemoveFromTrackedSelected, (currentNode, branch) => {
            // Selected can move to finished if it is fully confident
            const branchMoves = getMoveListFromNode(branch.endNode, branch.color);
            if (checkForFullConfidenceMoveList(branchMoves) === -1) {
                selectedToFinished.push(branch);
            }
        });
    });

    trackedBranchObj.finished.forEach((branch) => {
        moveBranches(branch, nodesToRemoveFromTrackedFinished, (currentNode, branch, isCorrect) => {
            // Finished can move to selected if it is no longer fully confident
            if (!isCorrect) {
                const branchMoves = getMoveListFromNode(branch.endNode, branch.color);
                if (checkForFullConfidenceMoveList(branchMoves) !== -1) {
                    finishedToSelected.push(branch);
                }
            }
        });
    });

    // Perform list filtering
    const newTrackedBranchesUnselected = trackedBranchObj.unselected.filter(
        (branch) =>
            !nodesToRemoveFromTrackedUnselected.includes(branch) &&
            !unselectedToFinished.includes(branch) &&
            !unselectedToSelected.includes(branch)
    );

    const newUnselectedBranches = branchObj.unselected.filter(
        (branch) => !unselectedToFinished.includes(branch) && !unselectedToSelected.includes(branch)
    );

    const newTrackedBranchesSelected = branchObj.selected.filter(
        (branch) =>
            !nodesToRemoveFromTrackedSelected.includes(branch) &&
            !selectedToFinished.includes(branch)
    );

    const newSelectedBranches = branchObj.selected.filter(
        (branch) => !selectedToFinished.includes(branch)
    );

    const newTrackedBranchesFinished = branchObj.finished.filter(
        (branch) =>
            !nodesToRemoveFromTrackedFinished.includes(branch) &&
            !finishedToSelected.includes(branch)
    );

    const newFinishedBranches = branchObj.finished.filter(
        (branch) => !finishedToSelected.includes(branch)
    );

    // Perform adding of nodes
    unselectedToFinished.forEach((branch) => {
        newFinishedBranches.push(branch);
        newTrackedBranchesFinished.push(branch);
    });

    unselectedToSelected.forEach((branch) => {
        newSelectedBranches.push(branch);
        newTrackedBranchesSelected.push(branch);
    });

    selectedToFinished.forEach((branch) => {
        newFinishedBranches.push(branch);
        newTrackedBranchesFinished.push(branch);
    });

    finishedToSelected.forEach((branch) => {
        newSelectedBranches.push(branch);
        newTrackedBranchesSelected.push(branch);
    });

    return {
        newTrackedBranchesUnselected,
        newTrackedBranchesSelected,
        newTrackedBranchesFinished,
        newUnselectedBranches,
        newSelectedBranches,
        newFinishedBranches,
    };
}
