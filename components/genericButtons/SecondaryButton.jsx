import { Colors } from "../../styling";
import { StyleSheet } from "react-native";
import Subheading2 from "../text/Subheading2";
import IconFA6 from "react-native-vector-icons/FontAwesome6";
import OpacityPressable from "../OpacityPressable";

export default function SecondaryButton({ text, icon, style, onPress }) {
    return (
        <OpacityPressable style={[styles.button, style]} onPress={onPress}>
            {icon && <IconFA6 name={icon} size={25} color={Colors.text} />}
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
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        shadowOpacity: 0.2,
    },
    text: {
        paddingHorizontal: 10,
    },
});
