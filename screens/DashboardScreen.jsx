import Container from "../components/Container";
import { Image, View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DashButton from "../components/dashboard/DashButton";
import { auth } from "../firebase";
import LineSeparator from "../components/auth/LineSeparator";

const DashboardScreen = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <View style={styles.logoContainer}>
                <Image source={require("../assets/favicon.png")} style={styles.logo} />
            </View>
            <ScrollView style={styles.container}>
                {/* Try muted tones but a muted blue */}
                <DashButton
                    image={require("../assets/favicon.png")}
                    title="Daily Test"
                    description="Take a daily test to improve your skills."
                    onPress={() => navigation.navigate("DailyTestDash")}
                    backgroundColor={"#AB4E68"}
                />
                <View style={styles.lineContainer}>
                    <DashButton
                        image={require("../assets/favicon.png")}
                        title="Custom Testing"
                        description="Create a custom test to focus on specific areas."
                        onPress={() => navigation.navigate("CustomTesting")}
                        backgroundColor={"#607D8B"}
                    />
                    <DashButton
                        image={require("../assets/favicon.png")}
                        title="Train All"
                        description="Study all of your studies."
                        onPress={() => navigation.navigate("ViewStudies")}
                        backgroundColor={"#607D8B"}
                    />
                </View>
                <LineSeparator text="" />
                <DashButton
                    image={require("../assets/favicon.png")}
                    title="Upgrade to Pro"
                    description="Unlock all features with a Pro account."
                    onPress={() => navigation.navigate("ChangePlan")}
                    backgroundColor={"#FF5722"}
                />
                <LineSeparator text="" />
                <View style={styles.lineContainer}>
                    <DashButton
                        image={require("../assets/favicon.png")}
                        title="Add Study"
                        description="Add a new study to your collection."
                        onPress={() => navigation.navigate("AddStudy")}
                        backgroundColor={"#1EA896"}
                    />
                    <DashButton
                        image={require("../assets/favicon.png")}
                        title="Settings"
                        description="View and edit your settings."
                        onPress={() => navigation.navigate("Settings")}
                        backgroundColor={"#1EA896"}
                    />
                </View>
                <LineSeparator text="" />
                <DashButton
                    image={require("../assets/favicon.png")}
                    title="Settings"
                    description="View and edit your settings."
                    onPress={handleLogout}
                    backgroundColor={"#607D8B"}
                />
                <DashButton 
                    image={require("../assets/favicon.png")}
                    title="Logout"
                    description="Logout of your account."
                    onPress={handleLogout}
                    backgroundColor={"#F44336"}
                />
    
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: "center",
        paddingVertical: 20,
    },
    logo: {
        width: 50,
        height: 50,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    lineContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        justifyContent: "center",
    },
});

export default DashboardScreen;
