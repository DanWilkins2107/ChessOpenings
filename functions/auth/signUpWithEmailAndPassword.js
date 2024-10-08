import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

export default async function signUpWithEmailAndPassword(firstName, email, password, setAlert) {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user.user, { displayName: firstName });
        setAlert("Signed up successfully", "green");
    } catch (error) {
        if (error.code === "auth/invalid-email") {
            setAlert("Please enter a valid email.", "red");
        } else if (error.code === "auth/weak-password" || error.code === "auth/missing-password") {
            setAlert("Passwords must be six letters.", "red");
        } else if (error.code === "auth/email-already-in-use") {
            setAlert("Email already in use", "red");
        } else {
            console.error(error);
            setAlert("Could not sign you up at this time", "red");
        }
    }
}
