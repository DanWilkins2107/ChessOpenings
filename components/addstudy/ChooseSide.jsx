import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ChooseSide = ({ side, setSide }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>This Study is for: </Text>
            <View style={styles.colorToggleContainer}>
                <TouchableOpacity
                    onPress={() => setSide("white")}
                    style={[styles.colorToggle, side === "white" && styles.whiteSelected]}
                >
                    <View style={styles.whiteInner}>
                        <Text>White</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.colorToggle, side === "black" && styles.blackSelected]}
                    onPress={() => setSide("black")}
                >
                    <View style={styles.blackInner}>
                        <Text style={styles.blackText}>Black</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
        color: "white",
    },
    colorToggleContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    colorToggle: {
        marginHorizontal: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 2,
    },
    whiteInner: {
        borderWidth: 2,
        margin: 2,
        padding: 10,
        backgroundColor: "white",
    },
    blackInner: {
        backgroundColor: "black",
        borderWidth: 2,
        margin: 2,
        padding: 10,
    },
    blackText: {
        color: "white",
    },
    whiteSelected: {
        borderColor: "white",
    },
    blackSelected: {
        borderColor: "black",
    },
});

export default ChooseSide;
