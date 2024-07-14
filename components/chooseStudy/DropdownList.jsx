import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../../colors";

const DropdownList = ({ topContent, dropdownContent }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handlePress = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    return (
        <View style={styles.button}>
            <TouchableOpacity style={styles.topbar} onPress={handlePress}>
                {topContent}
                <Icon name="caret-down" size={30} color="#fff" />
            </TouchableOpacity>
            {isDropdownVisible && <ScrollView style={styles.dropdown}>{dropdownContent}</ScrollView>}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "100%",
        borderRadius: 10,
        backgroundColor: Colors.primary,
        borderColor: Colors.primaryBorder,
        borderWidth: 2,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    topbar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        paddingHorizontal: 20,
        height: 60,
    },
    dropdown: {
        width: "100%",
        maxHeight: 200,
    },
});

export default DropdownList;


