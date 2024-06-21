import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../../colors";

const AuthButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: "75%",
        borderColor: Colors.primaryBorder,
        borderWidth: 2,
    },
    buttonText: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
    },
});

export default AuthButton;
