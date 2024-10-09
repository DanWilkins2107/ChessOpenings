import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../styling.js";
import { useContext } from "react";
import { ModalContext } from "../modal/ModalContextProvider.jsx";
import AddChapterModal from "./AddChapterModal.jsx";
import EditChapterModal from "./EditChapterModal.jsx";
import Subheading from "../text/Subheading.jsx";
import Body from "../text/Body.jsx";

const ChapterSelector = ({
    chapters,
    currentChapter,
    setCurrentChapter,
    addChapterFunction,
    editChapterFunction,
    deleteChapterFunction,
}) => {
    const { setModal } = useContext(ModalContext);
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.addChapterBar}
                onPress={() =>
                    setModal(<AddChapterModal addChapterFunction={addChapterFunction} />)
                }
            >
                <Icon size={20} name="plus" color={Colors.background} />
                <Subheading style={styles.addChapterText}>Add Chapter</Subheading>
            </TouchableOpacity>
            <ScrollView style={styles.scroll}>
                {chapters?.map((chapter, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.chapterBar,
                                index === currentChapter && { backgroundColor: Colors.card2 },
                            ]}
                            onPress={() => {
                                setCurrentChapter(index);
                            }}
                        >
                            <View style={styles.leftBarSection}>
                                <Body style={styles.numberText}>
                                    {index + 1}. {chapter.name}
                                </Body>
                            </View>

                            <View style={styles.iconContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setModal(
                                            <EditChapterModal
                                                editNameFunction={(newName) =>
                                                    editChapterFunction(newName, index)
                                                }
                                                deleteChapterFunction={() =>
                                                    deleteChapterFunction(index)
                                                }
                                                chapterName={chapter.name}
                                            />
                                        );
                                    }}
                                    style={styles.iconButton}
                                >
                                    <Icon name="pencil" size={20} color={Colors.text} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flex: 1,
    },
    addChapterBar: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        height: 40,
        backgroundColor: Colors.primaryButton,
        alignItems: "center",
    },
    addChapterText: {
        marginLeft: 10,
        color: Colors.background,
    },
    scroll: {
        flex: 1,
    },
    chapterBar: {
        width: "100%",
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    numberSection: {
        height: "70%",
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
    },
    numberText: {
        fontWeight: "600",
    },
    nameText: {
        marginLeft: 10,
        fontWeight: "600",
    },
    leftBarSection: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        width: 40,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ChapterSelector;
