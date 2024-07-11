import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../colors";

const StudyAndChapterSelector = ({ studyObj, onStudyClick, onChapterClick, checkboxes }) => {
    return (
        <>
            <Text style={{ color: "white" }}>{JSON.stringify(studyObj)}</Text>
            {Object.keys(studyObj).map((study) => {
                <View style={styles.button}>
                    <TouchableOpacity style={styles.topbar}></TouchableOpacity>
                </View>;
            })}
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "100%",
        borderRadius: 10,
        backgroundColor: Colors.primary,
        borderColor: Colors.primaryBorder,
        borderWidth: 2,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    topbar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        paddingHorizontal: 20,
        height: 60,
    },
});

export default StudyAndChapterSelector;
