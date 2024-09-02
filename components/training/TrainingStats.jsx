import Card from "../containers/Card";

import Body from "../text/Body";
import Subheading from "../text/Subheading";
import { StyleSheet } from "react-native";
import Subheading2 from "../text/Subheading2";
import { Colors } from "../../styling";

export default function TrainingStats({ style }) {
    return (
        <Card style={style}>
            <Subheading style={styles.subtitle}>Your Training Stats</Subheading>
            <Body>Daily Tests Finished: ___</Body>
            <Body>Total Moves Trained: ___</Body>
            <Body>Average Daily Test Score: ___</Body>
            <Body>Daily Streak: ____</Body>

            <Subheading2 style={styles.statsSection}>This Week:</Subheading2>
            <Card style={styles.statsTable}></Card>
        </Card>
    );
}

const styles = StyleSheet.create({
    subtitle: {
        marginBottom: 10,
    },
    statsSection: {
        marginTop: 20,
        marginBottom: 10,
    },
    statsTable: {
        backgroundColor: Colors.card2,
    },
});
