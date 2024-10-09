import { StyleSheet, Image, View } from "react-native";
import DropdownList from "./DropdownList";
import Checkbox from "./Checkbox";
import OpacityPressable from "../genericButtons/OpacityPressable.jsx";
import Subheading from "../text/Subheading";
import Subheading2 from "../text/Subheading2";
import { useState } from "react";

export default function StudyAndChapterSelector({
    studyObj,
    studyUUIDs,
    chosenChapters,
    chosenStudies,
    setChosenChapters,
    setChosenStudies,
}) {
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

    const [openDropdownList, setOpenDropdownList] = useState([]);

    const handleDropdownPress = (studyUUID) => {
        if (openDropdownList.includes(studyUUID)) {
            setOpenDropdownList(openDropdownList.filter((uuid) => uuid !== studyUUID));
        } else {
            setOpenDropdownList([...openDropdownList, studyUUID]);
        }
    };

    return (
        <>
            {studyUUIDs.map((studyUUID) => {
                return (
                    <View key={studyUUID} style={styles.section}>
                        <DropdownList
                            isDropdownVisible={openDropdownList.includes(studyUUID)}
                            setIsDropdownVisible={() => handleDropdownPress(studyUUID)}
                            topContent={
                                <View style={styles.topContainer}>
                                    <View style={styles.leftContainer}>
                                        <Image
                                            source={iconObj[studyObj[studyUUID].icon]}
                                            style={styles.icon}
                                        />
                                        <Subheading
                                            numberOfLines={1}
                                            ellipsizeMode={"tail"}
                                            style={styles.subheadings}
                                        >
                                            {studyObj[studyUUID].title}
                                        </Subheading>
                                    </View>
                                    <View style={styles.rightContainer}>
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
                                </View>
                            }
                            dropdownContent={
                                <View>
                                    {studyObj[studyUUID].chapters.map((chapter, index) => {
                                        return (
                                            <OpacityPressable
                                                key={chapter.pgn || ""}
                                                style={styles.dropdownContainer}
                                                onPress={() => onChapterPress(studyUUID, index)}
                                            >
                                                <View style={styles.text}>
                                                    <Subheading2
                                                        numberOfLines={1}
                                                        ellipsizeMode={"tail"}
                                                    >
                                                        {chapter.name}
                                                    </Subheading2>
                                                </View>
                                                <Checkbox
                                                    style={styles.checkbox}
                                                    checked={chosenChapters[studyUUID][index]}
                                                    color={Colors.primary}
                                                    onPress={() => onChapterPress(studyUUID, index)}
                                                />
                                            </OpacityPressable>
                                        );
                                    })}
                                </View>
                            }
                            height={50}
                        />
                    </View>
                );
            })}
        </>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        height: 50,
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    rightContainer: {
        marginHorizontal: 10,
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    subheadings: {
        flexShrink: 1,
    },
    dropdownContainer: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        shadowOpacity: 0,
    },
    text: {
        flexShrink: 1,
    },
    textWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    checkbox: {
        marginHorizontal: 30,
    },
});
