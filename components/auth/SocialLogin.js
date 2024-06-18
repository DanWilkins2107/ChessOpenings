import { View, StyleSheet, Button, TouchableOpacity, Text, Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const SocialLogin = ({keyword}) => {
  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <TouchableOpacity style={[styles.button, {backgroundColor: "black"}]}>
        <Text style={[{color: "white"}, styles.text]}>{`Sign ${keyword} with Apple`}</Text>
        <Icon name="apple" size={25} color="white" />
      </TouchableOpacity>}
      <TouchableOpacity style={[styles.button, {backgroundColor: "white"}]}>
        <Text style={styles.text}>{`Sign ${keyword} with Google`}</Text>
        <Icon name="google" size={25} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "10%",
  },
  button: {
    display: "flex",
    flex: 0.4,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  }, 
  text: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
  }

});

export default SocialLogin;