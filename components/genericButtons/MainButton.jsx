import { Colors } from "../../styling";
import { StyleSheet } from "react-native";
import Subheading2 from "../text/Subheading2";
import OpacityPressable from "../genericButtons/OpacityPressable";

export default function MainButton({ text, style, onPress, disabled }) {
    return (
        <OpacityPressable
            style={[styles.button, style, disabled && styles.disabled]}
            onPress={disabled ? () => {} : onPress}
        >
            <Subheading2 style={styles.text}>{text}</Subheading2>
        </OpacityPressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primaryButton,
        height: 55,
        borderRadius: 40,
        justifyContent: "center",
        paddingRight: 10,
        paddingLeft: 20,
        alignItems: "center",
    },
    text: {
        color: "white",
    },
    disabled: {
        backgroundColor: Colors.buttonDeselected,
    },
});
