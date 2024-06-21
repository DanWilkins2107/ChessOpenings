import React from "react";
import { SafeAreaView, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Container = ({ children }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.fill}>
                <LinearGradient colors={["#1a1625", "#1d1740", "#1a1625"]} style={styles.fill}>
                    <SafeAreaView style={styles.innerContainer}>{children}</SafeAreaView>
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