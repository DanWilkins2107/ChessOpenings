import editReachedTree from "../test/editReachedTree";
import findInitialBranchCategory from "../test/findInitialBranchCategory";
import findOtherBranchCategory from "../test/findOtherBranchCategory";
import findSplitCategory from "../test/findSplitCategory";
import getBranchEnds from "../test/getBranchEnds";
import getBranchSplits from "../test/getBranchSplits";
import makeCombinedTree from "../test/makeCombinedTree";

export default async function setUpTraining(treeArray) {
    // Create Branch Arrays and Combined Trees
    const allBranchEnds = [];
    const whiteBranchEnds = [];
    const blackBranchEnds = [];

    // Branches
    treeArray.map((tree) => {
        const ends = getBranchEnds(tree);
        allBranchEnds.push(...ends);
        if (tree.color === "white") {
            whiteBranchEnds.push(...ends);
        } else {
            blackBranchEnds.push(...ends);
        }
    });

    // Sort Branches
    const branchObj = { unselected: [], selected: [], finished: [] };
    allBranchEnds.forEach((end) => {
        const category = findInitialBranchCategory(end);
        if (category === "untrainable") return;
        branchObj[category].push(end);
    });

    // Get Combined Trees
    const whiteCombinedTree = makeCombinedTree({
        branchArray: whiteBranchEnds,
        color: "white",
    });

    const blackCombinedTree = makeCombinedTree({
        branchArray: blackBranchEnds,
        color: "black",
    });

    // Perform reached checks
    branchObj.finished.map((branch) => {
        const relevantTree = branch.color === "white" ? whiteCombinedTree : blackCombinedTree;
        editReachedTree(relevantTree, branch);
    });

    branchObj.selected.map((branch) => {
        const relevantTree = branch.color === "white" ? whiteCombinedTree : blackCombinedTree;
        editReachedTree(relevantTree, branch);
    });

    const whiteSplits = getBranchSplits(whiteCombinedTree, "white");
    const blackSplits = getBranchSplits(blackCombinedTree, "black");

    // Deal with splits
    const splitObj = {
        unselected: [],
        selected: [],
        finished: [],
    };

    whiteSplits.map((split) => {
        const category = findSplitCategory(split, "unselected", 2);
        splitObj[category].push({ splitNode: split, color: "white" });
    });

    blackSplits.map((split) => {
        const category = findSplitCategory(split, "unselected", 2);
        splitObj[category].push({ splitNode: split, color: "black" });
    });

    // Deal with Other Color Branches
    const otherWhiteBranches = getBranchEnds({ tree: blackCombinedTree, color: "white" });
    const otherBlackBranches = getBranchEnds({ tree: whiteCombinedTree, color: "black" });

    const otherBranchObj = { unselected: [], selected: [], finished: [] };

    otherWhiteBranches.forEach((end) => {
        const category = findOtherBranchCategory(end, "unselected");
        if (category === "untrainable") return;
        otherBranchObj[category].push(end);
    });

    otherBlackBranches.forEach((end) => {
        const category = findOtherBranchCategory(end, "unselected");
        if (category === "untrainable") return;
        otherBranchObj[category].push(end);
    });

    return { branchObj, splitObj, otherBranchObj, whiteCombinedTree, blackCombinedTree };
}
