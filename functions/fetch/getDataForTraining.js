import ChapterAndStudyToString from "../test/chapterAndStudyToString";
import findBranchCategory from "../test/findInitialCategory";
import getBranchEnds from "../test/getBranchEnds";
import getBranchSplits from "../test/getBranchSplits";
import scanBranchForMistakes from "../test/scanBranchForMistakes";
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
    const selectedBranchArray = [];
    const finishedBranchArray = [];
    const unselectedBranchArray = [];
    const splitArray = [];
    const mistakeNodeArray = [];
    const treeArray = [];

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

            ends.forEach((end) => {
                const category = findBranchCategory(end, color, "unselected");
                const endObj = {
                    endNode: end.endNode,
                    color: color,
                    title: title,
                    chapterName: chapterName,
                    moveNumber: end.lastMoveNumber,
                };

                if (category === "selected") {
                    selectedBranchArray.push(endObj);
                    const mistakeArray = scanBranchForMistakes(
                        end.endNode,
                        color,
                        end.confidence,
                        end.lastMoveNumber
                    );
                    mistakeArray.forEach((mistakeNode) => {
                        mistakeNodeArray.push({
                            node: mistakeNode,
                            color: color,
                            title: title,
                            chapterName: chapterName,
                        });
                    });
                } else if (category === "unselected") {
                    unselectedBranchArray.push(endObj);
                } else {
                    finishedBranchArray.push(endObj);
                }
            });

            const splits = getBranchSplits(tree, color);
            splits.forEach((split) => {
                splitArray.push({
                    splitNode: split.node,
                    color: color,
                    title: title,
                    chapterName: chapterName,
                });
            });
        })
    );

    return {
        selectedBranchArray,
        finishedBranchArray,
        unselectedBranchArray,
        splitArray,
        mistakeNodeArray,
        treeArray,
    };
}
