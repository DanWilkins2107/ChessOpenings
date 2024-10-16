import { View, StyleSheet } from "react-native";
import Subheading from "../text/Subheading";
import Subheading2 from "../text/Subheading2";
import SecondaryButton from "../genericButtons/SecondaryButton";
import Card from "../containers/Card";
import Body from "../text/Body";

export default function MoveOptionsModal({ move, onDelete }) {
    return (
        <View>
            <Subheading style={styles.title}>Move Options</Subheading>
            <Subheading2 style={styles.subheading}>Move: {move}</Subheading2>
            <Card>
                <Body style={styles.deleteText}>
                    Deleting a move will delete all following moves and variations.
                </Body>
                <SecondaryButton
                    style={styles.deleteButton}
                    text="Delete Move"
                    onPress={onDelete}
                    icon="trash-alt"
                />
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 10,
    },
    deleteButton: {
        alignItems: "center",
        justifyContent: "center",
    },
    deleteText: {
        marginBottom: 10,
    },
    title: {
        marginBottom: 10,
    },
    subheading: {
        marginBottom: 10,
    },
});
