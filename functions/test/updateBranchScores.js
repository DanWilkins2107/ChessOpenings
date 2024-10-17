import findOtherBranchCategory from "./findOtherBranchCategory";
import findSplitCategory from "./findSplitCategory";
import swapObjList from "./swapObjList";
import updateBranchConfidenceScores from "./updateBranchConfidenceScores";
import updateCombinedTree from "./updateCombinedTree";

export default function updateBranchScores(
    whiteCombinedTree,
    blackCombinedTree,
    splitObj,
    otherBranchObj,
    isCorrect,
    moveList,
    moveIndex,
    trees,
    color, 
    treesToUpdate
) {
    updateBranchConfidenceScores(isCorrect, moveList, moveIndex, trees, color, treesToUpdate);

    const validTree = color === "white" ? whiteCombinedTree : blackCombinedTree;
    updateCombinedTree(validTree, moveList, moveIndex);

    splitObj.unselected.map((split) => {
        const category = findSplitCategory(split.splitNode, "unselected", 2);
        if (category === "selected") {
            swapObjList(split, splitObj.unselected, splitObj.selected);
        } else if (category === "finished") {
            swapObjList(split, splitObj.unselected, splitObj.finished);
        }
    });

    otherBranchObj.unselected.map((branch) => {
        const category = findOtherBranchCategory(branch, "unselected");
        if (category === "selected") {
            swapObjList(branch, otherBranchObj.unselected, otherBranchObj.selected);
        } else if (category === "finished") {
            swapObjList(branch, otherBranchObj.unselected, otherBranchObj.finished);
        }
    });
}
