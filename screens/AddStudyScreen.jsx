import { useState, useContext } from "react";
import { StyleSheet, ScrollView, KeyboardAvoidingView, View } from "react-native";
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
import pgnParser from "pgn-parser";
import ChooseSide from "../components/addstudy/ChooseSide";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddStudyScreen = ({ navigation }) => {
    const [pgnText, setPgnText] = useState("");
    const [studyTitle, setStudyTitle] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [lichessStudyUrl, setLichessStudyUrl] = useState("");
    const { setAlert } = useContext(AlertContext);
    const [side, setSide] = useState("white");

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
                color: side,
                chapters: [
                    {
                        name: "Chapter 1",
                        pgn: pgnUuid,
                    },
                ],
            });
            await set(userStudyRef, Date.now());
            setAlert("Study created!", "green");
            navigation.navigate("ViewStudy", { study: studyUuid });
        } catch (error) {
            setAlert("Error creating study. Please try again.", "red");
        }
    };

    const createStudyFromPgn = async () => {
        if (!pgnText) {
            setAlert("Please enter a PGN.", "red");
            return;
        }

        if (!studyTitle) {
            setAlert("Please enter a study title.", "red");
            return;
        }

        if (!selectedIcon) {
            setAlert("Please select an icon.", "red");
            return;
        }

        // FINISH THIS
    };

    const createStudyFromLichess = async () => {
        if (!lichessStudyUrl) {
            setAlert("Please enter a Lichess study URL.", "red");
            return;
        }

        if (!studyTitle) {
            setAlert("Please enter a study title.", "red");
            return;
        }

        if (!selectedIcon) {
            setAlert("Please select an icon.", "red");
            return;
        }

        const studyId = lichessStudyUrl.split("/").pop();

        try {
            const response = await fetch(`https://lichess.org/api/study/${studyId}.pgn`);
            if (response.ok && response.status === 200) {
                const pgn = await response.text();
                const parsed = pgnParser.parse(pgn);
                const studyUUID = randomUUID();
                const studyObj = {
                    title: studyTitle,
                    color: side,
                    icon: selectedIcon,
                    chapters: [],
                };
                const promises = [];

                for (const chapter of parsed) {
                    const pgnUUID = randomUUID();
                    const name =
                        chapter.headers[0].value.split(": ", 2)[1] ||
                        "Chapter " + (studyObj.chapters.length + 1);
                    studyObj.chapters.push({
                        name: name,
                        pgn: pgnUUID,
                    });
                    const pgnPromise = set(ref(db, `pgns/${pgnUUID}`), chapter.moves);
                    promises.push(pgnPromise);
                }
 
                const studyPromise = set(ref(db, `studies/${studyUUID}`), studyObj);
                promises.push(studyPromise);
                const userPromise = set(
                    ref(db, `users/${auth.currentUser.uid}/studies/${studyUUID}`),
                    Date.now()
                );
                promises.push(userPromise);

                await Promise.all(promises);

                setTimeout(() => {
                    setAlert("Study created!", "green");
                    navigation.navigate("ViewStudy", { study: studyUUID });
                }, 1000);
            } else {
                setAlert("Error importing study. Please try again.", "red");
            }
        } catch (error) {
            setAlert("Error importing study. Please try again.", "red");
        }
    };

    return (
        <Container>
            <View style={styles.container} behavior="padding">
                <PageTitle title="Add a Study" />
                <KeyboardAwareScrollView style={styles.scrollView}>
                    <FormField
                        value={studyTitle}
                        onChangeText={setStudyTitle}
                        placeholder="Enter Study Title"
                    />
                    <IconSelector selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
                    <ChooseSide side={side} setSide={setSide} />
                    <LineSeparator />
                    <AddStudyButton
                        title="Create From Scratch"
                        onPress={createStudy}
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
                        onPress={() => createStudyFromLichess()}
                        backgroundColor="rgba(255, 255, 255, 0.9)"
                        borderColor="#fff"
                        textColor="#000"
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
                    <View style={styles.spacer} />
                </KeyboardAwareScrollView>
            </View>
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
    spacer: {
        height: 200,
        backgroundColor: "transparent",
        width: "100%",
    },
});

export default AddStudyScreen;
