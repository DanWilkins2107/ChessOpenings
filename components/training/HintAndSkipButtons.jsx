import { Text, View, StyleSheet } from "react-native";
import OpacityPressable from "../genericButtons/OpacityPressable";
import { Colors, Fonts } from "../../styling";
import IconFA5 from "react-native-vector-icons/FontAwesome5";

const HintAndSkipButtons = ({ hintFunction, skipFunction, style }) => {
    return (
        <View style={[styles.hintAndSkipContainer, style]}>
            <OpacityPressable style={styles.button} onPress={hintFunction}>
                <IconFA5 name="lightbulb" size={22} color={Colors.text} />
                <Text style={styles.buttonText}>Hint</Text>
            </OpacityPressable>
            <OpacityPressable style={styles.button} onPress={skipFunction}>
                <IconFA5 name="forward" size={20} color={Colors.text} />
                <Text style={styles.buttonText}>Skip</Text>
            </OpacityPressable>
        </View>
    );
};

const styles = StyleSheet.create({
    hintAndSkipContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        height: 40,
    },
    button: {
        flex: 1,
        backgroundColor: Colors.card2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginHorizontal: 5,
        flexDirection: "row",
    },
    buttonText: {
        color: Colors.text,
        fontFamily: Fonts.main,
        fontSize: 22,
        marginLeft: 10,
    },
});

export default HintAndSkipButtons;
