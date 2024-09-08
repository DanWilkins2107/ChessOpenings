import React from "react";
import { SafeAreaView, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useHeaderHeight } from "@react-navigation/elements";
import { Colors } from "../styling";

const Container = ({ theme = "dark", style, children, ...props }) => {
    const headerHeight = useHeaderHeight();
    const colors =
        theme === "dark"
            ? ["#13111A", "#1F1025", "#13111A"]
            : [Colors.background, Colors.background];
    return (
        <View style={styles.fill}>
            <LinearGradient colors={colors} style={styles.fill}>
                <View style={[{ paddingTop: headerHeight }, styles.innerContainer]}>
                    <SafeAreaView style={[styles.innerContainer, style]}>{children}</SafeAreaView>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    fill: {
        width: "100%",
        height: "100%",
    },
    innerContainer: {
        flex: 1,
        flexDirection: "column",
    },
});

export default Container;
