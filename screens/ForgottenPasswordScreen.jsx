import Container from "../components/Container";
import AuthButton from "../components/auth/AuthButton";
import AuthTextButton from "../components/auth/AuthTextButton";
import { Image, Text, View, StyleSheet } from "react-native";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FormField from "../components/FormField";

const ForgottenPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const navigation = useNavigation();

    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("Password reset email sent");
            })
            .catch((error) => {
                console.error("Error sending password reset email:", error);
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
                <AuthButton
                    title="Reset Password"
                    onPress={handleResetPassword}
                    style={styles.resetPasswordButton}
                />
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Remembered your password? </Text>
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
        marginBottom: 20,
    },
    forgottenPasswordTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#fff",
        textAlign: "center",
    },
    resetPasswordButton: {
        width: "100%",
    },
    loginContainer: {
        borderTopWidth: 1,
        borderTopColor: "#00d4ff",
        marginTop: 20,
        paddingTop: 20,
        flexDirection: "row",
    },
    loginText: {
        fontSize: 16,
        color: "#fff",
    },
});

export default ForgottenPasswordScreen;
