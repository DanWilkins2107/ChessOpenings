import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import Colors from "../../colors";
import DropdownList from "./DropdownList";
import Checkbox from "./Checkbox";
import LineSeparator from "../auth/LineSeparator";

const StudyAndChapterSelector = ({
    studyObj,
    studyUUIDs,
    chosenChapters,
    chosenStudies,
    setChosenChapters,
    setChosenStudies,
}) => {
    const iconObj = {
        wb: require("../../assets/icons/wb.png"),
        wr: require("../../assets/icons/wr.png"),
        wn: require("../../assets/icons/wn.png"),
        wq: require("../../assets/icons/wq.png"),
        wk: require("../../assets/icons/wk.png"),
        wp: require("../../assets/icons/wp.png"),
        bb: require("../../assets/icons/bb.png"),
        br: require("../../assets/icons/br.png"),
        bn: require("../../assets/icons/bn.png"),
        bq: require("../../assets/icons/bq.png"),
        bk: require("../../assets/icons/bk.png"),
        bp: require("../../assets/icons/bp.png"),
    };

    const onChapterPress = (studyUUID, chapterIndex) => {
        const newChosenChapters = { ...chosenChapters };
        newChosenChapters[studyUUID][chapterIndex] = !newChosenChapters[studyUUID][chapterIndex];
        setChosenChapters(newChosenChapters);
    };
    return (
        <>
            {studyUUIDs.map((studyUUID, index) => {
                return (
                    <View style={styles.innerContainer} key={studyUUID}>
                        <DropdownList
                            topContent={
                                <View style={styles.container}>
                                    <View style={styles.leftContainer}>
                                        <Image
                                            source={iconObj[studyObj[studyUUID].icon]}
                                            style={styles.icon}
                                        />
                                        <Text style={styles.text}>{studyObj[studyUUID].title}</Text>
                                    </View>
                                    <Checkbox
                                        style={styles.checkbox}
                                        checked={chosenStudies[studyUUID]}
                                        onPress={() => {
                                            setChosenChapters({
                                                ...chosenChapters,
                                                [studyUUID]: chosenChapters[studyUUID].map(
                                                    () => !chosenStudies[studyUUID]
                                                ),
                                            });
                                            setChosenStudies({
                                                ...chosenStudies,
                                                [studyUUID]: !chosenStudies[studyUUID],
                                            });
                                        }}
                                    />
                                </View>
                            }
                            dropdownContent={
                                <View>
                                    {(studyObj[studyUUID] || {}).chapters.map((chapter, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={chapter.pgn}
                                                style={styles.dropdownContainer}
                                                onPress={() => onChapterPress(studyUUID, index)}
                                            >
                                                <Text style={styles.text}>{chapter.name}</Text>
                                                <Checkbox
                                                    style={styles.checkbox}
                                                    checked={chosenChapters[studyUUID][index]}
                                                    color={Colors.primary}
                                                    onPress={() => onChapterPress(studyUUID, index)}
                                                />
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            }
                        />
                        {index != studyUUIDs.length - 1 &&<LineSeparator text="" />}
                    </View>
                );
            })}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%",
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        color: "#fff",
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    checkbox: {
        width: 10,
        height: 30,
        borderRadius: 5,
        padding: 5,
    },
    dropdownContainer: {
        padding: 10,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    innerContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default StudyAndChapterSelector;
