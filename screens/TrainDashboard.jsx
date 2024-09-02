import Container from "../components/Container";
import { StyleSheet, ScrollView } from "react-native";
import Title from "../components/text/Title";
import DailyTestCard from "../components/dashboard/DailyTestCard";
import TrainingCard from "../components/dashboard/TrainingCard";
import TrainingStats from "../components/training/TrainingStats";

export default function TrainDashboard({ navigation }) {
    const handleDailyTestPress = () => {
        console.log("Daily Test Pressed");
    };

    const handleTrainAllPress = () => {
        navigation.navigate("Training");
    };

    const handleCustomTrainingPress = () => {
        navigation.navigate("ChooseTrain");
    };

    return (
        <Container theme="light">
            <ScrollView style={styles.container}>
                <Title style={styles.title}>Training Dashboard</Title>
                <DailyTestCard style={styles.card} buttonPress={handleDailyTestPress} />
                <TrainingCard
                    style={styles.card}
                    trainAllPress={handleTrainAllPress}
                    chooseTrainPress={handleCustomTrainingPress}
                />
                <TrainingStats style={styles.card} />
            </ScrollView>
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
    card: {
        marginBottom: 20,
    },
});
