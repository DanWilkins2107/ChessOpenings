import { get, ref } from "firebase/database";
import { auth, db } from "../../firebase";

export default async function getUserStudies() {
    try {
        const userStudiesRef = ref(db, "users/" + auth.currentUser.uid + "/studies");
        const snapshot = await get(userStudiesRef);
        return snapshot.val() || [];
    } catch (error) {
        throw new Error(error);
    }
}
