import { Pressable, StyleSheet } from "react-native";

const OpacityPressable = ({ children, style, shadow = true, ...props }) => {
    return (
        <Pressable
            {...props}
            style={({ pressed }) => [
                {
                    opacity: pressed ? 0.5 : 1,
                },
                shadow && styles.pressableShadow,
                style,
            ]}
        >
            {children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressableShadow: {
        shadowColor: "#000000",
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
    },
});

export default OpacityPressable;
