import Container from "../components/Container";
import { Image, View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import LineSeparator from "../components/auth/LineSeparator";
import DailyTestButton from "../components/dashboard/DailyTestButton";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../colors";

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
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <DailyTestButton />
                <LineSeparator text="" />
                <View style={styles.lineContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("ChooseTrainStudy")}
                    > 
                        <View style={styles.iconContainer}>
                            <Icon name="cog" size={24} color="white" />
                        </View>
                        <Text style={styles.buttonText}>Custom Train</Text>
                        <Text style={styles.buttonDescription}>Focus on specific areas.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("Train")}
                    >
                        <View style={styles.iconContainer}>
                            <Icon name="book" size={24} color="white" />
                        </View>
                        <Text style={styles.buttonText}>Train All</Text>
                        <Text style={styles.buttonDescription}>Study all of your studies.</Text>
                    </TouchableOpacity>
                </View>
                <LineSeparator text="" />
                <TouchableOpacity
                    style={[styles.button, styles.upgradeButton]}
                    onPress={() => navigation.navigate("ChangePlan")}
                >
                    <View style={styles.iconContainer}>
                        <Icon name="rocket" size={24} color="#333" />
                    </View>
                    <Text style={styles.upgradeButtonText}>Upgrade to Pro</Text>
                    <Text style={styles.upgradeButtonDescription}>
                        Unlock all features with a Pro account.
                    </Text>
                </TouchableOpacity>
                <LineSeparator text="" />
                <View style={styles.lineContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("AddStudy")}
                    >
                        <View style={styles.iconContainer}>
                            <Icon name="plus" size={24} color="white" />
                        </View>
                        <Text style={styles.buttonText}>Add Study</Text>
                        <Text style={styles.buttonDescription}>
                            Add a new study to your collection.
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("ChooseViewStudy")}
                    >
                        <View style={styles.iconContainer}>
                            <Icon name="eye" size={24} color="white" />
                        </View>
                        <Text style={styles.buttonText}>View Study</Text>
                        <Text style={styles.buttonDescription}>
                            View a study from your collection.
                        </Text>
                    </TouchableOpacity>
                </View>
                <LineSeparator text="" />
                <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() => navigation.navigate("Settings")}
                >
                    <Icon name="cog" size={24} color="#333" />
                    <Text style={styles.settingsButtonText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Icon name="sign-out" size={24} color="#333" style={styles.logoutIcon} />
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
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
    contentContainer: {
        paddingVertical: 20,
    },
    lineContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        borderColor: Colors.primaryBorder,
        borderWidth: 2,
        height: 150,
        width: "45%",
        justifyContent: "center",
      },
    upgradeButton: {
        backgroundColor: Colors.primaryBorder,
        width: "100%",
        height: 150,
    },
    upgradeButtonDescription: {
        color: "#333",
        fontSize: 16,
        textAlign: "center",
    },
    space: {
        width: 10,
    },
    settingsButton: {
        backgroundColor: "#ccc",
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        borderColor: "#ccc",
        borderWidth: 2,
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    logoutButton: {
        backgroundColor: "#FFC0CB",
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        borderColor: "#FFC0CB",
        borderWidth: 2,
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    upgradeButtonText: {
        fontSize: 18,
        color: "#333",
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonDescription: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
    },
    settingsButtonText: {
        fontSize: 20,
        color: "#333",
        fontWeight: "bold",
        marginLeft: 10,
    },
    logoutButtonText: {
        fontSize: 20,
        color: "#333",
        fontWeight: "bold",
        marginLeft: 10,
    },
    iconContainer: {
        alignItems: "center",
        marginBottom: 10,
    },
});

export default DashboardScreen;
