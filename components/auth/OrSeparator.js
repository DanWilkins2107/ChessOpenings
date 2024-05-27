import { View, Text, StyleSheet } from "react-native";

const OrSeparator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>OR</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#C7B8EA",
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#C7B8EA",
  },
});

export default OrSeparator;