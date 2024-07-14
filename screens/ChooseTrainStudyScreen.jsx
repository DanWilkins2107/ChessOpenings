import Container from "../components/Container";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState, useContext } from "react";
import { auth, db } from "../firebase";
import { get, ref } from "firebase/database";
import StudyAndChapterSelector from "../components/chooseStudy/StudyAndChapterSelector";
import { AlertContext } from "../components/alert/AlertContextProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PageTitle from "../components/PageTitle";
import Colors from "../colors";

const ChooseTrainStudyScreen = ({ navigation }) => {
    const [studies, setStudies] = useState([]);
    const [studyObj, setStudyObj] = useState({});
    const [chosenChapters, setChosenChapters] = useState({});
    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        const getStudies = async () => {
            const userStudyRef = ref(db, `users/${auth.currentUser.uid}/studies`);
            get(userStudyRef)
                .then(async (snapshot) => {
                    if (!snapshot.exists()) return;
                    const data = snapshot.val();
                    const studyUuids = Object.keys(data);
                    const studyObj = {};
                    await Promise.all(
                        studyUuids.map(async (studyUuid) => {
                            const studyRef = ref(db, `studies/${studyUuid}`);
                            const studySnapshot = await get(studyRef);
                            if (studySnapshot.exists()) {
                                const studyData = studySnapshot.val();
                                studyObj[studyUuid] = studyData;
                            }
                        })
                    );

                    let combinedStudies = { ...data };
                    const localStudies = JSON.parse(
                        (await AsyncStorage.getItem("studies")) || "{}"
                    );
                    Object.keys(data).forEach((studyUuid) => {
                        if (localStudies[studyUuid]) {
                            combinedStudies[studyUuid] = localStudies[studyUuid];
                        }
                    });

                    const sortedStudies = studyUuids.sort((a, b) => {
                        return combinedStudies[b] - combinedStudies[a];
                    });
                    setStudyObj(studyObj);
                    setStudies(sortedStudies);
                })
                .catch((error) => {
                    setAlert("Could not fetch studies", "red");
                    console.error(error.message);
                });
        };
        getStudies();
    }, []);

    return (
        <Container>
            <PageTitle style={styles.title} title="Choose Study" />
            <View style={styles.subtextContainer}>
                <Text style={styles.subtext}>
                    Choose the studies and chapters you would like to train. You can select multiple
                    studies and chapters to train at once.
                </Text>
            </View>
            <ScrollView style={styles.scrollContainer}>
                <StudyAndChapterSelector studyObj={studyObj} studyUUIDs={studies} />
            </ScrollView>
            <Text>BOTTOM</Text>
        </Container>
    );
};

const styles = StyleSheet.create({
    subtext: {
        color: "white",
        fontSize: 18,
        fontWeight: "semibold",
        textAlign: "center"
    },
    subtextContainer: {
        width: "100%",
        paddingHorizontal: 20,
        marginBottom: 20,
        justifyContent: "center"
    },
    scrollContainer: {
        width: "100%",
        flex: 1,
        paddingHorizontal: 10,
    },
});

export default ChooseTrainStudyScreen;
