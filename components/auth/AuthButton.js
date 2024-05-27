import { TouchableOpacity, Text, StyleSheet } from "react-native";

const AuthButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1EA896",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "75%",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default AuthButton;