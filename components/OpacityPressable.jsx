import { Pressable } from "react-native";

const OpacityPressable = ({ children, ...props }) => {
    return (
        <Pressable
            {...props}
            style={({ pressed }) => [
                {
                    opacity: pressed ? 0.5 : 1,
                },
            ]}
        >
            {children}
        </Pressable>
    );
};

export default OpacityPressable;