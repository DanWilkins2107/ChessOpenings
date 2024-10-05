import branchMinConfScore from "./branchMinConfScore";
import otherBranchMinConfScore from "./otherBranchMinConfScore";
import randomItem from "./randomItem";
import splitMinConfScore from "./splitMinConfScore";

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

    branchObj.selected.map((branch) => {
        const confidence = branchMinConfScore(branch);
        branchMinConfObj[confidence].push(branch);
    });

    splitObj.selected.map((split) => {
        const confidence = splitMinConfScore(split);
        splitMinConfObj[confidence].push(split);
    });

    otherBranchObj.selected.map((branch) => {
        const confidence = otherBranchMinConfScore(branch);
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
    console.log("Start");
    for (let i = 0; i < 5; i++) {
        total += branchMinConfObj[i].length * branchWeightings[i];
        console.log(`branch ${i}`, branchMinConfObj[i].length);
    }
    for (let i = 0; i < 2; i++) {
        total += splitMinConfObj[i].length * splitWeightings[i];
        console.log(`split ${i}`, splitMinConfObj[i].length);

        total += otherBranchMinConfObj[i].length * otherBranchWeightings[i];
        console.log(`other ${i}`, splitMinConfObj[i].length);
    }

    if (total < minMoveValue) {
        if (branchObj.unselected.length > 0) {
            const randomBranch = randomItem(branchObj.unselected);
            branchObj.unselected = branchObj.unselected.filter((branch) => branch !== randomBranch);
            branchObj.selected.push(randomBranch);
            branchMinConfObj[0].push(randomBranch);
        }
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

    return { typeOfTraining, chosenItem };
}
