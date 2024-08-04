import React, { useState, useEffect, useContext } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Animated,
    Pressable,
    Keyboard,
} from "react-native";
import IconFA5 from "react-native-vector-icons/FontAwesome5";
import { ModalContext } from "./ModalContextProvider"
import Colors from "../../colors";

const Modal = () => {
    const { modal, setModal } = useContext(ModalContext);
    const [visible, setVisible] = useState(false);
    const animation = new Animated.Value(0);

    useEffect(() => {
        if (modal) {
            setVisible(true);
            Animated.spring(animation, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(animation, {
                toValue: 0,
                useNativeDriver: true,
            }).start(() => {
                setVisible(false);
            });
        }
    }, [modal]);

    const handleDismiss = () => {
        setModal(null);
        Keyboard.dismiss();
    };

    if (visible) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <Pressable style={styles.overlay} onPress={handleDismiss}>
                    <Animated.View style={[styles.modalContainer]}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
                                <IconFA5 name="times" size={30} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.content}>{modal}</View>
                    </Animated.View>
                </Pressable>
            </SafeAreaView>
        );
    } else {
        return null;
    }
};

const styles = StyleSheet.create({
    safeArea: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        elevation: 5, // For Android shadow
        shadowColor: "#000", // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderColor: Colors.primaryBorder,
        borderWidth: 2,
    },
    header: {
        backgroundColor: Colors.primary,
        padding: 10,
        alignItems: "flex-end",

    },
    closeButton: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        padding: 20,
    },
});

export default Modal;
