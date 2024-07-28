import { useState, useContext, useEffect } from "react";
import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import Container from "../components/Container";
import AddStudyButton from "../components/addstudy/AddStudyButton";
import LineSeparator from "../components/auth/LineSeparator";
import PgnInput from "../components/addstudy/PgnInput";
import FormField from "../components/FormField";
import IconSelector from "../components/addstudy/IconSelector";
import { db } from "../firebase";
import { ref, set } from "firebase/database";
import { randomUUID } from "expo-crypto";
import Colors from "../colors";
import { AlertContext } from "../components/alert/AlertContextProvider";
import { auth } from "../firebase";
import PageTitle from "../components/PageTitle";

const AddStudyScreen = ({ navigation }) => {
    const [pgnText, setPgnText] = useState("");
    const [studyTitle, setStudyTitle] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [lichessStudyUrl, setLichessStudyUrl] = useState("");
    const { setAlert } = useContext(AlertContext);

    const createStudy = async () => {
        const studyUuid = randomUUID();
        const pgnUuid = randomUUID();

        const studyRef = ref(db, `studies/${studyUuid}`);
        const userStudyRef = ref(db, `users/${auth.currentUser.uid}/studies/${studyUuid}`);
        if (!studyTitle) {
            setAlert("Please enter a study title.", "red");
            return;
        }
        if (!selectedIcon) {
            setAlert("Please select an icon.", "red");
            return;
        }
        try {
            await set(studyRef, {
                title: studyTitle,
                icon: selectedIcon,
                chapters: [
                    {
                        name: "Chapter 1",
                        pgn: pgnUuid,
                    },
                ],
            });
            await set(userStudyRef, Date.now());
            setAlert("Study created!", "green");
            navigation.navigate("ViewStudy", { studyUuid });
        } catch (error) {
            setAlert("Error creating study. Please try again.", "red");
        }
    };
    return (
        <Container>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <PageTitle title="Add a Study" />
                <ScrollView style={styles.scrollView}>
                    <FormField
                        value={studyTitle}
                        onChangeText={setStudyTitle}
                        placeholder="Enter Study Title"
                    />
                    <IconSelector selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
                    <LineSeparator />
                    <AddStudyButton
                        title="Create From Scratch"
                        onPress={createStudy}
                        backgroundColor={Colors.primary}
                        borderColor={Colors.primaryBorder}
                        textColor="#fff"
                    />
                    <LineSeparator text="OR" />
                    <PgnInput pgnText={pgnText} setPgnText={setPgnText} />
                    <AddStudyButton
                        title="Import PGN"
                        onPress={() => console.log("Import PGN")}
                        backgroundColor={Colors.primary}
                        borderColor={Colors.primaryBorder}
                        textColor="#fff"
                    />
                    <LineSeparator text="OR" />
                    <FormField
                        value={lichessStudyUrl}
                        onChangeText={setLichessStudyUrl}
                        placeholder="Enter Lichess Study URL"
                    />
                    <AddStudyButton
                        title="Import Lichess Study"
                        onPress={() => console.log("Import Lichess Study")}
                        backgroundColor="rgba(255, 255, 255, 0.9)"
                        borderColor="#fff"
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
