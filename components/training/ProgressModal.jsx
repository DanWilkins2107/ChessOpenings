import { View, ScrollView, StyleSheet } from "react-native";
import Title from "../text/Title";
import Subheading2 from "../text/Subheading2";
import Card from "../containers/Card";
import { Colors } from "../../styling";
import Body from "../text/Body";

export default function ProgressModal(progressObj) {
    return (
        <View>
            <Title style={styles.title}>Study Progress</Title>
            <ScrollView>
                <Card style={styles.card}>
                    <Subheading2 style={styles.subheading}>StudyNaME</Subheading2>
                    <Body>ChapterNAME</Body>
                    <Body>ChapterNAeme1</Body>
                </Card>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card2,
    },
    title: {
        marginBottom: 10,
    },
    subheading: {
        marginBottom: 5,
    },
});
