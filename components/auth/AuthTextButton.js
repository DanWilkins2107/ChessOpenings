import { TouchableOpacity, Text, StyleSheet } from "react-native";

const AuthTextButton = ({ title, onPress, fontSize }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.text, { fontSize: fontSize }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#C7B8EA",
  },
});

export default AuthTextButton;