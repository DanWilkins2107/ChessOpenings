import { View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../colors";
import Icon from "react-native-vector-icons/FontAwesome";

const TabSelector = ({ setSelectedTab, selectedTab }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => setSelectedTab(0)}
                style={[
                    styles.tabInner,
                    selectedTab === 0 && { backgroundColor: Colors.primaryBorder },
                ]}
            >
                <Icon name="tree" size={20} color={selectedTab === 0 ? "black" : "white"} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.tabInner,
                    selectedTab === 1 && { backgroundColor: Colors.primaryBorder },
                ]}
                onPress={() => setSelectedTab(1)}
            >
                <Icon name="location-arrow" size={20} color={selectedTab === 1 ? "black" : "white"} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.tabInner,
                    selectedTab === 2 && { backgroundColor: Colors.primaryBorder },
                ]}
                onPress={() => setSelectedTab(2)}
            >
                <Icon name="th-list" size={20} color={selectedTab === 2 ? "black" : "white"} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.tabInner,
                    selectedTab === 3 && { backgroundColor: Colors.primaryBorder },
                ]}
                onPress={() => setSelectedTab(3)}
            >
                <Icon name="gear" size={20} color={selectedTab === 3 ? "black" : "white"} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: 40,
        backgroundColor: Colors.primary,
        borderWidth: 2,
        borderColor: Colors.primaryBorder,
    },
    tabInner: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default TabSelector;
