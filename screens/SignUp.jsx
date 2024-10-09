import { useContext, useState } from "react";
import { AlertContext } from "../components/alert/AlertContextProvider";
import {
    Image,
    Pressable,
    StyleSheet,
    View,
} from "react-native";
import Container from "../components/containers/Container";
import Card from "../components/containers/Card";
import MainButton from "../components/genericButtons/MainButton";
import FormField from "../components/inputs/FormField";
import Subheading2 from "../components/text/Subheading2";
import AuthTextButton from "../components/auth/AuthTextButton";
import { Keyboard } from "react-native";
import PasswordField from "../components/inputs/PasswordField";
import signUpWithEmailAndPassword from "../functions/auth/signUpWithEmailAndPassword";

export default function SignUp({ navigation }) {
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { setAlert } = useContext(AlertContext);

    const handleSignUp = () => {
        if (!firstName) {
            setAlert("Please enter your first name", "red");
            return;
        }

        if (!email) {
            setAlert("Please enter your email", "red");
            return;
        }

        if (!password) {
            setAlert("Please enter your password", "red");
            return;
        }

        if (!confirmPassword) {
            setAlert("Please confirm your password", "red");
            return;
        }

        if (password !== confirmPassword) {
            setAlert("Passwords do not match", "red");
            return;
        }

        signUpWithEmailAndPassword(firstName, email, password, setAlert);
    };

    const handleLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <Container theme="light" style={styles.container}>
            <Pressable
                onPress={() => {
                    Keyboard.dismiss();
                }}
                style={styles.pressable}
            >
                <Image source={require("../assets/logo.png")} style={styles.image} />
                <Card style={styles.card}>
                    <Subheading2 style={styles.header}>First Name</Subheading2>
                    <FormField
                        style={styles.form}
                        value={firstName}
                        onChangeText={setFirstName}
                        placeholder="Enter name"
                    />
                    <Subheading2 style={styles.header}>Email</Subheading2>
                    <FormField
                        style={styles.form}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter email"
                    />
                    <Subheading2 style={styles.header}>Password</Subheading2>
                    <PasswordField
                        style={styles.form}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter password"
                    />
                    <Subheading2 style={styles.header}>Confirm Password</Subheading2>
                    <PasswordField
                        style={styles.form}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirm password"
                    />
                    <MainButton text="Sign Up" style={styles.button} onPress={handleSignUp} />
                </Card>
                <View style={styles.row}>
                    <Subheading2>Already have an account?</Subheading2>
                    <AuthTextButton text="Login" onPress={handleLogin} style={styles.login} />
                </View>
            </Pressable>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
    },
    keyboardView: {
        display: "flex",
        flex: 1,
    },
    card: {
        width: "100%",
        marginBottom: 20,
    },
    title: {
        width: "100%",
        marginBottom: 20,
    },
    header: {
        marginBottom: 5,
    },
    form: {
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    pressable: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
    },
    row: {
        flexDirection: "row",
    },
});
