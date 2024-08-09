import Tooltip from "react-native-walkthrough-tooltip";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import OpacityPressable from "../OpacityPressable";

const DeleteTooltip = ({ isVisible, onDelete, onClose, children }) => {
    return (
        <Tooltip
            isVisible={isVisible}
            content={
                <OpacityPressable style={styles.container} onPress={onDelete}>
                    <Icon name="trash" size={20} color="red"/>
                </OpacityPressable>
            }
            placement="top"
            onClose={onClose}
            backgroundColor="transparent"
            disableShadow={true}
            contentStyle={styles.tooltip}
        >
            {children}
        </Tooltip>
    );
};

const styles = StyleSheet.create({
    tooltip: {
        backgroundColor: "grey",
        padding: 5,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        padding: 5,
    }
});

export default DeleteTooltip;
