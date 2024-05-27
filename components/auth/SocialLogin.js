import { View, Text, StyleSheet } from "react-native";
import AuthButton from "./AuthButton";

const SocialLogin = () => {
  return (
    <View style={styles.container}>
      <AuthButton title="Apple Login" onPress={() => console.log("Apple login pressed")} />
      <AuthButton title="Google Login" onPress={() => console.log("Google login pressed")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default SocialLogin;