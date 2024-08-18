import { get, ref } from "firebase/database";
import { db } from "../../firebase";

export default async function getPGNfromPGNUUID(pgnUUID) {
    try {
        const pgnRef = ref(db, `pgns/${pgnUUID}`);
        const pgnSnapshot = await get(pgnRef);
        const pgn = pgnSnapshot.val() || null;
        return pgn;
    } catch (error) {
        throw new Error(error);
    }
}
