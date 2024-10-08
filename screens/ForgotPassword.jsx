import { Image, Keyboard, Pressable, StyleSheet } from "react-native";
import Container from "../components/Container";
import Card from "../components/containers/Card";
import Subheading2 from "../components/text/Subheading2";
import FormField from "../components/FormField";
import MainButton from "../components/genericButtons/MainButton";
import { View } from "react-native";
import AuthTextButton from "../components/auth/AuthTextButton";

export default function ForgotPassword({ navigation }) {
    const handleSignUp = () => {
        navigation.navigate("SignUp");
    };

    const handleLogin = () => {
        navigation.navigate("Login");
    };

    const handleForgotPassword = () => {};

    return (
        <Container theme="light" style={styles.container}>
            <Pressable
                style={styles.pressable}
                onPress={() => Keyboard.dismiss()}
                behavior={Platform.OS === "ios" ? "height" : "padding"}
            >
                <Image source={require("../assets/logo.png")} style={styles.image} />
                <Card style={styles.card}>
                    <Subheading2 style={styles.header}>Email</Subheading2>
                    <FormField style={styles.form} />
                    <MainButton text="Reset Password" style={styles.button} />
                </Card>
                <View style={styles.row}>
                    <Subheading2>Don't have an account?</Subheading2>
                    <AuthTextButton text="Sign Up" onPress={handleSignUp} />
                </View>
                <View style={styles.row}>
                    <Subheading2>Remembered your password?</Subheading2>
                    <AuthTextButton text="Login" onPress={handleLogin} />
                </View>
            </Pressable>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
    },
    pressable: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: "center",
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginTop: 50,
    },
    card: {
        marginTop: 20,
    },
    header: {
        marginTop: 10,
    },
    form: {
        marginVertical: 5,
    },
    button: {
        marginVertical: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
});
