import { Text, StyleSheet, View } from "react-native";
import OpacityPressable from "../genericButtons/OpacityPressable";
import Body from "../text/Body";
import { Colors } from "../../styling";
import ResultBar from "./ResultBar";
import Subheading2 from "../text/Subheading2";

export default function OpeningMove({ moveObj, index, onPress }) {
    return (
        <OpacityPressable
            shadow={false}
            style={[styles.row, index % 2 === 0 && styles.otherColor]}
            onPress={() => {
                onPress(moveObj.san);
            }}
        >
            <View style={styles.textWrapper}>
                <Body>{moveObj.san}</Body>
            </View>
            <ResultBar white={moveObj.white} draws={moveObj.draws} black={moveObj.black} />
            <View style={styles.numberWrapper}>
                <Body>{moveObj.white + moveObj.draws + moveObj.black}</Body>
            </View>
        </OpacityPressable>
    );
}

const styles = StyleSheet.create({
    row: {
        width: "100%",
        height: 40,
        justifyContent: "center",
        paddingHorizontal: 10,
        flexDirection: "row",
    },
    textWrapper: {
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        width: 80,
    },
    numberWrapper: {
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
        width: 80,
    },
    otherColor: {
        backgroundColor: Colors.card2,
    },
});
