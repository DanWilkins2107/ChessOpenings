import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import Colors from "../../colors";

const StudyPicker = ({ title, chapterArray, onStudyPress, onChapterPress, children }) => {
    const [chaptersShown, setChaptersShown] = useState(false);
    return (
        <View style={styles.button}>
            {/* <Text>{title}</Text>
        <Text>{icon}</Text>
        <Text>{JSON.stringify(chapterArray, null, 2)}</Text> */}
            <TouchableOpacity
                style={styles.topbar}
                onPress={() => setChaptersShown(!setChaptersShown)}
            >
                {children}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 60,
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
    },
});

export default StudyPicker;
