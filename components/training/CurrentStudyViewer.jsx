import { View, Text, StyleSheet } from "react-native";
import Card from "../containers/Card";
import { Colors, Fonts } from "../../styling";
import OpacityPressable from "../genericButtons/OpacityPressable";
import IconFA5 from "react-native-vector-icons/FontAwesome5";

const CurrentStudyViewer = ({ study, chapter, style, isShown }) => {
    return (
        <Card style={style}>
            <Text style={styles.text}>Current Study: {isShown ? study : "hidden"}</Text>
            <Text style={styles.text}>Current Chapter: {isShown ? chapter : "hidden"}</Text>
            <View style={styles.container}>
                <OpacityPressable style={styles.button}>
                    <IconFA5 name="eye" size={30} color={Colors.text} />
                </OpacityPressable>
                <OpacityPressable style={styles.button}>
                    <IconFA5 name="bolt" size={26} color={Colors.text} />
                </OpacityPressable>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
    },
    text: {
        fontFamily: Fonts.main,
        fontSize: 18,
        color: Colors.text,
        marginBottom: 5,
    },
    button: {
        backgroundColor: Colors.card2,
        height: 40,
        width: 88,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        borderRadius: 5,
        marginTop: 5,
    },
});

export default CurrentStudyViewer;
