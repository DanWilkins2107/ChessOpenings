import findInitialBranchCategory from "./findInitialBranchCategory";

export default function updateBranchCategories(branchObj, treesToUpdate, isCorrect) {
    console.log(branchObj)
    const newBranchObj = {
        unselected: [],
        selected: [],
        finished: [],
    };

    branchObj.unselected.forEach((branch) => {
        if (!treesToUpdate.includes(branch.pgnUUID)) {
            newBranchObj.unselected.push(branch);
            return;
        }

        if (!isCorrect) {
            return;
        }

        const category = findInitialBranchCategory(branch);
        newBranchObj[category].push(branch);
    });

    branchObj.selected.forEach((branch) => {
        if (!treesToUpdate.includes(branch.pgnUUID)) {
            newBranchObj.selected.push(branch);
            return;
        }

        // Need to check for the branch being finished
        const category = findInitialBranchCategory(branch);
        if (category === "finished") {
            newBranchObj.finished.push(branch);
        } else {
            newBranchObj.selected.push(branch);
        }
    });

    branchObj.finished.forEach((branch) => {
        if (!treesToUpdate.includes(branch.pgnUUID)) {
            newBranchObj.finished.push(branch);
            return;
        }

        if (isCorrect) {
            newBranchObj.finished.push(branch);
            return;
        }

        // Need to check for the branch no longer being finished
        const category = findInitialBranchCategory(branch);
        if (category === "finished") {
            newBranchObj.finished.push(branch);
        } else {
            newBranchObj.selected.push(branch);
        }
    });

    return newBranchObj
}
