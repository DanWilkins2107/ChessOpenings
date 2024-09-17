import { randomUUID } from "expo-crypto";
import convertPGNToFormat from "../tree/convertPGNToFormat";
import { ref, set } from "firebase/database";
import { db } from "../../firebase";

export default async function addChapterToStudy(
    studyUUID,
    studyObj,
    chapterName,
    chapterPGN,
    setStudyData
) {
    const updatedStudyObj = { ...studyObj };
    const pgnUUID = randomUUID();

    if (chapterPGN) {
        let pgnArray;
        try {
            pgnArray = convertPGNToFormat(chapterPGN)?.moves;
        } catch {
            throw new Error("Invalid PGN");
        }

        const pgnRef = ref(db, "pgns/" + pgnUUID);

        try {
            set(pgnRef, pgnArray);
        } catch {
            throw new Error("Error adding PGN to database");
        }
    }

    updatedStudyObj.chapters.push({
        name: chapterName,
        pgn: pgnUUID,
    });

    const studyRef = ref(db, "studies/" + studyUUID);
    try {
        set(studyRef, updatedStudyObj);
        setStudyData(updatedStudyObj);
    } catch (error) {
        console.log(error.message);
    }
}
