import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconF from "react-native-vector-icons/Feather";
import OpacityPressable from "../genericButtons/OpacityPressable";
import { Colors } from "../../styling";


const TabSelector = ({ setSelectedTab, selectedTab }) => {
    return (
        <View style={styles.container}>
            <OpacityPressable onPress={() => setSelectedTab(0)} style={styles.tabInner}>
                <Icon
                    name="sitemap"
                    size={20}
                    color={selectedTab === 0 ? Colors.text : Colors.background}
                />
            </OpacityPressable>
            <OpacityPressable style={styles.tabInner} onPress={() => setSelectedTab(1)}>
                <Icon
                    name="book"
                    size={20}
                    color={selectedTab === 1 ? Colors.text : Colors.background}
                />
            </OpacityPressable>
            <OpacityPressable style={styles.tabInner} onPress={() => setSelectedTab(2)}>
                <IconF
                    name="cpu"
                    size={20}
                    color={selectedTab === 2 ? Colors.text : Colors.background}
                />
            </OpacityPressable>
            <OpacityPressable style={styles.tabInner} onPress={() => setSelectedTab(3)}>
                <Icon
                    name="th-list"
                    size={20}
                    color={selectedTab === 3 ? Colors.text : Colors.background}
                />
            </OpacityPressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: 50,
    },
    tabInner: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.card2,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 5,
        height: 40,
        flex: 1,
    },
});

export default TabSelector;
