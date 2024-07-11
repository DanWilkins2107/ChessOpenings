import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, Image, View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../../colors";

const SelectIcon = ({ selectedIcon, setSelectedIcon }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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

    const handlePress = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleSelect = (icon) => {
        setSelectedIcon(icon);
        setIsDropdownVisible(false);
    };

    return (
        <View style={styles.button}>
            <TouchableOpacity style={styles.topbar} onPress={handlePress}>
                {selectedIcon && (
                    <View style={styles.chosen}>
                        <Text style={styles.text}>Chosen Icon:</Text>
                        <View style={{ width: 10 }} />
                        <Image source={iconObj[selectedIcon]} style={styles.icon} />
                    </View>
                )}
                {!selectedIcon && <Text style={styles.text}>Choose Icon</Text>}
                <Icon name="caret-down" size={30} color="#fff" />
            </TouchableOpacity>
            {isDropdownVisible && (
                <ScrollView style={styles.dropdown}>
                    <View style={styles.dropdownInner}>
                        {Object.keys(iconObj).map((icon) => (
                            <TouchableOpacity
                                style={styles.iconContainer}
                                key={icon}
                                onPress={() => handleSelect(icon)}
                            >
                                <Image source={iconObj[icon]} style={styles.icon} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            )}
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
    chosen: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 40,
        height: 40,
    },
    text: {
        fontSize: 20,
        color: "#fff",
    },
    dropdown: {
        width: "100%",
        maxHeight: 200,
    },
    dropdownInner: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    iconContainer: {
        width: "16%",
        justifyContent: "center",
        paddingVertical: 10,
    },
});

export default SelectIcon;
