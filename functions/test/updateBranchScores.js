import findOtherBranchCategory from "./findOtherBranchCategory";
import findSplitCategory from "./findSplitCategory";
import updateBranchConfidenceScores from "./updateBranchConfidenceScores";
import updateCombinedTree from "./updateCombinedTree";

export default function updateBranchScores(
    branchObj,
    trackedBranchObj,
    whiteCombinedTree,
    blackCombinedTree,
    splitObj,
    otherBranchObj,
    isCorrect,
    moveList,
    moveIndex,
    trees,
    color
) {
    const {
        newTrackedBranchesUnselected,
        newTrackedBranchesSelected,
        newTrackedBranchesFinished,
        newUnselectedBranches,
        newSelectedBranches,
        newFinishedBranches,
    } = updateBranchConfidenceScores(
        trackedBranchObj,
        branchObj,
        isCorrect,
        moveList,
        moveIndex,
        trees,
        color
    );

    const newBranchObj = {
        unselected: newUnselectedBranches,
        selected: newSelectedBranches,
        finished: newFinishedBranches,
    };

    const newTrackedBranchObj = {
        unselected: newTrackedBranchesUnselected,
        selected: newTrackedBranchesSelected,
        finished: newTrackedBranchesFinished,
    };

    const validTree = color === "white" ? whiteCombinedTree : blackCombinedTree;
    updateCombinedTree(validTree, moveList, moveIndex);

    splitObj.unselected.map((split) => {
        const category = findSplitCategory(split, "unselected", 2);
        if (category === "selected") {
            splitObj.selected.push(split);
        } else if (category === "finished") {
            splitObj.finished.push(split);
        }

        if (category !== "unselected") {
            const index = splitObj.unselected.indexOf(split);
            splitObj.unselected.splice(index, 1);
        }
    });

    otherBranchObj.unselected.map((branch) => {
        const category = findOtherBranchCategory(branch, "unselected");
        if (category === "selected") {
            otherBranchObj.selected.push(branch);
        } else if (category === "finished") {
            otherBranchObj.finished.push(branch);
        }

        if (category !== "unselected") {
            const index = otherBranchObj.unselected.indexOf(branch);
            otherBranchObj.unselected.splice(index, 1);
        }
    });

    return { newBranchObj, newTrackedBranchObj };
}