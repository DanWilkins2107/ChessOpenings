import { View, StyleSheet, Text } from "react-native";
import { Colors, Fonts } from "../../styling.js";
import Card from "../containers/Card.jsx";
import OpacityPressable from "../genericButtons/OpacityPressable";
import Subheading2 from "../text/Subheading2.jsx";
import { useContext } from "react";
import { ModalContext } from "../modal/ModalContextProvider.jsx";
import ProgressModal from "./ProgressModal.jsx";
import ProgressBar from "./ProgressBar.jsx";

export default function BottomProgressBar({
    progress,
    progressObj,
    style,
    whiteCombinedTree,
    blackCombinedTree,
    onReset,
}) {
    const { setModal } = useContext(ModalContext);

    return (
        <Card style={[styles.container, style]} padding={false}>
            <Subheading2 style={styles.text}>Progress:</Subheading2>
            <ProgressBar progress={progress} />
            <OpacityPressable
                style={styles.button}
                onPress={() => {
                    setModal(
                        <ProgressModal
                            progressObj={progressObj}
                            whiteCombinedTree={whiteCombinedTree}
                            blackCombinedTree={blackCombinedTree}
                            onReset={onReset}
                        />
                    );
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
        paddingHorizontal: 10,
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
