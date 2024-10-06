import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import Title from "../text/Title";
import Subheading from "../text/Subheading";
import Subheading2 from "../text/Subheading2";
import Card from "../containers/Card";
import { Colors } from "../../styling";
import Body from "../text/Body";
import OpacityPressable from "../OpacityPressable";
import IconFA5 from "react-native-vector-icons/FontAwesome5";
import ProgressBar from "./ProgressBar";

export default function ProgressModal({ progressObj }) {
    const handleReset = () => {
        console.log("TODO: reset");
    }
    return (
        <View style={styles.container}>
            <Subheading style={styles.title}>Study Progress</Subheading>
            <ScrollView style={styles.scrollView}>
                <Pressable>
                    {Object.keys(progressObj).map((study) => {
                        return (
                            <Card key={study} style={styles.card}>
                                <Subheading2 style={styles.subheading}>{progressObj[study].title}</Subheading2>
                                {progressObj[study].chapters.map((chapter) => {
                                    return (
                                        <View style={styles.line} key={chapter.UUID}>
                                            <Body>
                                                {chapter.title} - {chapter.score}%
                                            </Body>
                                            <View style={styles.row}>
                                                <ProgressBar progress={chapter.score} style={styles.bar} />
                                                <OpacityPressable style={styles.reset}>
                                                    <IconFA5 name="undo-alt" size={15} color={Colors.text} />
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
        height: "95%",
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
    }
});
