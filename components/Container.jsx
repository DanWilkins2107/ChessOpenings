import React from "react";
import { SafeAreaView, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useHeaderHeight } from "@react-navigation/elements";

const Container = ({ theme = "dark", children }) => {
    const headerHeight = useHeaderHeight();
    const colors = theme === "dark" ? ["#1a1625", "#1d1740", "#1a1625"] : ["#fff", "#fff"];
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.fill}>
                <LinearGradient colors={colors} style={styles.fill}>
                    <View style={[{ paddingTop: headerHeight }, styles.innerContainer]}>
                        <SafeAreaView style={styles.innerContainer}>{children}</SafeAreaView>
                    </View>
                </LinearGradient>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    innerContainer: {
        flex: 1,
        flexDirection: "column",
    },
});

export default Container;
