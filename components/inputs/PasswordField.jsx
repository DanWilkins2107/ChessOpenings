import { StyleSheet, Text, View } from "react-native";
import FormField from "./FormField";
import { useState } from "react";
import OpacityPressable from "../genericButtons/OpacityPressable";
import IconFA6 from "react-native-vector-icons/FontAwesome6";
import { Colors } from "../../styling";

export default function PasswordField({ style, onChangeText, value, placeholder }) {
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    return (
        <View>
            <FormField
                style={[styles.input, style]}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                secureTextEntry={isPasswordHidden}
            />
            <OpacityPressable
                onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                style={styles.iconWrapper}
                shadow={false}
            >
                <IconFA6 name={isPasswordHidden ? "eye-slash" : "eye"} color={Colors.text} style={styles.icon}/>
            </OpacityPressable>
        </View>
    );
}

const styles = StyleSheet.create({
    iconWrapper: {
        position: "absolute",
        right: 0,
        top: 0,
        height: 40,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        fontSize: 25,
        justifyContent: "center",
        alignItems: "center",
    }

});
