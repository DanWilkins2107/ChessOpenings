import { ref, set } from "firebase/database";
import { db } from "../../firebase";

export default async function deleteChapter(studyUUID, studyObj, chapterIndex, setStudyData) {
    const updatedStudyObj = { ...studyObj };

    const chapter = updatedStudyObj.chapters.splice(chapterIndex, 1);
    const chapterPGN = chapter[0].pgn;

    // Delete PGN from db
    const pgnRef = ref(db, "pgns/" + chapterPGN);
    const studyRef = ref(db, "studies/" + studyUUID);
    try {
        set(pgnRef, null);
        set(studyRef, updatedStudyObj);
        setStudyData(updatedStudyObj);
    } catch (error) {
        throw new Error(error);
    }


}
