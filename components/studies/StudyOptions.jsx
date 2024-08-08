import { View, Text, StyleSheet, ScrollView } from "react-native";
import ChooseSide from "../addstudy/ChooseSide";

const StudyOptions = ({study}) => {
    const handleSetSide = (side) => {
        // IMPLEMENT
    };
    
    return (
        <ScrollView style={styles.container}>
            <Text>Study Name</Text>

            <Text>This chapter is for:</Text>

            <ChooseSide side={study.color} setSide={handleSetSide} />

            <Text>Delete Study</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    sideChooserContainer: {
        width: "80%",
        height: "20%",
    },
});

export default StudyOptions;
