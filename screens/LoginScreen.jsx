import Container from "../components/Container";
import AuthButton from "../components/auth/AuthButton";
import SocialLogin from "../components/auth/SocialLogin";
import LineSeparator from "../components/auth/LineSeparator";
import { Image, Text, View, StyleSheet } from "react-native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import AuthTextButton from "../components/auth/AuthTextButton";
import { AlertContext } from "../components/alert/AlertContextProvider";
import FormField from "../components/FormField";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigation = useNavigation();
    const { setAlert } = useContext(AlertContext);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log("Logged in with:", user.email);
            })
            .catch((error) => {
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
                <View style={styles.underPassword}>
                    <View style={styles.rememberMe}>
                        <Checkbox
                            value={rememberMe}
                            onValueChange={setRememberMe}
                            color="#C7B8EA"
                        />
                        <AuthTextButton
                            title="Remember Me"
                            onPress={() => setRememberMe(!rememberMe)}
                            fontSize={14}
                        />
                    </View>
                    <AuthTextButton
                        title="Forgotten Password?"
                        onPress={() => navigation.navigate("ForgottenPassword")}
                        fontSize={14}
                    />
                </View>
                <AuthButton title="Login" onPress={handleLogin} />
                <LineSeparator text="OR"/>
                <SocialLogin keyword={"in"}/>
                <LineSeparator text=""/>
                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Not got an Account? </Text>
                    <AuthTextButton
                        title="Sign Up"
                        onPress={() => navigation.navigate("SignUp")}
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
    signupContainer: {
        flexDirection: "row",
        gap: 2,
    },
    signupText: {
        fontSize: 16,
        color: "#fff",
    },
    underPassword: {
        flexDirection: "row",
        marginBottom: 20,
        justifyContent: "center",
    },
    rememberMe: {
        flexDirection: "row",
        flex: 1,
        gap: 6,
    },
});

export default LoginScreen;
