import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Card from "../containers/Card";
import OpacityPressable from "../genericButtons/OpacityPressable";
import Body from "../text/Body";
import { Colors } from "../../styling";

const ChooseSide = ({ side, setSide, style }) => {
    return (
        <Card style={[styles.container, style]} padding={false}>
            <View style={styles.colorToggleContainer}>
                <OpacityPressable
                    style={[styles.button, side === "white" && styles.selected]}
                    shadow={false}
                    onPress={() => {
                        setSide("white");
                    }}
                >
                    <Image source={require("../../assets/icons/wk.png")} style={styles.icon} />
                    <Body style={styles.text}>White</Body>
                </OpacityPressable>
                <OpacityPressable
                    style={[styles.button, side === "black" && styles.selected]}
                    shadow={false}
                    onPress={() => {
                        setSide("black");
                    }}
                >
                    <Image source={require("../../assets/icons/bk.png")} style={styles.icon} />
                    <Body style={styles.text}>Black</Body>
                </OpacityPressable>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        height: 50,
        paddingVertical: 5,
        backgroundColor: Colors.card2,
    },
    colorToggleContainer: {
        flexDirection: "row",
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    text: {
        marginLeft: 5,
    },
    icon: {
        width: 20,
        height: 20,
    },
    selected: {
        backgroundColor: Colors.card1,

        shadowColor: "#000000",
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
    },
});

export default ChooseSide;
