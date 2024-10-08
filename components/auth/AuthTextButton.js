import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Subheading2 from "../text/Subheading2";
import { Colors } from "../../styling";

const AuthTextButton = ({ text, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Subheading2 style={styles.text}>{text}</Subheading2>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        color: Colors.primaryButton,
    },
    button: {
        marginHorizontal: 5,
    },
});

export default AuthTextButton;
