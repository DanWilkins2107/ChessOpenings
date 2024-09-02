import Card from "../containers/Card";
import MainButton from "../genericButtons/MainButton";
import SecondaryButton from "../genericButtons/SecondaryButton";
import Body from "../text/Body";
import Subheading from "../text/Subheading";
import { StyleSheet } from "react-native";

export default function TrainingCard({ style, trainAllPress, chooseTrainPress }) {
    return (
        <Card style={style}>
            <Subheading style={styles.subtitle}>Your Training</Subheading>
            <Body>You have completed __ moves today, well done! Want to do more?</Body>
            <MainButton text="Train All Studies" style={styles.button} onPress={trainAllPress} />
            <Body>Need to focus on a specific opening?</Body>
            <SecondaryButton
                text="Choose Studies to Train"
                style={styles.secondButton}
                onPress={chooseTrainPress}
            />
        </Card>
    );
}

const styles = StyleSheet.create({
    subtitle: {
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        marginBottom: 20,
    },
    secondButton: {
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});
