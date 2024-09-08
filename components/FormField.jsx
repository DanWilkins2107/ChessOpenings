import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { Colors } from "../styling";

const FormField = ({ placeholder, value, onChangeText, style, ...props }) => {
    return (
        <TextInput
            style={[styles.input, style]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: Colors.background,
        borderRadius: 5,
        width: "100%",
        color: Colors.text,
        shadowColor: "#000000",
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
    },
});

export default FormField;
