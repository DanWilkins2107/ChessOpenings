import { Colors } from "../../styling";
import { StyleSheet, View } from "react-native";
import Subheading2 from "../text/Subheading2";
import Icon from "react-native-vector-icons/FontAwesome";
import OpacityPressable from "../OpacityPressable";

export default function SocialsButton({ text, icon, style }) {
    return (
        <OpacityPressable style={[styles.button, style]}>
            <Icon name={icon} size={25} color={Colors.text} />
            <Subheading2 style={styles.text}>{text}</Subheading2>
        </OpacityPressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.card2,
        height: 40,
        alignItems: "center",
        paddingLeft: 10,
        flexDirection: "row",
        shadowColor: "rgba(0,0,0,0.20)",
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 5,
        shadowOpacity: 1,
    },
    text: {
        paddingLeft: 10,
    }
});
