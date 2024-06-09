import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const SocialLogin = ({keyword}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, {backgroundColor: "black"}]}>
        <Text style={[{color: "white"}, styles.text]}>{`Sign ${keyword} with Apple`}</Text>
        <Icon name="apple" size={25} color="white" />
      </TouchableOpacity>
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
    justifyContent: "space-around",
    gap: "10%",
    height: "10%",
  },
  button: {
    width: "40%",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10%",
    gap: "5%",
  }, 
  text: {
    fontSize: 12,
    fontWeight: "bold",
  }

});

export default SocialLogin;