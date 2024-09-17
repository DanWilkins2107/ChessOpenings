import { StyleSheet, ActivityIndicator, View, ScrollView } from "react-native";
import Container from "../components/Container";
import Title from "../components/text/Title";
import Card from "../components/containers/Card";
import Subheading from "../components/text/Subheading";
import MainButton from "../components/genericButtons/MainButton";
import { useState, useCallback } from "react";
import StudyButton from "../components/chooseStudy/StudyButton";
import Subheading2 from "../components/text/Subheading2";
import getUserStudyData from "../functions/fetch/getUserStudyData";
import { useFocusEffect } from "@react-navigation/native";

export default function StudyDashboard({ navigation }) {
    const [studyObj, setStudyObj] = useState({});
    const [studyList, setStudyList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStudies = async () => {
        const { studyObjToAdd, sortedStudies } = await getUserStudyData();
        setStudyList(sortedStudies);
        setStudyObj(studyObjToAdd);
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            fetchStudies();
        }, [])
    );

    const handleStudyPress = (studyUUID) => {
        navigation.navigate("ViewStudy", { studyUUID: studyUUID });
    };

    const handleCreatePress = () => {
        navigation.navigate("AddStudy");
    };

    return (
        <Container theme="light" style={styles.container}>
            <Title style={styles.title}>Study Dashboard</Title>
            <Card style={styles.card}>
                <Subheading style={styles.subtitle}>Your Studies</Subheading>
                {loading ? (
                    <ActivityIndicator />
                ) : studyList.length === 0 ? (
                    <Subheading2 style={styles.subheading}>
                        Looks like you don't have any studies yet! Click the button below to create
                        your first one.
                    </Subheading2>
                ) : (
                    <ScrollView>
                        {studyList.map((studyUUID) => {
                            return (
                                <View key={studyUUID} style={styles.section}>
                                    <StudyButton
                                        study={studyObj[studyUUID]}
                                        onPress={() => handleStudyPress(studyUUID)}
                                    />
                                </View>
                            );
                        })}
                    </ScrollView>
                )}
            </Card>
            <MainButton
                text="Create a New Opening Study"
                style={styles.button}
                onPress={handleCreatePress}
            />
        </Container>
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
        marginTop: 10,
        marginBottom: 10,
    },
    section: {
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
    },
    card: {
        paddingBottom: 0,
        flex: 1,
    },
    subtitle: {
        marginBottom: 10,
    },
});
