import { StyleSheet, ActivityIndicator, ScrollView, View } from "react-native";
import { useState, useEffect, useContext } from "react";
import Card from "../components/containers/Card";
import Container from "../components/containers/Container";
import Title from "../components/text/Title";
import MainButton from "../components/genericButtons/MainButton";
import Body from "../components/text/Body";
import { AlertContext } from "../components/alert/AlertContextProvider";
import StudyAndChapterSelector from "../components/chooseStudy/StudyAndChapterSelector";
import ChapterAndStudyToString from "../functions/test/chapterAndStudyToString";
import getUserStudyData from "../functions/fetch/getUserStudyData";

export default function ChooseTrain({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [studies, setStudies] = useState([]);
    const [studyObj, setStudyObj] = useState({});
    const [chosenStudies, setChosenStudies] = useState({});
    const [chosenChapters, setChosenChapters] = useState({});
    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        const getStudies = async () => {
            const { studyObjToAdd, sortedStudies } = await getUserStudyData();

            setStudyObj(studyObjToAdd);
            setStudies(sortedStudies);

            const chosenChaptersToAdd = {};
            const chosenStudiesToAdd = {};
            sortedStudies.forEach((studyUUID) => {
                chosenStudiesToAdd[studyUUID] = false;
                chosenChaptersToAdd[studyUUID] = Array(
                    studyObjToAdd[studyUUID].chapters.length
                ).fill(false);
            });

            setChosenChapters(chosenChaptersToAdd);
            setChosenStudies(chosenStudiesToAdd);
            setLoading(false);
        };
        getStudies();
    }, []);

    const handleChooseStudies = () => {
        const chosenPGNs = [];
        Object.keys(studyObj).forEach((study) => {
            chosenChapters[study].forEach((chapter, index) => {
                if (chapter) {
                    const chapterString = ChapterAndStudyToString(
                        studyObj[study].chapters[index],
                        studyObj[study],
                        study
                    );
                    chosenPGNs.push(chapterString);
                }
            });
        });
        if (chosenPGNs.length === 0) {
            setAlert("Please select at least one chapter to train", "red");
            return;
        }
        navigation.navigate("Training", { chosenPGNs: chosenPGNs });
    };

    return (
        <Container theme="light" style={styles.container}>
            <Title>Choose Studies to Train</Title>
            <Card style={styles.card} padding={false}>
                <Body style={styles.bodyText}>
                    Choose the studies and chapters you would like to train. You can select multiple
                    studies and chapters to train at once.
                </Body>
                {loading ? (
                    <ActivityIndicator />
                ) : (
                    <ScrollView>
                        <StudyAndChapterSelector
                            studyObj={studyObj}
                            studyUUIDs={studies}
                            chosenChapters={chosenChapters}
                            chosenStudies={chosenStudies}
                            setChosenChapters={setChosenChapters}
                            setChosenStudies={setChosenStudies}
                        />
                    </ScrollView>
                )}
            </Card>
            <MainButton
                text="Confirm Selection"
                style={styles.button}
                onPress={handleChooseStudies}
            />
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    bodyText: {
        marginBottom: 10,
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    card: {
        marginTop: 10,
        flex: 1,
    },
    button: {
        marginVertical: 20,
    },
});
