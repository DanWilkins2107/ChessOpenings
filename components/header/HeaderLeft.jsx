import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const HeaderLeft = () => {
    const navigation = useNavigation();

    return (
        <>
            {navigation.canGoBack() ? (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.container}>
                    <Icon name="chevron-left" size={20} color="#fff" />
                </TouchableOpacity>
            ) : (
                <></>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
});

export default HeaderLeft;
