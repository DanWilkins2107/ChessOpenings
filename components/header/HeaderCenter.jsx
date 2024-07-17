import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const HeaderCenter = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")} style={styles.container}>
            <Image source={require("../../assets/logo.png")} style={styles.image}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
        marginBottom: 5,
        padding: 2,
    },
    image: {
        width: 40,
        height: 40,
    },
});

export default HeaderCenter;
