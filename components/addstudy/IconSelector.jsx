import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image, Modal, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const SelectIcon = ({ selectedIcon, onSelectIcon }) => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const icons = [
        require("./icons/wb.png"),
        require("./icons/wr.png"),
        require("./icons/wn.png"),
        require("./icons/wq.png"),
        require("./icons/wk.png"),
        require("./icons/wp.png"),
        require("./icons/bb.png"),
        require("./icons/br.png"),
        require("./icons/bn.png"),
        require("./icons/bq.png"),
        require("./icons/bk.png"),
        require("./icons/bp.png"),
    ];

    const handlePress = () => {
        setIsModalVisible(true);
    };

    const handleSelect = (icon) => {
        onSelectIcon(icon);
        setIsModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftRectangle}>
                {selectedIcon && <Image source={selectedIcon} style={styles.icon} />}
                {!selectedIcon && <Text>Choose Icon</Text>}
            </View>
            <TouchableOpacity style={styles.rightRectangle} onPress={handlePress}>
                <Icon name={isModalVisible ? "times" : "plus"} size={30} color="#000" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
    },
    leftRectangle: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    rightRectangle: {
        width: 50,
        height: 80,
        borderRadius: 10,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },
    icon: {
        width: 50,
        height: 50,
    },
    modal: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: 300,
        height: 300,
        position: "absolute",
        zIndex: 5,
    },
});

export default SelectIcon;
