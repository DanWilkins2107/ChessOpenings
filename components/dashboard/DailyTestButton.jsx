import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const DailyTestButton = ({ testNumber, inProgress, navigation }) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("DailyTestDash")}
        >
            <View style={styles.iconContainer}>
                <Icon name="pencil" size={35} color="#333" />
            </View>
            <Text style={styles.buttonText}>Daily Test</Text>
            <Text style={styles.buttonDescription}>Test your opening knowledge.</Text>
            <Text style={styles.scoreText}>{testNumber}/10 Lines Completed</Text>
            <View style={styles.rectangleHolder}>
                {[...Array(testNumber).keys()].map((index) => {
                    return <View key={index} style={styles.rectangleCompleted} />;
                })}
                {inProgress && <View style={styles.rectangleInProgress} />}
                {[...Array(10 - testNumber - (inProgress ? 1 : 0)).keys()].map((index) => {
                    return <View key={index} style={styles.rectangleIncomplete} />;
                })}
            </View>
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
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 24,
        color: "#333",
        fontWeight: "bold",
        marginBottom: 5,
    },
    buttonDescription: {
        color: "#333",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 16,
    },
    iconContainer: {
        alignItems: "center",
        marginBottom: 10,
    },
    rectangleHolder: {
        width: "90%",
        height: 10,
        backgroundColor: "black",
        display: "flex",
        flexDirection: "row",
        borderWidth: 1,
    },
    scoreText: {
        color: "#333",
        fontWeight: "bold",
        marginBottom: 6,
    },
    rectangleCompleted: {
        width: "10%",
        height: 8,
        backgroundColor: "green",
        borderWidth: 2,
    },
    rectangleInProgress: {
        width: "10%",
        height: 8,
        backgroundColor: "orange",
        borderWidth: 2,
    },
    rectangleIncomplete: {
        width: "10%",
        height: 8,
        backgroundColor: "grey",
        borderWidth: 2,
    },
});

export default DailyTestButton;
