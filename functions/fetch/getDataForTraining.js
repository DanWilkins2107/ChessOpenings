import ChapterAndStudyToString from "../test/chapterAndStudyToString";
import findBranchCategory from "../test/findInitialCategory";
import getBranchEnds from "../test/getBranchEnds";
import getBranchSplits from "../test/getBranchSplits";
import makeCombinedTree from "../test/makeCombinedTree";
import pgnToTree from "../tree/pgnToTree";
import getPGNfromPGNUUID from "./getPGNfromPGNUUID";
import getStudyDataFromStudyUUID from "./getStudyDataFromStudyUUID";
import getUserStudies from "./getUserStudies";

export default async function getDataForTraining(chosenPGNs) {
    const pgnList = chosenPGNs || [];

    if (!chosenPGNs) {
        const userStudies = await getUserStudies();
        const studyUUIDs = Object.keys(userStudies);

        await Promise.all(
            studyUUIDs.map(async (studyUUID) => {
                const studyData = await getStudyDataFromStudyUUID(studyUUID);
                const chapters = studyData.chapters;

                chapters.forEach((chapter) => {
                    const chapterString = ChapterAndStudyToString(chapter, studyData);
                    pgnList.push(chapterString);
                });
            })
        );
    }

    // Deal with pgnList

    const treeArray = [];

    const branchEnds = [];
    const selectedBranchArray = [];
    const finishedBranchArray = [];
    const unselectedBranchArray = [];

    const whiteBranchEnds = [];
    const blackBranchEnds = [];

    await Promise.all(
        pgnList.map(async (pgnString) => {
            const [pgnUUID, color, title, chapterName] = pgnString.split("___");
            const pgnData = await getPGNfromPGNUUID(pgnUUID);
            if (!pgnData) {
                return;
            }
            const tree = {
                chapterName: chapterName,
                pgnUUID: pgnUUID,
                tree: pgnToTree(pgnData),
                color: color,
            };
            treeArray.push(tree);
            const ends = getBranchEnds(tree.tree, color);
            if (color === "white") {
                whiteBranchEnds.push(...ends);
            } else {
                blackBranchEnds.push(...ends);
            }
            branchEnds.push(...ends);

            ends.forEach((end) => {
                const category = findBranchCategory(end, color, "unselected", 5);
                const endObj = {
                    endNode: end.endNode,
                    color: color,
                    title: title,
                    chapterName: chapterName,
                    moveNumber: end.lastMoveNumber,
                };

                if (category === "selected") {
                    selectedBranchArray.push(endObj);
                } else if (category === "unselected") {
                    unselectedBranchArray.push(endObj);
                } else {
                    finishedBranchArray.push(endObj);
                }
            });
        })
    );

    // Get Combined Trees
    const whiteCombinedTree = makeCombinedTree({
        branchArray: whiteBranchEnds,
        color: "white",
    });
    const whiteSplits = getBranchSplits(whiteCombinedTree);

    const blackCombinedTree = makeCombinedTree({
        branchArray: blackBranchEnds,
        color: "black",
    });
    const blackSplits = getBranchSplits(blackCombinedTree);

    return {
        selectedBranchArray,
        finishedBranchArray,
        unselectedBranchArray,
        whiteSplits,
        blackSplits,
        treeArray,
        whiteCombinedTree,
        blackCombinedTree,
    };
}
