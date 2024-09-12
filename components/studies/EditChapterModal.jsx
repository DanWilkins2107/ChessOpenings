import AuthButton from "../auth/AuthButton";
import { View, Text } from "react-native";
import { useContext, useState } from "react";
import { ModalContext } from "../modal/ModalContextProvider";
import Subheading from "../text/Subheading";
import Card from "../containers/Card";
import Body from "../text/Body";
import FormField from "../FormField";
import SecondaryButton from "../genericButtons/SecondaryButton";
import MainButton from "../genericButtons/MainButton";

const EditChapterModal = ({ editNameFunction, deleteChapterFunction, chapterName }) => {
    const { setModal } = useContext(ModalContext);
    const [newName, setNewName] = useState(chapterName);
    const [displayName, setDisplayName] = useState(chapterName);
    return (
        <View>
            <Subheading style={styles.headings}>Editing: {displayName}</Subheading>
            <Card>
                <Body style={styles.headings}>Edit Chapter Name:</Body>
                <FormField
                    value={newName}
                    placeholder={"Name"}
                    onChangeText={setNewName}
                    style={styles.gap}
                />
                <MainButton
                    text="Save Changes"
                    style={styles.button}
                    disabled={newName === displayName}
                    onPress={async () => {
                        editNameFunction(newName);
                        setDisplayName(newName);
                    }}
                />
                <Body style={styles.headings}>Delete Chapter:</Body>
                <SecondaryButton
                    text="Delete Chapter"
                    icon="trash-alt"
                    style={styles.button2}
                    onPress={() => {
                        deleteChapterFunction();
                        setModal(null);
                    }}
                />
            </Card>
        </View>
    );
};

const styles = {
    title: {
        marginBottom: 20,
    },
    headings: {
        marginBottom: 10,
    },
    gap: {
        marginBottom: 10,
    },
    button: {
        marginBottom: 20,
    },
    button2: {
        justifyContent: "center",
    },
};

export default EditChapterModal;
