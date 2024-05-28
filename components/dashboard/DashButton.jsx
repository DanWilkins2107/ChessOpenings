import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const DashButton = ({ image, title, description, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <LinearGradient
        colors={['#000', '#5c0000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.buttonContent}>
          <Image source={image} style={styles.buttonImage} />
          <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonText}>{title}</Text>
            <Text style={styles.buttonDescription}>{description}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 150,
    marginBottom: 20,
  },
  gradient: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonImage: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  buttonDescription: {
    fontSize: 16,
    color: "#fff",
    flexWrap: "wrap",
  },
});

export default DashButton;