import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Fonts } from "../../styling";

import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

const MessageBox = ({ message, backgroundColor, textColor, style }) => {
    // Shared values for animation
    const bgColor = useSharedValue(backgroundColor);
    const txtColor = useSharedValue(textColor);

    // Animated styles
    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: bgColor.value,
        };
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            color: txtColor.value,
        };
    });

    // Trigger color changes on prop changes
    useEffect(() => {
        bgColor.value = withTiming(backgroundColor, { duration: 500 }); // Animate background color change
        txtColor.value = withTiming(textColor, { duration: 500 }); // Animate text color change
    }, [backgroundColor, textColor]);

    return (
        <Animated.View style={[styles.container, animatedStyle, style]}>
            <Animated.Text style={[styles.text, animatedTextStyle]}>{message}</Animated.Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000000",
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
    },
    text: {
        fontSize: 22,
        fontFamily: Fonts.main,
    },
});

export default MessageBox;
