import Container from "../components/Container";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import SocialLogin from "../components/auth/SocialLogin";
import OrSeparator from "../components/auth/OrSeparator";
import AuthTextButton from "../components/auth/AuthTextButton";
import { Image, Text, View, StyleSheet } from "react-native";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Signed up with:", user.email);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  };

  return (
    <Container>
      <View style={styles.container}>
        <Image source={require("../assets/favicon.png")} style={styles.logo} />
        <AuthInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <AuthInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <AuthInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
        />
        <AuthButton title="Sign Up" onPress={handleSignUp} style={styles.signupButton} />
        <OrSeparator />
        <SocialLogin />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <AuthTextButton title="Login" onPress={() => navigation.navigate("Login")} fontSize={16} />
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

export default SignUpScreen;