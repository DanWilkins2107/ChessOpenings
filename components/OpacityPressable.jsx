import { Pressable } from "react-native";

const OpacityPressable = ({ children, style, ...props }) => {
    return (
        <Pressable
            {...props}
            style={({ pressed }) => [
                {
                    opacity: pressed ? 0.5 : 1,
                },
                style,
            ]}
        >
            {children}
        </Pressable>
    );
};

export default OpacityPressable;
