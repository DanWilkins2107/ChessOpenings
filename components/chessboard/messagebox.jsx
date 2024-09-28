import { StyleSheet } from "react-native";
import { Fonts } from "../../styling";
import { View, Text } from "react-native";

const MessageBox = ({ tempObj, permObj, style }) => {
    const backgroundColor = tempObj.message ? tempObj.backgroundColor : permObj.backgroundColor;
    const message = tempObj.message || permObj.message;
    const textColor = tempObj.message ? tempObj.textColor : permObj.textColor;
    return (
        <View style={[styles.container, style, { backgroundColor: backgroundColor }]}>
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
