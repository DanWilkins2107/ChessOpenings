import { ref, set } from "firebase/database";
import { db } from "../../firebase";
import treeToPgn from "../tree/treeToPgn";
export default async function saveTreesToDb(tree, chapterPGN) {
    const pgnRef = ref(db, "pgns/" + chapterPGN);
    const pgnData = treeToPgn(tree);

    try {
        await set(pgnRef, pgnData);
    } catch (error) {
        console.log("Error updating document: ", error);
    }
}
