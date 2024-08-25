import { StyleSheet, View } from "react-native"
import { Colors } from "../../styling"

export default function Card({children, style, padding=true}) {
    return (
        <View style={[styles.card, style, padding && styles.padding]}>
            {children}
        </View>
    )

}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card1,
        shadowColor: "rgba(0,0,0,0.25)",
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 5,
        shadowOpacity: 1,
    },
    padding: {
        padding: 10,
    }
})