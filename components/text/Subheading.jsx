import { Colors, Fonts } from "../../styling";
import { StyleSheet, Text } from "react-native";

export default function Subheading({ children, style }) {
    return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        color: Colors.text,
        fontFamily: Fonts.main,
    },
});
