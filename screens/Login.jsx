import { useContext, useState } from "react";
import { AlertContext } from "../components/alert/AlertContextProvider";
import { Image, StyleSheet, Pressable, View, Keyboard } from "react-native";
import Container from "../components/containers/Container";
import Card from "../components/containers/Card";
import MainButton from "../components/genericButtons/MainButton";
import FormField from "../components/inputs/FormField";
import Subheading2 from "../components/text/Subheading2";
import AuthTextButton from "../components/auth/AuthTextButton";
import PasswordField from "../components/inputs/PasswordField";
import loginWithEmailAndPassword from "../functions/auth/loginWithEmailAndPassword";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setAlert } = useContext(AlertContext);

    const handleLogin = () => {
        if (!email) {
            setAlert("Please enter your email", "red");
            return;
        }

        if (!password) {
            setAlert("Please enter your password", "red");
            return;
        }

        loginWithEmailAndPassword(email, password, setAlert);
    };

    const handleSignUp = () => {
        navigation.navigate("SignUp");
    };

    const handleForgotPassword = () => {
        navigation.navigate("ForgotPassword");
    };

    return (
        <Container theme="light" style={styles.container}>
            <Pressable style={styles.pressable} onPress={() => Keyboard.dismiss()}>
                <Image source={require("../assets/logo.png")} style={styles.image} />
                <Card style={styles.card}>
                    <Subheading2 style={styles.header}>Email</Subheading2>
                    <FormField
                        style={styles.form}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Enter email"
                    />
                    <Subheading2 style={styles.header}>Password</Subheading2>
                    <PasswordField
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Enter password"
                        style={styles.form}
                    />
                    <MainButton text="Login" style={styles.button} onPress={handleLogin} />
                </Card>
                <View style={styles.row}>
                    <Subheading2>Don't have an account?</Subheading2>
                    <AuthTextButton text="Sign Up" onPress={handleSignUp} />
                </View>
                <View style={styles.row}>
                    <Subheading2>Forgot your password?</Subheading2>
                    <AuthTextButton text="Reset" onPress={handleForgotPassword} />
                </View>
            </Pressable>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    pressable: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
        flex: 1,
    },
    card: {
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
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
});
