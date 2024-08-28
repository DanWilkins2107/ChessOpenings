import { StyleSheet, View } from "react-native"
import { Colors } from "../../styling"

export default function Card({children, style, padding=true, ...props}) {
    return (
        <View style={[styles.card, style, padding && styles.padding]} {...props}>
            {children}
        </View>
    )

}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card1,
        shadowColor: "#000000",
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
    },
    padding: {
        padding: 10,
    }
})