import { View, StyleSheet, Text } from "react-native";
import { Colors, Fonts } from "../../styling";
import Card from "../containers/Card";
import OpacityPressable from "../OpacityPressable.jsx";
import Subheading2 from "../text/Subheading2.jsx";
import { useContext } from "react";
import { ModalContext } from "../modal/ModalContextProvider.jsx";
import ProgressModal from "./ProgressModal.jsx";

export default function ProgressBar({ progress, progressObj, style }) {
    const { setModal } = useContext(ModalContext);

    return (
        <Card style={[styles.container, style]} padding={false}>
            <Subheading2 style={styles.text}>Progress:</Subheading2>
            <View style={styles.barWrapper}>
                <View style={[{ width: `${progress}%` }, styles.barInner]} />
            </View>
            <OpacityPressable
                style={styles.button}
                onPress={() => {
                    setModal(<ProgressModal progressObj={progressObj} />);
                }}
            >
                <Text style={styles.buttonText}>View</Text>
            </OpacityPressable>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    text: {
        marginBottom: 3,
        marginRight: -5,
    },
    barWrapper: {
        flex: 0.85,
        height: 10,
        backgroundColor: Colors.card2,
        borderRadius: 5,
    },
    barInner: {
        height: "100%",
        backgroundColor: Colors.text,
        borderRadius: 5,
    },
    button: {
        padding: 5,
        backgroundColor: Colors.card2,
        borderRadius: 5,
    },
    buttonText: {
        fontFamily: Fonts.main,
        fontSize: 16,
        color: Colors.text,
    },
});
