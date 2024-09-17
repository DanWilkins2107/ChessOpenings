import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../styling";
import OpacityPressable from "../OpacityPressable";

const DropdownList = ({
    topContent,
    dropdownContent,
    height = 40,
    isDropdownVisible,
    setIsDropdownVisible,
}) => {

    const handlePress = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    return (
        <View style={styles.view}>
            <OpacityPressable
                style={[styles.container, { height: height }]}
                onPress={handlePress}
                shadow={false}
            >
                {topContent}
                <Icon name="caret-down" size={30} color={Colors.background} />
            </OpacityPressable>
            {isDropdownVisible && (
                <ScrollView style={styles.dropdown}>{dropdownContent}</ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        shadowColor: "#000000",
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
    },
    container: {
        width: "100%",
        backgroundColor: Colors.card2,
        justifyContent: "space-between",
        alignItems: "center",
        height: 40,
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    dropdown: {
        width: "100%",
        maxHeight: 500,
        backgroundColor: Colors.card2,
        marginBottom: 5,
    },
});

export default DropdownList;
