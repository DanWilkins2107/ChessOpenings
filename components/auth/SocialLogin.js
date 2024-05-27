import { View, StyleSheet } from "react-native";
import AuthButton from "./AuthButton";
import { AlertContext } from "../alert/AlertContextProvider";
import { useContext } from "react";

const SocialLogin = () => {
  const { setAlert } = useContext(AlertContext);
  return (
    <View style={styles.container}>
      <AuthButton title="Apple Login" onPress={() => setAlert("red", "red")} />
      <AuthButton title="Google Login" onPress={() => setAlert("green", "green")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default SocialLogin;