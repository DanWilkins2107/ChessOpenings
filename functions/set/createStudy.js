import { randomUUID } from "expo-crypto";
import { ref, set } from "firebase/database";
import { auth, db } from "../../firebase";
import convertPGNToFormat from "../tree/convertPGNToFormat";

export default async function createStudy(title, icon, side, pgn, isLichess) {
    const studyUUID = randomUUID();

    let numberOfChapters = 1;
    const formattedPGNs = [];

    if (pgn) {
        const pgns = pgn.split("\n\n\n");

        if (pgns.length > 1) {
            numberOfChapters = pgns.length - 1; // There is always an empty string at the end
        }

        for (let i = 0; i < numberOfChapters; i++) {
            try {
                const formattedPGN = convertPGNToFormat(pgns[i]);
                formattedPGNs.push(formattedPGN);
            } catch (error) {
                throw new Error("Error converting PGN to format");
            }
        }
    }

    const chapterNames = Array.from({ length: numberOfChapters }, (_, i) => `Chapter ${i + 1}`);

    for (let i = 0; i < formattedPGNs.length; i++) {
        const eventName = formattedPGNs[i].event;

        if (isLichess) {
            const chapterName = formattedPGNs[i].event.split(": ")[1];
            chapterNames[i] = chapterName;
        } else {
            chapterNames[i] = eventName;
        }
    }

    const chapterArray = [];

    for (let i = 0; i < numberOfChapters; i++) {
        chapterArray.push({
            name: chapterNames[i],
            pgn: randomUUID(),
        });
    }

    const studyObj = {
        title: title,
        icon: icon,
        color: side,
        chapters: chapterArray,
    };

    const studyRef = ref(db, `studies/${studyUUID}`);
    const userStudyRef = ref(db, `users/${auth.currentUser.uid}/studies/${studyUUID}`);

    try {
        await Promise.all([
            set(studyRef, studyObj),
            set(userStudyRef, Date.now()),
            chapterArray.map(async (chapter, index) => {
                if (formattedPGNs[index]) {
                    const pgnRef = ref(db, `pgns/${chapter.pgn}`);
                    await set(pgnRef, formattedPGNs[index].moves);
                }
            }),
        ]);
    } catch (error) {
        throw new Error(error);
    }

    return studyUUID;
}
