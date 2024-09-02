import { StyleSheet, View, Text, Image } from "react-native";
import Card from "../containers/Card";
import Subheading2 from "../text/Subheading2";
import Body from "../text/Body";
import OpacityPressable from "../OpacityPressable";
import { Colors } from "../../styling";

export default function StudyButton({ study, onPress }) {
    const name = study.title || "Unnamed Study";
    const chapterNumber = study.chapters.length || 0;
    const chapterString = chapterNumber === 1 ? "Chapter" : "Chapters";

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
        <OpacityPressable style={styles.pressable} onPress={onPress}>
            <Image source={iconObj[study.icon]} style={styles.icon} />
            <View style={styles.contentContainer}>
                <Subheading2 numberOfLines={1}>{name}</Subheading2>
                <Body>
                    {chapterNumber} {chapterString}
                </Body>
            </View>
        </OpacityPressable>
    );
}

const styles = StyleSheet.create({
    pressable: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        width: "100%",
        height: 70,
        backgroundColor: Colors.card2,
    },
    icon: {
        width: 50,
        height: 50,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        marginLeft: 10,
    },
    text: {
        flexShrink: 1,
    },
});
