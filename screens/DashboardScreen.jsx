import Container from "../components/Container";
import { Image, View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DashButton from "../components/dashboard/DashButton";
import { auth } from "../firebase";


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
                <DashButton
                    image={require("../assets/favicon.png")}
                    title="Daily Test"
                    description="Take a daily test to improve your skills."
                    onPress={() => navigation.navigate("DailyTestDash")}
                />
                <DashButton
                    image={require("../assets/favicon.png")}
                    title="Custom Testing"
                    description="Create a custom test to focus on specific areas."
                    onPress={() => navigation.navigate("CustomTesting")}
                />
                <DashButton
                    image={require("../assets/favicon.png")}
                    title="Add Study"
                    description="Add a new study to your collection."
                    onPress={() => navigation.navigate("AddStudy")}
                />
                <DashButton
                    image={require("../assets/favicon.png")}
                    title="View Studies"
                    description="View all of your studies."
                    onPress={() => navigation.navigate("ViewStudies")}
                />
                <DashButton
                    image={require("../assets/favicon.png")}
                    title="Settings"
                    description="View and edit your settings."
                    onPress={handleLogout}
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
});

export default DashboardScreen;
