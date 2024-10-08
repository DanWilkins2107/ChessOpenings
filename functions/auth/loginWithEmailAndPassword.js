import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default async function loginWithEmailAndPassword(email, password, setAlert) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        setAlert("Logged in successfully", "green");
    } catch (error) {
        if (
            error.code === "auth/user-not-found" ||
            error.code === "auth/invalid-email" ||
            error.code === "auth/invalid-credential"
        ) {
            setAlert("Incorrect account details.", "red");
        } else {
            setAlert("Could not log you in at this time", "red");
            console.log(error.code);
        }
    }
}
