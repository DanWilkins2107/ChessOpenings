import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../../colors";

const Checkbox = ({ checked, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.checkbox, { backgroundColor: (checked ? Colors.primaryBorder : "transparent") }]}
        >
            {checked && <Icon name="check" size={25} color="#fff" />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        padding: 3,
        borderRadius: 5,
        borderColor: "white",
        borderWidth: 1,
        width: 40, 
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Checkbox;
