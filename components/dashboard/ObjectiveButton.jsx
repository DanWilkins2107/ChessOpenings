import { Colors } from "../../styling";
import { StyleSheet, View } from "react-native";
import Subheading2 from "../text/Subheading2";
import OpacityPressable from "../genericButtons/OpacityPressable";

export default function ObjectiveButton({ text, completed, active, style, onPress }) {
    return (
        <OpacityPressable
            style={[
                styles.button,
                style,
                !completed && styles.notComplete,
                active && styles.active,
            ]}
            onPress={onPress}
        >
            <Subheading2 style={!completed && styles.text}>{text}</Subheading2>
            <View style={styles.circle}></View>
        </OpacityPressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.card2,
        height: 55,
        borderRadius: 40,
        justifyContent: "space-between",
        paddingRight: 10,
        paddingLeft: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        color: "white",
    },
    active: {
        backgroundColor: Colors.primaryButton,
    },
    notComplete: {
        backgroundColor: Colors.buttonDeselected,
    },
    circle: {
        width: 35,
        height: 35,
        borderRadius: 40,
        backgroundColor: Colors.card1,
    },
});
