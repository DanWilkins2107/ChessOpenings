import { ScrollView, StyleSheet } from "react-native";
import Container from "../components/containers/Container";
import Card from "../components/containers/Card";
import Title from "../components/text/Title";
import Subheading from "../components/text/Subheading";
import ObjectiveButton from "../components/dashboard/ObjectiveButton";
import MainButton from "../components/genericButtons/MainButton";
import Body from "../components/text/Body";
import SecondaryButton from "../components/genericButtons/SecondaryButton";
import { useCallback, useEffect, useState } from "react";
import { auth } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getDifferenceOfDays from "../functions/dashboard/getDifferenceOfDays";
import { useFocusEffect } from "@react-navigation/native";

export default function Dashboard({ navigation }) {
    const [displayName, setDisplayName] = useState(null);
    const [loadingObjectives, setLoadingObjectives] = useState(true);
    const [createStudyStatus, setCreateStudyStatus] = useState(false);
    const [completeDailyTestStatus, setCompleteDailyTestStatus] = useState(false);
    const [completeTrainStatus, setCompleteTrainStatus] = useState(false);
    const [lastTrainingDateString, setLastTrainingDateString] = useState(null);
    const [lastTrainingString, setLastTrainingString] = useState(null);

    const getObjectiveStatus = async () => {
        // React native async storage

        const createStudy = await AsyncStorage.getItem("objectives/createStudy");
        const dailyTest = await AsyncStorage.getItem("objectives/dailyTest");
        const train = await AsyncStorage.getItem("objectives/train");

        let first = true;
        if (createStudy === "true") {
            setCreateStudyStatus("completed");
        } else {
            setCreateStudyStatus("active");
            first = false;
        }

        if (dailyTest === "true") {
            setCompleteDailyTestStatus("completed");
        } else {
            setCompleteDailyTestStatus(first ? "active" : "");
            first = false;
        }

        if (train === "true") {
            setCompleteTrainStatus("completed");
        } else {
            setCompleteTrainStatus(first ? "active" : "");
        }
    };

    const fetchLastTrain = async () => {
        const lastTrainingDate = (await AsyncStorage.getItem("training/lastDate")) || null;
        const lastTrainingString = (await AsyncStorage.getItem("training/lastString")) || null;

        setLastTrainingString(lastTrainingString);

        if (!lastTrainingDate) {
            return;
        }

        const now = new Date();
        const oldDate = new Date(lastTrainingDate);

        const daysBetweenTraining = getDifferenceOfDays(oldDate, now);

        if (daysBetweenTraining === 0) {
            setLastTrainingDateString("You trained earlier today! ");
            return;
        }

        if (daysBetweenTraining === 1) {
            setLastTrainingDateString("You last trained yesterday! ");
            return;
        }

        setLastTrainingDateString(`You last trained ${daysBetweenTraining} days ago! `);
    };

    useFocusEffect(
        useCallback(() => {
            const displayName = auth.currentUser.displayName;
            setDisplayName(displayName);
            getObjectiveStatus();
            fetchLastTrain();
            setLoadingObjectives(false);
        }, [])
    );
    return (
        <Container theme="light">
            <ScrollView style={styles.container}>
                <Title style={styles.title}>{displayName ? "Hi " + displayName : "Welcome"}</Title>
                <Card style={styles.card}>
                    <Subheading style={styles.subheading}>Get Started</Subheading>

                    <ObjectiveButton
                        style={styles.button}
                        text={"Create a Study"}
                        completed={createStudyStatus === "completed"}
                        active={createStudyStatus === "active"}
                        onPress={async () => {
                            if (createStudyStatus === "completed") {
                                return;
                            }
                            navigation.navigate("Study", { screen: "AddStudy" });
                        }}
                    />
                    <ObjectiveButton
                        style={styles.button}
                        text="Complete a Daily Test"
                        completed={completeDailyTestStatus === "completed"}
                        active={completeDailyTestStatus === "active"}
                        onPress={() => {
                            if (completeDailyTestStatus === "completed") {
                                return;
                            }
                            navigation.navigate("Train");
                        }}
                    />
                    <ObjectiveButton
                        style={styles.button}
                        text="Train a Study"
                        completed={completeTrainStatus === "completed"}
                        active={completeTrainStatus === "active"}
                        onPress={() => {
                            if (completeTrainStatus === "completed") {
                                return;
                            }
                            navigation.navigate("Train");
                            navigation.navigate("ChooseTrain");
                        }}
                    />
                </Card>
                <Card style={styles.card}>
                    <Subheading style={styles.subheading}>Welcome Back</Subheading>
                    <Body style={styles.body}>
                        {lastTrainingDateString}Want to pick up where you left off?
                    </Body>
                    <SecondaryButton
                        text="Continue Training"
                        icon="arrow-right-from-bracket"
                        style={styles.continueTrain}
                        onPress={() => {
                            const studyStringArray = JSON.parse(lastTrainingString);
                            navigation.navigate("Train")
                            navigation.navigate("ChooseTrain");
                            navigation.navigate("Training", { chosenPGNs: studyStringArray });
                        }}
                    />
                </Card>
                <Card style={styles.card}>
                    <Subheading style={styles.subheading}>Current Plan: Free</Subheading>
                    <Body style={styles.body}>
                        Thanks for helping on the Beta Testing of Chess Opening Trainer {"<"}3
                    </Body>
                    <MainButton text="Upgrade Plan" />
                </Card>
                <Card style={styles.card}>
                    <Subheading style={styles.subheading}>Join the Community</Subheading>
                    <SecondaryButton
                        style={styles.socialButton}
                        text="Instagram"
                        icon="instagram"
                    />
                    <SecondaryButton style={styles.socialButton} text="Tiktok" icon="tiktok" />
                    <SecondaryButton style={styles.button} text="Discord" icon="discord" />
                </Card>
                <Card style={styles.card}>
                    <Subheading>Rate Us</Subheading>
                </Card>
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        flex: 1,
    },
    title: {
        marginBottom: 20,
    },
    card: {
        marginBottom: 20,
    },
    subheading: {
        marginBottom: 10,
    },
    button: {
        marginBottom: 5,
    },
    socialButton: {
        marginBottom: 10,
    },
    body: {
        marginBottom: 10,
    },
    continueTrain: {
        justifyContent: "center",
        alignItems: "center",
    },
});
