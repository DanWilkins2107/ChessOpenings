// This should update the confidence scores and return array of PGNs that have changed confidence scores and need to be updated in the database.
import checkForFullConfidenceMoveList from "./checkForFullConfidenceMoveList";
import getMoveListFromNode from "./getMoveListFromNode";
import minimumConfidenceScore from "./minimumConfidenceScore";
import saveTreesToDb from "./saveTreesToDb";

export default function updateConfidenceScores(
    trackedBranchesUnselected,
    trackedBranchesSelected,
    trackedBranchesFinished,
    unselectedBranches,
    selectedBranches,
    finishedBranches,
    isCorrect,
    moveList,
    moveIndex,
    trees
) {
    // Update the confidence scores in the trees
    trees.forEach((tree) => {
        const treeRootNode = tree.tree;
        let needsSaving = false;
        const treeHelperFunction = (node, currentMoveNumber) => {
            if (!node.children || node.children.length === 0) {
                return;
            }
            // Attempt to find a child that matches the move, there will only be one
            const matchingChild = node.children.find(
                (child) => child.move === moveList[currentMoveNumber].move
            );
            if (matchingChild) {
                if (currentMoveNumber === moveIndex) {
                    if (isCorrect) {
                        if ((matchingChild.confidence || 0) < 5) {
                            matchingChild.confidence = (matchingChild.confidence || 0) + 1;
                            needsSaving = true;
                        }
                    } else {
                        if ((matchingChild.confidence || 0) > 0) {
                            matchingChild.confidence = (matchingChild.confidence || 0) - 1;
                            needsSaving = true;
                        }
                    }
                } else {
                    treeHelperFunction(matchingChild, currentMoveNumber + 1);
                }
            }
        };

        treeHelperFunction(treeRootNode, 0);
        if (needsSaving) {
            saveTreesToDb(treeRootNode, tree.pgnUUID);
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

    trackedBranchesUnselected.forEach((branch) => {
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

    trackedBranchesSelected.forEach((branch) => {
        moveBranches(branch, nodesToRemoveFromTrackedSelected, (currentNode, branch) => {
            // Selected can move to finished if it is fully confident
            const branchMoves = getMoveListFromNode(branch.endNode, branch.color);
            if (checkForFullConfidenceMoveList(branchMoves) === -1) {
                selectedToFinished.push(branch);
            }
        });
    });

    trackedBranchesFinished.forEach((branch) => {
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
    const newTrackedBranchesUnselected = trackedBranchesUnselected.filter(
        (branch) =>
            !nodesToRemoveFromTrackedUnselected.includes(branch) &&
            !unselectedToFinished.includes(branch) &&
            !unselectedToSelected.includes(branch)
    );

    const newUnselectedBranches = unselectedBranches.filter(
        (branch) => !unselectedToFinished.includes(branch) && !unselectedToSelected.includes(branch)
    );

    const newTrackedBranchesSelected = trackedBranchesSelected.filter(
        (branch) =>
            !nodesToRemoveFromTrackedSelected.includes(branch) &&
            !selectedToFinished.includes(branch)
    );

    const newSelectedBranches = selectedBranches.filter(
        (branch) => !selectedToFinished.includes(branch)
    );

    const newTrackedBranchesFinished = trackedBranchesFinished.filter(
        (branch) =>
            !nodesToRemoveFromTrackedFinished.includes(branch) &&
            !finishedToSelected.includes(branch)
    );

    const newFinishedBranches = finishedBranches.filter(
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
