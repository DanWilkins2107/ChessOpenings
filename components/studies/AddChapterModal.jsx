import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FormField from "../FormField";
import AuthButton from "../auth/AuthButton";
import { ModalContext } from "../modal/ModalContextProvider";
import Title from "../text/Title";
import Subheading from "../text/Subheading";
import Body from "../text/Body";
import MainButton from "../genericButtons/MainButton";
import Card from "../containers/Card";

const AddChapterModal = ({ addChapterFunction }) => {
    const [chapterName, setChapterName] = useState("");
    const [pieceColor, setPieceColor] = useState("white");
    const [pgn, setPgn] = useState("");
    const { setModal } = useContext(ModalContext);

    return (
        <View>
            <Subheading style={styles.title}>Add a Chapter</Subheading>
            <Card>
                <Body style={styles.subtitle}>Chapter Name:</Body>
                <FormField value={chapterName} placeholder={"Name"} onChangeText={setChapterName} />

                <Body style={styles.subtitle2}>PGN (optional):</Body>
                <FormField value={pgn} placeholder={"PGN"} onChangeText={setPgn} />
            </Card>
            <MainButton style={styles.button} text="Add Chapter" />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginBottom: 10,
    },
    subtitle: {
        marginBottom: 5,
    },
    button: {
        marginTop: 20,
    },
    subtitle2: {
        marginBottom: 5,
        marginTop: 10,
    },
});

export default AddChapterModal;
