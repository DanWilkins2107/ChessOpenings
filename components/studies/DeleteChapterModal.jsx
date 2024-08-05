import AuthButton from "../auth/AuthButton";
import { View, Text } from "react-native";
import { useContext } from "react";
import { ModalContext } from "../modal/ModalContextProvider";

const DeleteChapterModal = ({ deleteChapterFunction, chapterName }) => {
    const { setModal } = useContext(ModalContext);
    return (
        <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure you want to delete {chapterName}?</Text>
            <View style={styles.buttonContainer}>
                <AuthButton
                    title="Delete Chapter"
                    onPress={() => {
                        deleteChapterFunction();
                        setModal(null);
                    }}
                />
            </View>
        </View>
    );
};

const styles = {
    modalContainer: {
        alignItems: "center",
        padding: 10,
    },
    modalText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    buttonContainer: {
        marginTop: 10,
    },
};

export default DeleteChapterModal;
