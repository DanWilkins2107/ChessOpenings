import Container from "../components/Container";
import { View, StyleSheet, Text, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "../components/dailytest/ProgressBar";
import Graph from "../components/dailytest/Graph";

const DailyTestDashboard = () => {
    const navigation = useNavigation();

    const handleStartTest = () => {
        navigation.navigate("DailyTest");
    };

    const handleSettings = () => {
        navigation.navigate("Dashboard");
    };

    const data = [
        { day: "Sun", red: 3, green: 7 },
        { day: "Mon", red: 3, green: 2 },
        { day: "Tue", red: 2, green: 4 },
        { day: "Wed", red: 5, green: 1 },
        { day: "Thu", red: 1, green: 3 },
        { day: "Fri", red: 4, green: 0 },
        { day: "Sat", red: 2, green: 8 },
    ];

    // Mock data for demonstration purposes
    const completedLines = 3;

    return (
        <Container>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={require("../assets/favicon.png")} style={styles.logo} />
                </View>
                <View style={styles.dailyTestPanel}>
                    <Text style={styles.title}>Daily Test</Text>
                    <Text style={styles.completedLines}>
                        {completedLines} of 10 lines completed
                    </Text>
                    <ProgressBar completedLines={9} totalLines={10} correctLines={5} />
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Start/Resume Test"
                            onPress={handleStartTest}
                            style={styles.startButton}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Daily Test Settings"
                            onPress={handleSettings}
                            style={styles.settingsButton}
                        />
                    </View>
                </View>
                <Graph data={data} />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
    },
    dailyTestPanel: {
        padding: 20,
        backgroundColor: "#333",
        borderRadius: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        marginBottom: 10,
    },
    completedLines: {
        fontSize: 18,
        color: "#fff",
        textAlign: "center",
        marginBottom: 20,
    },
    buttonContainer: {
        marginBottom: 20,
    },
    startButton: {
        fontSize: 20,
        backgroundColor: "#4CAF50",
        color: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    settingsButton: {
        fontSize: 20,
        backgroundColor: "#9C27B0",
        color: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
});

export default DailyTestDashboard;
