import React from "react";
import { StyleSheet } from "react-native";
import IconFA5 from "react-native-vector-icons/FontAwesome5";
import Card from "../containers/Card";
import OpacityPressable from "../OpacityPressable";
import { Colors } from "../../styling";

const NavigationButton = ({ icon, onPress }) => {
    return (
        <OpacityPressable style={styles.button} onPress={onPress}>
            <IconFA5 name={icon} size={25} color={Colors.text} />
        </OpacityPressable>
    );
};

const Navigation = ({
    onDoubleLeftPress,
    onLeftPress,
    onFlipPress,
    onRightPress,
    onDoubleRightPress,
}) => {
    return (
        <Card style={styles.container} padding={false}>
            <NavigationButton icon="angle-double-left" onPress={onDoubleLeftPress} />
            <NavigationButton icon="angle-left" onPress={onLeftPress} />
            <NavigationButton icon="retweet" onPress={onFlipPress} />
            <NavigationButton icon="angle-right" onPress={onRightPress} />
            <NavigationButton icon="angle-double-right" onPress={onDoubleRightPress} />
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 5,
        height: 50,
    },
    button: {
        backgroundColor: Colors.card2,
        flex: 1,
        marginHorizontal: 5,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
});

export default Navigation;
