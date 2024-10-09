import { View, Text, StyleSheet, ScrollView } from "react-native";
import ChooseSide from "../addstudy/ChooseSide";
import Subheading from "../text/Subheading";
import Subheading2 from "../text/Subheading2";
import Card from "../containers/Card";
import FormField from "../inputs/FormField";
import { useState, useContext } from "react";
import MainButton from "../genericButtons/MainButton";
import SecondaryButton from "../genericButtons/SecondaryButton";
import Body from "../text/Body";
import IconSelector from "../addstudy/IconSelector";
import { ref, set } from "firebase/database";
import { auth, db } from "../../firebase";
import { AlertContext } from "../alert/AlertContextProvider";
import { ModalContext } from "../modal/ModalContextProvider";

const StudyOptionsModal = ({ study, studyUUID, setStudy, navigation }) => {
    const [studyName, setStudyName] = useState(study?.title);
    const [color, setColor] = useState(study?.color);
    const [icon, setIcon] = useState(study?.icon);

    const { setAlert } = useContext(AlertContext);
    const { setModal } = useContext(ModalContext);
    const isDisabled = studyName === study?.title && color === study?.color && icon === study?.icon;

    const handleSaveChanges = () => {
        const updatedStudyObj = { ...study, title: studyName, color: color, icon: icon };

        const studyRef = ref(db, `studies/${studyUUID}`);
        try {
            set(studyRef, updatedStudyObj);
            setStudy(updatedStudyObj);
            setModal(null);
        } catch (error) {
            console.log(error.message);
            setAlert("Error updating study", "error");
        }
    };

    const handleDeleteStudy = () => {
        const studyRef = ref(db, `studies/${studyUUID}`);
        const userRef = ref(db, `users/${auth.currentUser.uid}/studies/${studyUUID}`);
        try {
            set(studyRef, null);
            set(userRef, null);
            setModal(null);
            navigation.navigate("StudyDashboard");
        } catch (error) {
            console.log(error.message);
            setAlert("Error deleting study", "error");
        }
    };

    return (
        <View>
            <Subheading style={styles.title}>Manage Study</Subheading>
            <Card style={styles.card}>
                <Subheading2 style={styles.subheadings}>Name:</Subheading2>
                <FormField style={styles.gap} onChangeText={setStudyName} value={studyName} />
                <Subheading2 style={styles.subheadings}>Icon</Subheading2>
                <IconSelector selectedIcon={icon} setSelectedIcon={setIcon} />

                <Subheading2 style={[styles.subheadings, styles.subheadingColor]}>
                    Colour
                </Subheading2>
                <ChooseSide side={color} setSide={setColor} style={styles.gap} />

                <MainButton
                    style={styles.mainButton}
                    text="Save Changes"
                    onPress={handleSaveChanges}
                    disabled={isDisabled}
                />
            </Card>
            <Body style={styles.gap}>
                No longer need the study? Deleted studies cannot be recovered.
            </Body>
            <SecondaryButton
                style={styles.deleteButton}
                text="Delete Study"
                onPress={handleDeleteStudy}
                icon="trash-alt"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginBottom: 10,
    },
    subheadings: {
        marginBottom: 5,
    },
    subheadingColor: {
        marginTop: 10,
    },
    gap: {
        marginBottom: 10,
    },
    card: {
        marginBottom: 20,
    },
    mainButton: {
        marginTop: 10,
    },
    deleteButton: {
        alignItems: "center",
        justifyContent: "center",
    },
});

export default StudyOptionsModal;
