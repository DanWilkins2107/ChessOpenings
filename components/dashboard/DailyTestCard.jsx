import Card from "../containers/Card";
import MainButton from "../genericButtons/MainButton";
import Body from "../text/Body";
import Subheading from "../text/Subheading";
import { StyleSheet } from "react-native";

export default function DailyTestCard({ style, buttonPress }) {
    return (
        <Card style={style}>
            <Subheading style={styles.subtitle}>Daily Test: _____</Subheading>
            <Body style={styles.subtitle}>Progress: ________</Body>
            <MainButton text={"Start/Continue Test"} style={styles.button} onPress={buttonPress} />
        </Card>
    );
}

const styles = StyleSheet.create({
    subtitle: {
        marginBottom: 10,
    },
    button: {
        marginVertical: 10,
    },
});
