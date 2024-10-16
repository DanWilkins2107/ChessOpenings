import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Animated,
    PanResponder,
} from "react-native";
import { useContext } from "react";
import { AlertContext } from "./AlertContextProvider";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../styling";
import Card from "../containers/Card";
import Body from "../text/Body";

const Alert = () => {
    const { text, color, resetAlert } = useContext(AlertContext);
    const [visible, setVisible] = useState(false);
    const [animation] = useState(new Animated.Value(-200));

    useEffect(() => {
        if (text !== "") {
            animation.stopAnimation();
            setVisible(true);
            Animated.spring(animation, {
                toValue: 10,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(animation, {
                toValue: -200,
                useNativeDriver: true,
            }).start(() => {
                setVisible(false);
            });
        }
    }, [text]);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_evt, gestureState) => {
            if (gestureState.vy < -0.5) {
                resetAlert();
            }
        },
    });

    if (visible) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <Animated.View
                    {...panResponder.panHandlers}
                    style={[styles.alertContainer, { transform: [{ translateY: animation }] }]}
                >
                    <Card padding={false} style={styles.container}>
                        <View style={[styles.leftBar, { backgroundColor: color }]} />
                        <Body style={styles.text}>{text}</Body>
                        <TouchableOpacity onPress={resetAlert} style={styles.closeButton}>
                            <View style={[styles.circle, { backgroundColor: color }]}>
                                <Icon name="times" size={15} color="white" />
                            </View>
                        </TouchableOpacity>
                    </Card>
                </Animated.View>
            </SafeAreaView>
        );
    } else {
        return null;
    }
};

const styles = StyleSheet.create({
    safeArea: {
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: 10,
        alignItems: "center",
    },
    alertContainer: {
        width: "90%",
        height: 60,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: Colors.card2,
    },
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
    },
    leftBar: {
        width: 10,
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
    },
    text: {
        flex: 1,
        marginLeft: 20,
    },
    closeButton: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Alert;
