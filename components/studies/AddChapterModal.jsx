import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Touchable } from "react-native";
import FormField from "../FormField";
import AuthButton from "../auth/AuthButton";

const AddChapterModal = ({ onSubmitFunction }) => {
    const [chapterName, setChapterName] = useState("");
    const [pieceColor, setPieceColor] = useState("white");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add a Chapter</Text>
            <Text style={styles.subtitle}>Chapter name</Text>
            <FormField
                value={chapterName}
                placeholder={"Chapter Name"}
                onChangeText={setChapterName} // Ensure this is handled for text input updates
            />

            <Text style={styles.subtitle}>Piece color</Text>
            <View style={styles.colorToggleContainer}>
                <TouchableOpacity style={[styles.colorToggle, pieceColor === "white" && styles.selected]}>
                    <View style={styles.whiteInner}>
                        <Text>White</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.colorToggle, pieceColor === "black" && styles.selected]}>
                    <View style={styles.blackInner}>
                        <Text style={styles.blackText}>Black</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <AuthButton
                title="Add Chapter"
                onPress={() => onSubmitFunction(chapterName, pieceColor)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 20, // Added padding for better layout
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 10,
    },
    colorToggleContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    colorToggle: {
        marginHorizontal: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderColor: "white",
    },
    whiteInner: {
        backgroundColor: "white",
        borderWidth: 2,
        margin: 2,
        padding: 10,
    },
    blackInner: {
        backgroundColor: "black",
        borderWidth: 2,
        margin: 2,
        padding: 10,
    },
    blackText: {
        color: "white",
    },
    selected: {
        borderColor: "black",
    }
});

export default AddChapterModal;
