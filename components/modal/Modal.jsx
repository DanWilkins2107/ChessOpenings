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
import { ModalContext } from "./ModalContextProvider";
import { Colors } from "../../styling";

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
                        <Pressable style={styles.header} onPress={() => Keyboard.dismiss()}>
                            <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
                                <IconFA5 name="times" size={30} color={Colors.text} />
                            </TouchableOpacity>
                        </Pressable>
                        <Pressable style={styles.content} onPress={() => Keyboard.dismiss()}>
                            {modal}
                        </Pressable>
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
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
        borderRadius: 10,
        backgroundColor: Colors.card1,
        shadowColor: "#000000",
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
    },
    header: {
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
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
});

export default Modal;
