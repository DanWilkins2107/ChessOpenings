import { View, Text, StyleSheet } from "react-native";

const StudyOptions = ({study}) => {
    return (
        <View style={styles.container}>
            <Text>Study Name</Text>

            <Text>This chapter is for:</Text>

            <View style={styles.sideChooserContainer}></View>

            <Text>Delete Study</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    sideChooserContainer: {
        width: "80%",
        height: "20%",
    },
});

export default StudyOptions;
