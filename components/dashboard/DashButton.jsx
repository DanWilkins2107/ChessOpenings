import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const DashButton = ({ image, title, description, onPress, backgroundColor }) => {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: backgroundColor}]} onPress={onPress}>
            <View style={styles.buttonContent}>
                <Image source={image} style={styles.buttonImage} />
                <View style={styles.buttonTextContainer}>
                    <Text style={styles.buttonText}>{title}</Text>
                    <Text style={styles.buttonDescription}>{description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        height: 150,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        overflow: "hidden",
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    buttonImage: {
        width: 80,
        height: 80,
        marginRight: 20,
    },
    buttonTextContainer: {
        flex: 1,
    },
    buttonText: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold",
    },
    buttonDescription: {
        fontSize: 16,
        color: "#fff",
        flexWrap: "wrap",
    },
});

export default DashButton;
