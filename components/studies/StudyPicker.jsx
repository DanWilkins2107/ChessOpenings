import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../colors";
import Icon from "react-native-vector-icons/FontAwesome";

const StudyPicker = ({ UUID, title, onStudyPress, chapters, children }) => {
    return (
        <View style={styles.button}>
            <TouchableOpacity style={styles.topbar} onPress={() => onStudyPress(UUID)}>
                <View style={styles.section}>
                    <View style={styles.imageWrapper}>{children}</View>
                    <View style={styles.column}>
                      <Text style={styles.title}>{title}</Text>
                      <Text style={styles.text}>
                          {JSON.stringify(chapters.length)} chapter{chapters.length === 1 ? "" : "s"}
                      </Text>
                    </View>
                </View>
                <View style={styles.iconHolder}> 
                  <Icon name="caret-right" size={30} color="#fff" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 100,
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
        width: "100%",
        height: "100%",
        paddingLeft: 10,
        paddingRight: 20,
        justifyContent: "space-between",
    },
    imageWrapper: {
        width: 80,
        height: 80,
        borderRadius: 10,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        marginLeft: 10,
        fontWeight: "semibold", 
        color: "#fff",

    },
    text: {
        fontSize: 20,
        color: "#fff",
        marginLeft: 10,
    },
    section: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    column: {
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "space-between",
        paddingVertical: 10,
        height: "100%",
    },
    iconHolder: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default StudyPicker;
