import { StyleSheet, Text, View } from "react-native";
import Subheading from "../text/Subheading";
import Body from "../text/Body";
import SecondaryButton from "../genericButtons/SecondaryButton";

export default function LichessChapterModal({ onChapterPress, onStudyPress }) {
    return (
        <View>
            <Subheading style={styles.text}>Oops...</Subheading>
            <Body style={styles.text}>
                Looks like you entered the URL for a specific chapter of a study.
            </Body>
            <Body>Do you want to import the whole study or just the one chapter?</Body>
            <SecondaryButton style={styles.button} text="Import whole study" onPress={onStudyPress}/>
            <SecondaryButton style={styles.button} text="Import single chapter" onPress={onChapterPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
});
