import { StyleSheet, Text, Image, View } from "react-native";
import Colors from "../../colors";
import DropdownList from "./DropdownList";
import Checkbox from "./Checkbox";

const StudyAndChapterSelector = ({
    studyObj,
    studyUUIDs,
    onStudyClick,
    onChapterClick,
    checkboxInfo,
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
    return (
        <>
            {studyUUIDs.map((studyUUID) => {
                return (
                    <View style={styles.innerContainer}>
                        <DropdownList key={studyUUID}
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
                                        checked={true}
                                        onPress={() => {}}
                                        color={Colors.primary}
                                    />
                                </View>
                            }
                            dropdownContent={
                                <View>
                                    {(studyObj[studyUUID] || {}).chapters.map((chapter) => {
                                        return (
                                            <View key={chapter.uuid} style={styles.dropdownContainer}>
                                                <Text style={styles.text}>{chapter.name}</Text>
                                                <Checkbox
                                                    style={styles.checkbox}
                                                    checked={true}
                                                    color={Colors.primary}
                                                    onPress={() => {}}
                                                />
                                            </View>
                                        );
                                    })}
                                </View>
                            }
                        />
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
        marginBottom: 10,
    },
});

export default StudyAndChapterSelector;
