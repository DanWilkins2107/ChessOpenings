import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../styling";
const Checkbox = ({ checked, onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.checkbox,
                { backgroundColor: checked ? Colors.primaryButton : "transparent" },
            ]}
            onPress={onPress}
        >
            {checked && <Icon name="check" size={25} color={Colors.background} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        padding: 3,
        borderRadius: 5,
        borderColor: Colors.background,
        borderWidth: 1,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        margin: 2,
    },
});

export default Checkbox;
