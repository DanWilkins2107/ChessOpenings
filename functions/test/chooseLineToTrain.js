import branchMinConfScore from "./branchMinConfScore";
import otherBranchMinConfScore from "./otherBranchMinConfScore";
import randomItem from "./randomItem";
import splitMinConfScore from "./splitMinConfScore";
import swapObjList from "./swapObjList";

export default function chooseLineToTrain(branchObj, splitObj, otherBranchObj, minMoveValue = 15) {
    const branchMinConfObj = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
    };

    const splitMinConfObj = {
        0: [],
        1: [],
    };

    const otherBranchMinConfObj = {
        0: [],
        1: [],
    };

    branchObj.unselected.map((branch) => {
        if (branchMinConfScore(branch) !== 0) {
            swapObjList(branch, branchObj.unselected, branchObj.selected);
        }
    });

    branchObj.finished.map((branch) => {
        const confidence = branchMinConfScore(branch);
        if (confidence !== 5) {
            swapObjList(branch, branchObj.finished, branchObj.selected);
        }
    });

    branchObj.selected.map((branch) => {
        const confidence = branchMinConfScore(branch);
        if (confidence === 5) {
            swapObjList(branch, branchObj.selected, branchObj.finished);
            return;
        }
        branchMinConfObj[confidence].push(branch);
    });

    splitObj.unselected.map((split) => {
        const confidence = splitMinConfScore(split);
        if (confidence !== 0) {
            swapObjList(split, splitObj.unselected, splitObj.selected);
        }
    });

    splitObj.finished.map((split) => {
        const confidence = splitMinConfScore(split);
        if (confidence !== 2) {
            swapObjList(split, splitObj.finished, splitObj.selected);
        }
    });

    splitObj.selected.map((split) => {
        const confidence = splitMinConfScore(split);
        if (confidence === 2) {
            swapObjList(split, splitObj.selected, splitObj.finished);
            return;
        }
        splitMinConfObj[confidence].push(split);
    });

    otherBranchObj.unselected.map((branch) => {
        const confidence = otherBranchMinConfScore(branch);
        if (confidence !== 0) {
            swapObjList(branch, otherBranchObj.unselected, otherBranchObj.selected);
        }
    });

    otherBranchObj.finished.map((branch) => {
        const confidence = otherBranchMinConfScore(branch);
        if (confidence !== 2) {
            swapObjList(branch, otherBranchObj.finished, otherBranchObj.selected);
        }
    });

    otherBranchObj.selected.map((branch) => {
        const confidence = otherBranchMinConfScore(branch);
        if (confidence === 2) {
            swapObjList(branch, otherBranchObj.selected, otherBranchObj.finished);
            return;
        }
        otherBranchMinConfObj[confidence].push(branch);
    });

    const branchWeightings = {
        0: 4,
        1: 2,
        2: 1,
        3: 0.5,
        4: 0.5,
    };

    const splitWeightings = {
        0: 2,
        1: 1,
    };

    const otherBranchWeightings = {
        0: 2,
        1: 1,
    };

    let total = 0;
    for (let i = 0; i < 5; i++) {
        total += branchMinConfObj[i].length * branchWeightings[i];
    }
    for (let i = 0; i < 2; i++) {
        total += splitMinConfObj[i].length * splitWeightings[i];
        total += otherBranchMinConfObj[i].length * otherBranchWeightings[i];
    }

    if (total < minMoveValue) {
        if (branchObj.unselected.length > 0) {
            const randomBranch = randomItem(branchObj.unselected);
            branchObj.unselected = branchObj.unselected.filter((branch) => branch !== randomBranch);
            branchObj.selected.push(randomBranch);
            branchMinConfObj[0].push(randomBranch);
        }
    }

    if (total === 0 && branchObj.selected.length === 0) {
        const totalToPickFrom =
            branchObj.finished.length + splitObj.finished.length + otherBranchObj.finished.length;
        const randomValue = Math.floor(Math.random() * totalToPickFrom);
        let chosenItem = null;
        let typeOfTraining = "";

        if (randomValue < branchObj.finished.length) {
            chosenItem = randomItem(branchObj.finished);
            typeOfTraining = "branch";
        } else if (randomValue < branchObj.finished.length + splitObj.finished.length) {
            chosenItem = randomItem(splitObj.finished);
            typeOfTraining = "split";
        } else {
            chosenItem = randomItem(otherBranchObj.finished);
            typeOfTraining = "otherBranch";
        }

        return { typeOfTraining, chosenItem };
    } else {
        console.log("Total", total);
    }

    const pickingProbabilities = {
        branch: {
            0: 2,
            1: 1,
            2: 0.5,
            3: 0.25,
            4: 0.25,
        },
        split: {
            0: 1,
            1: 0.5,
        },
        otherBranch: {
            0: 1,
            1: 0.5,
        },
    };

    let totalPickingProb = 0;
    let branchTotal = 0;
    let splitTotal = 0;
    let otherBranchTotal = 0;

    for (let i = 0; i < 5; i++) {
        totalPickingProb += pickingProbabilities.branch[i] * branchMinConfObj[i].length;
        branchTotal += pickingProbabilities.branch[i] * branchMinConfObj[i].length;
    }
    for (let i = 0; i < 2; i++) {
        totalPickingProb += pickingProbabilities.split[i] * splitMinConfObj[i].length;
        totalPickingProb += pickingProbabilities.otherBranch[i] * otherBranchMinConfObj[i].length;
        splitTotal += pickingProbabilities.split[i] * splitMinConfObj[i].length;
        otherBranchTotal += pickingProbabilities.otherBranch[i] * otherBranchMinConfObj[i].length;
    }

    const randomValue = Math.random() * totalPickingProb;
    let typeOfTraining = "";
    let chosenItem = null;

    if (randomValue < branchTotal) {
        let currentTotal = 0;
        for (let i = 0; i < 5; i++) {
            currentTotal += pickingProbabilities.branch[i] * branchMinConfObj[i].length;
            if (randomValue < currentTotal) {
                typeOfTraining = "branch";
                chosenItem = randomItem(branchMinConfObj[i]);
                break;
            }
        }
    } else if (randomValue < branchTotal + splitTotal) {
        let currentTotal = branchTotal;
        for (let i = 0; i < 2; i++) {
            currentTotal += pickingProbabilities.split[i] * splitMinConfObj[i].length;
            if (randomValue < currentTotal) {
                typeOfTraining = "split";
                chosenItem = randomItem(splitMinConfObj[i]);
                break;
            }
        }
    } else {
        let currentTotal = branchTotal + splitTotal;
        for (let i = 0; i < 2; i++) {
            currentTotal += pickingProbabilities.otherBranch[i] * otherBranchMinConfObj[i].length;
            if (randomValue < currentTotal) {
                typeOfTraining = "otherBranch";
                chosenItem = randomItem(otherBranchMinConfObj[i]);
                break;
            }
        }
    }

    console.log(
        "Branch",
        branchObj.unselected.length,
        branchObj.selected.length,
        branchObj.finished.length
    );
    console.log(
        "Split",
        splitObj.unselected.length,
        splitObj.selected.length,
        splitObj.finished.length
    );
    console.log(
        "OtherBranch",
        otherBranchObj.unselected.length,
        otherBranchObj.selected.length,
        otherBranchObj.finished.length
    );

    return { typeOfTraining, chosenItem };
}
