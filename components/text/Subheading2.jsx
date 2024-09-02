import { Colors, Fonts } from "../../styling";
import { StyleSheet, Text } from "react-native";

export default function Subheading2({ children, style, ...props }) {
    return (
        <Text style={[styles.title, style]} {...props}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: Colors.text,
        fontFamily: Fonts.main,
    },
});
