import { StyleSheet } from "react-native";
import { Fonts } from "../../styling";
import { View, Text } from "react-native";

const MessageBox = ({ message, backgroundColor, textColor, style }) => {
    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }, style]}>
            <Text style={[styles.text, { color: textColor }]}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000000",
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
    },
    text: {
        fontSize: 22,
        fontFamily: Fonts.main,
    },
});

export default MessageBox;
