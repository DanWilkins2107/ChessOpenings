import Container from "../components/Container";
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useEffect, useState, useContext } from "react";
import { auth, db } from "../firebase";
import { get, ref } from "firebase/database";
import StudyAndChapterSelector from "../components/chooseStudy/StudyAndChapterSelector";
import { AlertContext } from "../components/alert/AlertContextProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PageTitle from "../components/PageTitle";
import Colors from "../colors";
import AddStudyButton from "../components/addstudy/AddStudyButton";
import LineSeparator from "../components/auth/LineSeparator";

const ChooseTrainStudyScreen = ({ navigation }) => {
    const [studies, setStudies] = useState([]);
    const [studyObj, setStudyObj] = useState({});
    const [chosenStudies, setChosenStudies] = useState({});
    const [chosenChapters, setChosenChapters] = useState({});
    const { setAlert } = useContext(AlertContext);
    const [loading, setLoading] = useState(true);

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

                    const chosenChapters = {};
                    const chosenStudies = {};
                    sortedStudies.forEach((studyUuid) => {
                        chosenStudies[studyUuid] = false;
                        chosenChapters[studyUuid] = Array(studyObj[studyUuid].chapters.length).fill(
                            false
                        );
                    });

                    setChosenChapters(chosenChapters);
                    setChosenStudies(chosenStudies);
                })
                .catch((error) => {
                    setAlert("Could not fetch studies", "red");
                    console.error(error.message);
                })
                .then(() => {
                    setLoading(false);
                });
        };
        getStudies();
    }, []);

    const handleChooseStudies = () => {
        console.log("Studied Object", JSON.stringify(studyObj));
        console.log("Chosen Studies", chosenStudies);
        console.log("Chosen Chapters", chosenChapters);
        let chosenChapterArray = [];

        for (const studyUuid in chosenChapters) {
            chosenChapters[studyUuid].forEach((value, index) => {
                if (value) {
                    chosenChapterArray.push({
                        studyUuid,
                        chapterIndex: index,
                    });
                }
            });
        }

        console.log("Chosen Chapter Array", chosenChapterArray);


        
    };

    return (
        <Container>
            <PageTitle style={styles.title} title="Choose Studies" />
            <View style={styles.subtextContainer}>
                <Text style={styles.subtext}>
                    Choose the studies and chapters you would like to train. You can select multiple
                    studies and chapters to train at once.
                </Text>
                <LineSeparator text="" />
            </View>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <View style={styles.pageContainer}>
                    <ScrollView style={styles.scrollContainer}>
                        <StudyAndChapterSelector
                            studyObj={studyObj}
                            studyUUIDs={studies}
                            chosenChapters={chosenChapters}
                            chosenStudies={chosenStudies}
                            setChosenChapters={setChosenChapters}
                            setChosenStudies={setChosenStudies}
                        />
                    </ScrollView>
                    <View style={styles.buttonContainer}>

                        <AddStudyButton
                            title="Confirm Selection"
                            onPress={handleChooseStudies}
                            backgroundColor={Colors.primaryBorder}
                            borderColor={Colors.primaryBorder}
                            textColor="#333"
                        />
                        <LineSeparator text="" />
                    </View>

                    {studies.length === 0 && (
                        <Text style={styles.text}>Not made any studies yet?</Text>
                    )}
                    {studies.length != 0 && (
                        <Text style={styles.text}>Want to make another study?</Text>
                    )}
                    <View style={styles.buttonContainer}>
                        <AddStudyButton
                            title="Add a Study"
                            onPress={() => navigation.navigate("AddStudy")}
                            backgroundColor={Colors.primary}
                            borderColor={Colors.primaryBorder}
                            textColor="#fff"
                        />
                    </View>
                </View>
            )}
        </Container>
    );
};

const styles = StyleSheet.create({
    subtext: {
        color: "white",
        fontSize: 18,
        fontWeight: "semibold",
        textAlign: "center",
    },
    subtextContainer: {
        width: "100%",
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    pageContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
    },
    scrollContainer: {
        width: "100%",
        paddingHorizontal: 20,
        flexGrow: 0,
    },
    text: {
        fontSize: 16,
        color: Colors.primaryBorder,
        textAlign: "center",
        marginVertical: 10,
    },
    buttonContainer: {
        width: "100%",
        paddingHorizontal: 20,
    },
});

export default ChooseTrainStudyScreen;
