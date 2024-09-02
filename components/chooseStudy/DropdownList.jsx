import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../styling";
import Card from "../containers/Card";
import OpacityPressable from "../OpacityPressable";

const DropdownList = ({ topContent, dropdownContent }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handlePress = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    return (
        <View>
            <OpacityPressable style={styles.container} onPress={handlePress}>
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
    container: {
        width: "100%",
        backgroundColor: Colors.card2,
        justifyContent: "space-between",
        alignItems: "center",
        height: 50,
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
