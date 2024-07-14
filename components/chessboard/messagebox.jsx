import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../colors";

const MessageBox = ({ message, backgroundColor, textColor }) => {
    return (
        <View style={[styles.messageBox, { backgroundColor: backgroundColor }]}>
            <Text style={[styles.messageText, { color: textColor }]}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    messageBox: {
        padding: 10,
        alignItems: "center",
        borderWidth: 2,
        borderColor: Colors.primaryBorder,
        width: "90%", 

    },
    messageText: {
        fontSize: 18,
    },
});

export default MessageBox;
