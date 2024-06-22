import { Text, View, StyleSheet } from "react-native";
import colors from "../colors";

const PageTitle = ({title}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "bold",
        padding: 20,
        color: "white",
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: '5%', 
    }
    
});


export default PageTitle;