import { View, StyleSheet, ActivityIndicator } from "react-native";

export default function BoardLoading() {
    return (
        <View style={styles.background}>
            <ActivityIndicator size="large" color="black" />
        </View>
    );
}
const styles = StyleSheet.create({
    background: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.4)",
    }
});
