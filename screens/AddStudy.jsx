import Container from "../components/containers/Container";
import Card from "../components/containers/Card";
import FormField from "../components/inputs/FormField";
import Subheading from "../components/text/Subheading";
import Subheading2 from "../components/text/Subheading2";
import Title from "../components/text/Title";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useContext, useState, useCallback } from "react";
import SelectIcon from "../components/addstudy/IconSelector";
import ChooseSide from "../components/addstudy/ChooseSide";
import DropdownList from "../components/chooseStudy/DropdownList";
import MainButton from "../components/genericButtons/MainButton";
import Body from "../components/text/Body";
import OpacityPressable from "../components/genericButtons/OpacityPressable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import createStudy from "../functions/set/createStudy";
import { AlertContext } from "../components/alert/AlertContextProvider";
import { ModalContext } from "../components/modal/ModalContextProvider";
import LichessChapterModal from "../components/addstudy/LichessChapterModal";
import { useFocusEffect } from "@react-navigation/native";

export default function AddStudy({ navigation }) {
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");
    const [side, setSide] = useState("white");
    const [importFrom, setImportFrom] = useState("PGN");
    const [pgn, setPgn] = useState("");
    const [lichessUrl, setLichessUrl] = useState("");
    const { setAlert } = useContext(AlertContext);
    const { setModal } = useContext(ModalContext);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleDropdownPress = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleReload = () => {
        setTitle("");
        setIcon("");
        setSide("white");
        setImportFrom("PGN");
        setPgn("");
        setLichessUrl("");
    };

    useFocusEffect(
        useCallback(() => {
            handleReload();
        }, [])
    );

    const handleSubmit = async () => {
        if (!title) {
            setAlert("Please enter a title", "red");
            return;
        }
        if (!icon) {
            setAlert("Please select an icon", "red");
            return;
        }
        let pgn = null;
        if (importFrom === "PGN" && pgn) {
            pgn = pgn;
        } else if (importFrom === "Lichess" && lichessUrl) {
            const lichessStudyArray = lichessUrl.split("/");

            const lichessDotOrgIndex = lichessStudyArray.indexOf("lichess.org");
            if (lichessDotOrgIndex === -1) {
                setAlert("Invalid Lichess URL", "red");
                return;
            }
            const slicedArray = lichessStudyArray.slice(lichessDotOrgIndex + 1);
            if (slicedArray[0] !== "study") {
                setAlert("Invalid Lichess URL", "red");
                return;
            }
            if (slicedArray.length === 3) {
                // Deal with study + chapter URL
                setModal(
                    <LichessChapterModal
                        onChapterPress={async () => {
                            const studyId = slicedArray[1];
                            const chapterId = slicedArray[2];
                            try {
                                pgn = await getLichessStudyChapter(studyId, chapterId);
                            } catch (error) {
                                setAlert("Error fetching chapter from Lichess", "red");
                                setModal(null);
                                return;
                            }
                            await finishStudyCreation(pgn);
                        }}
                        onStudyPress={async () => {
                            const studyId = slicedArray[1];
                            try {
                                pgn = await getLichessStudy(studyId);
                            } catch (error) {
                                setAlert("Error fetching study from Lichess", "red");
                                setModal(null);
                                return;
                            }
                            await finishStudyCreation(pgn);
                        }}
                    />
                );
                return;
            }
            if (slicedArray.length === 2) {
                const studyId = slicedArray[1];
                try {
                    pgn = await getLichessStudy(studyId);
                } catch (error) {
                    setAlert("Error fetching study from Lichess", "red");
                    setModal(null);
                    return;
                }
            }
        }

        await finishStudyCreation(pgn);
    };

    const getLichessStudy = async (studyId) => {
        const response = await fetch(`https://lichess.org/api/study/${studyId}.pgn`);
        if (response.ok && response.status === 200) {
            return await response.text();
        } else {
            throw new Error("Error fetching study from Lichess");
        }
    };

    const getLichessStudyChapter = async (studyId, chapterId) => {
        const response = await fetch(`https://lichess.org/api/study/${studyId}${chapterId}.pgn`);
        if (response.ok && response.status === 200) {
            return await response.text();
        } else {
            throw new Error("Error fetching chapter from Lichess");
        }
    };

    const finishStudyCreation = async (pgn) => {
        const studyUUID = await createStudy(title, icon, side, pgn, importFrom === "Lichess");
        if (studyUUID) {
            navigation.navigate("ViewStudy", { studyUUID: studyUUID });
        } else {
            setAlert("Error creating study", "red");
        }
        setModal(null);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <Container theme="light" style={styles.container}>
                    <Title style={styles.title}>Create an Opening Study</Title>
                    <KeyboardAwareScrollView>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View>
                                <Card style={styles.section}>
                                    <Subheading style={styles.subheading}>
                                        Study Information
                                    </Subheading>
                                    <Subheading2 style={styles.sectionHeading}>Title:</Subheading2>
                                    <FormField
                                        placeholder="Study Title"
                                        onChangeText={setTitle}
                                        value={title}
                                    />
                                    <Subheading2 style={styles.sectionHeading}>Icon:</Subheading2>
                                    <SelectIcon selectedIcon={icon} setSelectedIcon={setIcon} />
                                    <Subheading2 style={styles.sectionHeading}>
                                        What side are you learning from?
                                    </Subheading2>
                                    <ChooseSide side={side} setSide={setSide} />
                                </Card>
                                <Card style={styles.section}>
                                    <Subheading style={styles.bottomSubheading}>
                                        Import Moves
                                    </Subheading>
                                    <DropdownList
                                        isDropdownVisible={dropdownVisible}
                                        setIsDropdownVisible={handleDropdownPress}
                                        topContent={
                                            <View>
                                                <Subheading2>Import From {importFrom}</Subheading2>
                                            </View>
                                        }
                                        dropdownContent={
                                            <View>
                                                <OpacityPressable
                                                    style={styles.importButton}
                                                    shadow={false}
                                                    onPress={() => {
                                                        setImportFrom("PGN");
                                                        handleDropdownPress();
                                                    }}
                                                >
                                                    <Body>Import From PGN</Body>
                                                </OpacityPressable>
                                                <OpacityPressable
                                                    style={styles.importButton}
                                                    shadow={false}
                                                    onPress={() => {
                                                        setImportFrom("Lichess");
                                                        handleDropdownPress();
                                                    }}
                                                >
                                                    <Body>Import From Lichess</Body>
                                                </OpacityPressable>
                                            </View>
                                        }
                                    />
                                    {importFrom === "PGN" && (
                                        <FormField
                                            placeholder="Paste PGN"
                                            style={styles.form}
                                            onChangeText={setPgn}
                                            value={pgn}
                                        />
                                    )}
                                    {importFrom === "Lichess" && (
                                        <FormField
                                            placeholder="Enter Lichess Study URL"
                                            style={styles.form}
                                            onChangeText={setLichessUrl}
                                            value={lichessUrl}
                                        />
                                    )}
                                </Card>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAwareScrollView>
                    <MainButton
                        text="Create Opening Study"
                        style={styles.section}
                        onPress={handleSubmit}
                    />
                </Container>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    title: {
        marginBottom: 20,
    },
    subheading: {
        marginBottom: 5,
    },
    sectionHeading: {
        marginBottom: 10,
        marginTop: 20,
    },
    section: {
        marginBottom: 20,
    },
    importButton: {
        height: 40,
        width: "100%",
        justifyContent: "center",
        marginLeft: 10,
    },
    bottomSubheading: {
        marginBottom: 10,
    },
    form: {
        marginTop: 10,
    },
});
