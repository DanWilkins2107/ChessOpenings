import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../../colors";

const ChapterSelector = ({ chapters, currentChapter, setCurrentChapter }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addChapterBar}>
                <Icon size={20} name="plus" />
                <Text style={styles.addChapterText}>Add Chapter</Text>
            </TouchableOpacity>
            <ScrollView style={styles.scroll}>
                {chapters.map((chapter, index) => {
                    const backgroundColor =
                        index === currentChapter
                            ? Colors.primaryBorder
                            : index % 2 === 0
                            ? "#eeeeee"
                            : "white";
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.chapterBar, { backgroundColor: backgroundColor }]}
                            onPress={() => {
                                setCurrentChapter(index);
                            }}
                        >
                            <View style={styles.leftBarSection}>
                                <View style={styles.numberSection}>
                                    <Text style={styles.numberText}>{index + 1}</Text>
                                </View>
                                <Text style={styles.nameText}>{chapter.name}</Text>
                            </View>
                            <Icon name="eye" size={"30%"} />
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
        backgroundColor: "white",
    },
    addChapterBar: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        height: "20%",
        backgroundColor: "lightgrey",
        alignItems: "center",
        borderBottomWidth: 1,
    },
    addChapterText: {
        marginLeft: 10,
        fontSize: 20,
        color: "black",
        fontWeight: "semibold",
    },
    scroll: {
        backgroundColor: "white",
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
        backgroundColor: "lightgrey",
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
});

export default ChapterSelector;
