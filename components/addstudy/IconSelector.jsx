import { StyleSheet, Text, Image, View, ScrollView } from "react-native";
import OpacityPressable from "../OpacityPressable";
import DropdownList from "../chooseStudy/DropdownList";
import { Colors, Fonts } from "../../styling";
import { useState } from "react";

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

    const handleSelect = (icon) => {
        setSelectedIcon(icon);
        handlePress();
    };

    const handlePress = () => {
        setIsDropdownVisible(!isDropdownVisible);
    }

    return (
        <DropdownList
            isDropdownVisible={isDropdownVisible}
            setIsDropdownVisible={handlePress}
            topContent={
                <View>
                    {selectedIcon && (
                        <View style={styles.chosen}>
                            <Text style={styles.text}>Selected Icon:</Text>
                            <Image source={iconObj[selectedIcon]} style={styles.selectedIcon} />
                        </View>
                    )}
                    {!selectedIcon && <Text style={styles.text}>Choose Icon</Text>}
                </View>
            }
            dropdownContent={
                <ScrollView>
                    <View style={styles.dropdownInner}>
                        {Object.keys(iconObj).map((icon) => (
                            <OpacityPressable
                                style={styles.iconContainer}
                                key={icon}
                                onPress={() => handleSelect(icon)}
                                shadow={false}
                            >
                                <Image source={iconObj[icon]} style={styles.icon} />
                            </OpacityPressable>
                        ))}
                    </View>
                </ScrollView>
            }
            height={50}
        />
    );
};

const styles = StyleSheet.create({
    chosen: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 40,
        height: 40,
    },
    selectedIcon: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
    text: {
        fontSize: 16,
        color: Colors.text,
        fontFamily: Fonts.main,
    },
    dropdownInner: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
    },
    iconContainer: {
        width: "16%",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default SelectIcon;
