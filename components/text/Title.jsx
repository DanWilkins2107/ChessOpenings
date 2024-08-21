import { Colors, Fonts } from "../../styling";
import { StyleSheet, Text } from "react-native";

export default function Title({ children, style }) {
    return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        color: Colors.text,
        fontFamily: Fonts.main,
    },
});
