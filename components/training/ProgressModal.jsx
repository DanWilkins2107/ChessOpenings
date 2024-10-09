import { View, ScrollView, StyleSheet, Pressable, Dimensions } from "react-native";
import Subheading from "../text/Subheading";
import Subheading2 from "../text/Subheading2";
import Card from "../containers/Card";
import { Colors } from "../../styling";
import Body from "../text/Body";
import OpacityPressable from "../genericButtons/OpacityPressable";
import IconFA5 from "react-native-vector-icons/FontAwesome5";
import ProgressBar from "./ProgressBar";
import resetConfidence from "../../functions/test/resetConfidence.js";
import saveTreesToDb from "../../functions/test/saveTreesToDb";
import { useState } from "react";

export default function ProgressModal({
    progressObj,
    whiteCombinedTree,
    blackCombinedTree,
    onReset,
}) {
    const [forceRerender, setForceRerender] = useState(false);
    const handleReset = (study, chapter) => {
        const correctCombinedTree =
            chapter.tree.color === "white" ? whiteCombinedTree : blackCombinedTree;

        resetConfidence(chapter.tree.tree, correctCombinedTree);
        saveTreesToDb(chapter.tree.tree, chapter.UUID);
    };
    const deviceHeight = Dimensions.get("window").height;
    return (
        <View style={{ height: deviceHeight * 0.55 }}>
            <Subheading style={styles.title}>Study Progress</Subheading>
            <ScrollView style={styles.scrollView}>
                <Pressable>
                    {Object.keys(progressObj).map((study) => {
                        return (
                            <Card key={study} style={styles.card}>
                                <Subheading2 style={styles.subheading}>
                                    {progressObj[study].title}
                                </Subheading2>
                                {progressObj[study].chapters.map((chapter, index) => {
                                    return (
                                        <View style={styles.line} key={chapter.UUID}>
                                            <Body>
                                                {chapter.title} - {chapter.score}%
                                            </Body>
                                            <View style={styles.row}>
                                                <ProgressBar
                                                    progress={chapter.score}
                                                    style={styles.bar}
                                                    key={chapter.UUID + String(forceRerender)}
                                                />
                                                <OpacityPressable
                                                    style={styles.reset}
                                                    onPress={() => {
                                                        handleReset(study, chapter);
                                                        onReset();
                                                        progressObj[study].chapters[
                                                            index
                                                        ].score = 0;
                                                        setForceRerender(!forceRerender);
                                                    }}
                                                >
                                                    <IconFA5
                                                        name="undo-alt"
                                                        size={15}
                                                        color={Colors.text}
                                                    />
                                                </OpacityPressable>
                                            </View>
                                        </View>
                                    );
                                })}
                            </Card>
                        );
                    })}
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card2,
        marginBottom: 20,
    },
    title: {
        marginBottom: 10,
    },
    subheading: {
        marginBottom: 5,
    },
    scrollView: {
        flex: 1,
    },
    container: {
        // height: "90%",
    },
    line: {
        width: "100%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
    },
    reset: {
        backgroundColor: Colors.card3,
        width: 40,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    bar: {
        backgroundColor: Colors.card3,
    },
});
