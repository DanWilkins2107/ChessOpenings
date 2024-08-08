import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FormField from "../FormField";
import AuthButton from "../auth/AuthButton";
import { ModalContext } from "../modal/ModalContextProvider";

const AddChapterModal = ({ addChapterFunction }) => {
    const [chapterName, setChapterName] = useState("");
    const [pieceColor, setPieceColor] = useState("white");
    const { setModal } = useContext(ModalContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add a Chapter</Text>
            <Text style={styles.subtitle}>Chapter name</Text>
            <FormField
                value={chapterName}
                placeholder={"Chapter Name"}
                onChangeText={setChapterName}
            />
            

            <AuthButton
                title="Add Chapter"
                onPress={() => {
                    addChapterFunction(chapterName, pieceColor);
                    setModal(null);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 10,
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
    
    
});

export default AddChapterModal;
