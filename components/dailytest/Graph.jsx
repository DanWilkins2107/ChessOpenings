import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";

const Graph = ({ data }) => {
    return (
        <View style={styles.graphContainer}>
            <View style={styles.graphAxes}>
                {data.map((day, index) => {
                    return (
                        <View style={styles.axisHolder} key={index}>
                            <LinearGradient
                                colors={["#00ff00", "#008000"]}
                                style={[
                                    {
                                        height: `${10 * data[index]["green"]}%`,
                                        position: "absolute",
                                        bottom: "0%",
                                    },
                                    styles.bar,
                                ]}
                            ></LinearGradient>
                            <LinearGradient
                                colors={["#ff0000", "#800000"]}
                                style={[
                                    {
                                        height: `${10 * data[index]["red"]}%`,
                                        position: "absolute",
                                        bottom: `${10 * data[index]["green"]}%`,
                                    },
                                    styles.bar,
                                ]}
                            ></LinearGradient>
                        </View>
                    );
                })}
            </View>
            <View style={styles.leftAxis}>
                {[10, 8, 6, 4, 2, 0].map((value) => {
                    return (
                        <View key={value} style={styles.axisHolder}>
                            <Text style={styles.leftAxisText}>{value}</Text>
                        </View>
                    );
                })}
            </View>
            <View style={styles.bottomAxis}>
                {data.map((day, index) => {
                    return (
                        <View key={index} style={styles.axisHolder}>
                            <Text style={styles.leftAxisText}>{day.day[0]}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    graphContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        height: 200,
        width: "100%",
    },
    graphAxes: {
        width: "90%",
        height: "80%",
        backgroundColor: "transparent",
        position: "absolute",
        top: "10%",
        right: 0,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: "white",
        borderStyle: "solid",
        display: "flex",
        flexDirection: "row",
    },
    leftAxis: {
        width: "10%",
        height: "96%",
        display: "flex",
        position: "absolute",
        left: 0,
        top: "2%",
    },
    axisHolder: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    leftAxisText: {
        textAlign: "center",
        fontWeight: "bold",
        color: "#fff",
    },
    bottomAxis: {
        width: "90%",
        height: "10%",
        position: "absolute",
        bottom: 0,
        right: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bar: {
        width: "60%",
    },
});

export default Graph;
