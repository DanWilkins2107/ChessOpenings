import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../../colors";

const NavigationButton = ({ icon, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Icon name={icon} size={20} color="white" />
        </TouchableOpacity>
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
        <View style={styles.container}>
            <NavigationButton icon="angle-double-left" onPress={onDoubleLeftPress} />
            <NavigationButton icon="angle-left" onPress={onLeftPress} />
            <NavigationButton icon="retweet" onPress={onFlipPress} />
            <NavigationButton icon="angle-right" onPress={onRightPress} />
            <NavigationButton icon="angle-double-right" onPress={onDoubleRightPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    button: {
        backgroundColor: Colors.primary,
        border: "solid",
        borderWidth: 2,
        borderColor: Colors.primaryBorder,
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Navigation;
