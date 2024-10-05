import calculateOverallConfidence from "./calculateOverallConfidence";

export default function createConfidenceObj(trees) {
    const confidenceObj = {};

    const objArray = [];

    trees.forEach((tree) => {
        const obj = calculateOverallConfidence(tree.tree, tree.color);

        if (!confidenceObj[tree.studyUUID]) {
            confidenceObj[tree.studyUUID] = {
                title: tree.title,
                chapters: [],
            };
        }
        confidenceObj[tree.studyUUID].chapters.push({
            UUID: tree.pgnUUID,
            title: tree.chapterName,
            score: obj.score,
        });

        objArray.push(obj);
    });

    // Calculate the overall confidence
    let total = 0;
    for (const obj of objArray) {
        total += obj.total;
    }

    console.log("Total: ", total);
    let score = 0;
    for (const obj of objArray) {
        score += (obj.score * obj.total) / total;
    }

    console.log("Score: ", score);

    const returnValue = {
        score: score,
        obj: confidenceObj,
    };

    return {
        score,
        confidenceObj,
    };
}
