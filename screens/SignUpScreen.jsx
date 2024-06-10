import Container from "../components/Container";
import AuthButton from "../components/auth/AuthButton";
import SocialLogin from "../components/auth/SocialLogin";
import LineSeparator from "../components/auth/LineSeparator";
import AuthTextButton from "../components/auth/AuthTextButton";
import { Image, Text, View, StyleSheet } from "react-native";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import FormField from "../components/FormField";
import { AlertContext } from "../components/alert/AlertContextProvider";

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { setAlert } = useContext(AlertContext);

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            setAlert("Passwords do not match.", "red");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log("Signed up with:", user.email);
            })
            .catch((error) => {
                if (error.code === "auth/invalid-email") {
                    setAlert("Please enter a valid email.", "red");
                } else if (
                    error.code === "auth/weak-password" ||
                    error.code === "auth/missing-password"
                ) {
                    setAlert("Passwords must be six letters.", "red");
                } else if (error.code === "auth/email-already-in-use") {
                    setAlert("Email already in use", "red");
                } else setAlert("Could not sign you up at this time", "red");
            });
    };

    return (
        <Container>
            <View style={styles.container}>
                <Image source={require("../assets/favicon.png")} style={styles.logo} />
                <FormField
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <FormField
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
                <FormField
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    secureTextEntry={true}
                />
                <AuthButton title="Sign Up" onPress={handleSignUp} style={styles.signupButton} />
                <LineSeparator text="OR" />
                <SocialLogin keyword="up" />
                <LineSeparator text="" />
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account? </Text>
                    <AuthTextButton
                        title="Login"
                        onPress={() => navigation.navigate("Login")}
                        fontSize={16}
                    />
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 80,
    },
    signupTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#fff",
        textAlign: "center",
    },
    signupButton: {
        width: "100%",
    },
    loginContainer: {
        flexDirection: "row",
        gap: 2,
    },
    loginText: {
        fontSize: 16,
        color: "#fff",
    },
});

export default SignUpScreen;
