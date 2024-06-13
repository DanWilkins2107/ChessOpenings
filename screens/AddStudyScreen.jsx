import { useState } from "react";
import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import Container from "../components/Container";
import Header from "../components/Header";
import AddStudyButton from "../components/addstudy/AddStudyButton";
import LineSeparator from "../components/auth/LineSeparator";
import PgnInput from "../components/addstudy/PgnInput";
import UrlButton from "../components/addstudy/UrlButton";
import FormField from "../components/FormField";
import IconSelector from "../components/addstudy/IconSelector";
import { db } from "../firebase";
import { ref, set } from "firebase/database";
import { randomUUID } from "expo-crypto";

const AddStudyScreen = () => {
    const [pgnText, setPgnText] = useState("");
    const [lichessStudyUrl, setLichessStudyUrl] = useState("");
    const [studyTitle, setStudyTitle] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(null);

    const createStudy = async () => {
        const studyUuid = randomUUID();
        const pgnUuid = randomUUID();
        const studyRef = ref(db, `studies/${studyUuid}`);
        const pgnRef = ref(db, `pgns/${pgnUuid}`);

        try {
            await set(pgnRef, null);

            await set(studyRef, {
                title: studyTitle,
                icon: selectedIcon,
                chapters: [
                    {
                        name: "Chapter 1",
                        pgn: pgnUuid,
                        fen: null,
                    },
                ],
            });
            console.log(`Study created successfully with UUID: ${studyUuid}`);
        } catch (error) {
            console.error(`Error creating study: ${error}`);
        }
    };
    return (
        <Container>
            <KeyboardAvoidingView style={styles.container}>
                <Header showBackButton />
                <ScrollView style={styles.scrollView}>
                    <FormField
                        value={studyTitle}
                        onChangeText={setStudyTitle}
                        placeholder="Enter Study Title"
                    />
                    <IconSelector selectedIcon={selectedIcon} onSelectIcon={setSelectedIcon} />
                    <AddStudyButton
                        title="Create From Scratch"
                        onPress={createStudy}
                        colors={["#2196F3", "#1976D2"]}
                        textColor="#fff"
                    />
                    <LineSeparator text="OR" />
                    <PgnInput pgnText={pgnText} setPgnText={setPgnText} />
                    <AddStudyButton
                        title="Import PGN"
                        onPress={() => console.log("Import PGN")}
                        colors={["#2196F3", "#1976D2"]}
                        textColor="#fff"
                    />
                    <LineSeparator text="OR" />
                    <UrlButton
                        url={lichessStudyUrl}
                        setUrl={setLichessStudyUrl}
                        placeholder="Enter Lichess Study URL"
                        title="Import Lichess Study"
                        onPress={() => console.log("Import Lichess Study")}
                        colors={["#fff", "#ddd"]}
                        textColor="#000"
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    scrollView: {
        flex: 1,
    },
});

export default AddStudyScreen;
