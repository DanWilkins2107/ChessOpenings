import { View, StyleSheet, Text } from "react-native";
import { Colors, Fonts } from "../../styling";
import Card from "../containers/Card";
import OpacityPressable from "../OpacityPressable.jsx";

export default function ProgressBar({ progress, style }) {
    return (
        <Card style={[styles.container, style]} padding={false}>
            <Text style={styles.text}>Progress:</Text>
            <View style={styles.barWrapper}>
                <View style={[{ width: `${progress}%` }, styles.barInner]} />
            </View>
            <OpacityPressable style={styles.button}>
                <Text style={styles.buttonText}>View</Text>
            </OpacityPressable>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    text: {
        fontFamily: Fonts.main,
        fontSize: 22,
        color: Colors.text,
    },
    barWrapper: {
        flex: 0.8,
        height: 10,
        backgroundColor: Colors.card2,
        borderRadius: 5,
        marginTop: 5,
    },
    barInner: {
        height: "100%",
        backgroundColor: Colors.text,
        borderRadius: 5,
    },
    button: {
        padding: 5,
        backgroundColor: Colors.card2,
        borderRadius: 5,
    },
    buttonText: {
        fontFamily: Fonts.main,
        fontSize: 16,
        color: Colors.text,
    },
});
