import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DailyTestButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("DailyTestDash")}>
            <Text style={styles.buttonText}>Daily Test</Text>
            <Text style={styles.buttonDescription}>Take a daily test to improve your skills.</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#C7B8EA",
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        borderColor: "#C7B8EA",
        borderWidth: 2,
        height: 150,
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 18,
        color: "#333",
        fontWeight: "bold",
    },
    buttonDescription: {
        fontSize: 14,
        color: "#666",
    },
});

export default DailyTestButton;