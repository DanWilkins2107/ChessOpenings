// This should update the confidence scores and return array of PGNs that have changed confidence scores and need to be updated in the database.
import checkForFullConfidenceMoveList from "./checkForFullConfidenceMoveList";
import getMoveListFromNode from "./getMoveListFromNode";

export default function updateConfidenceScores(
    trackedBranchesUnselected,
    trackedBranchesSelected,
    trackedBranchesFinished,
    setTrackedBranchesUnselected,
    setTrackedBranchesSelected,
    setTrackedBranchesFinished,
    unselectedBranches,
    selectedBranches,
    finishedBranches,
    setUnselectedBranches,
    setSelectedBranches,
    setFinishedBranches,
    isCorrect,
    moveList,
    moveIndex
) {
    // Possible changes: unselected -> finished, selected -> finished, finished -> selected
    const unselectedToFinished = [];
    const selectedToFinished = [];
    const finishedToSelected = [];

    const checkTrackingAndUpdateConfidence = (branch, arrayIfBecomingUntracked, testFunction) => {
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
                    // Edited the confidence here
                    if (isCorrect && (currentNode.confidence || 0) < 5) {
                        currentNode.confidence = (currentNode.confidence || 0) + 1;
                    } else if (!isCorrect && (currentNode.confidence || 0) > 0) {
                        currentNode.confidence = (currentNode.confidence || 0) - 1;
                    }

                    testFunction(currentNode, branch);
                } else {
                    arrayIfBecomingUntracked.push(branch);
                }
            }
        }
    };

    const nodesToRemoveFromTrackedUnselected = [];
    const nodesToRemoveFromTrackedSelected = [];
    const nodesToRemoveFromTrackedFinished = [];

    trackedBranchesUnselected.forEach((branch) => {
        checkTrackingAndUpdateConfidence(
            branch,
            nodesToRemoveFromTrackedUnselected,
            (currentNode, branch) => {
                // Unselected can move to finished if it is fully confident
                const branchMoves = getMoveListFromNode(branch.endNode, branch.color);
                if (checkForFullConfidenceMoveList(branchMoves) === -1) {
                    unselectedToFinished.push(branch);
                }

                // Unselected can move to selected if it is already being trained already
            }
        );
    });

    trackedBranchesSelected.forEach((branch) => {
        checkTrackingAndUpdateConfidence(branch);
    });
}
