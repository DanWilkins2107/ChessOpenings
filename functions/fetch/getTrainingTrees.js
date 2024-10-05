import pgnToTree from "../tree/pgnToTree";
import getPGNfromPGNUUID from "./getPGNfromPGNUUID";

export default async function getTrainingTrees(studyStringArray) {
    const treeArray = [];
    await Promise.all(
        studyStringArray.map(async (pgnString) => {
            const [pgnUUID, color, title, chapterName, studyUUID] = pgnString.split("___");
            const pgnData = await getPGNfromPGNUUID(pgnUUID);

            if (!pgnData) {
                return;
            }
            const tree = {
                title: title,
                chapterName: chapterName,
                pgnUUID: pgnUUID,
                tree: pgnToTree(pgnData),
                color: color,
                studyUUID: studyUUID,
            };
            treeArray.push(tree);
        })
    );
    return treeArray;
}
