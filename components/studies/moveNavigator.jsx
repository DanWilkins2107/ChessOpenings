import { View, ScrollView, StyleSheet, Text } from "react-native";
import { navigateToParentNode, navigateToChildNode } from "../../functions/tree/treeFunctions";
import OpacityPressable from "../OpacityPressable";
import { useState } from "react";
import DeleteTooltip from "./DeleteTooltip";

const MoveNavigator = ({ currentNode, chess, setCurrentNode, uploadPgn }) => {
    const [tooltipNode, setTooltipNode] = useState(null);

    const handleParentPress = () => {
        navigateToParentNode(currentNode, setCurrentNode, chess);
    };

    const handleSiblingPress = (sibling) => {
        navigateToParentNode(currentNode, setCurrentNode, chess);
        navigateToChildNode(sibling.move, currentNode.parent, setCurrentNode, chess, true);
    };

    const handleParentSiblingPress = (parentSibling) => {
        navigateToParentNode(currentNode, setCurrentNode, chess);
        navigateToParentNode(currentNode.parent, setCurrentNode, chess);
        navigateToChildNode(
            parentSibling.move,
            currentNode.parent.parent,
            setCurrentNode,
            chess,
            true
        );
    };

    const handleChildPress = (child) => {
        navigateToChildNode(child.move, currentNode, setCurrentNode, chess, true);
    };

    const handleParentSiblingDelete = (parentSibling) => {
        parentSibling.parent.children = parentSibling.parent.children.filter(
            (sibling) => sibling !== parentSibling
        );

        if (parentSibling === currentNode.parent) {
            setCurrentNode(parentSibling.parent);
            chess.undo();
            chess.undo();
        }

        uploadPgn();
        setTooltipNode(null);
    };

    const handleSiblingDelete = (sibling) => {
        currentNode.parent.children = currentNode.parent.children.filter(
            (siblingNode) => siblingNode !== sibling
        );

        if (sibling === currentNode) {
            setCurrentNode(currentNode.parent);
            chess.undo();
        }

        uploadPgn();
        setTooltipNode(null);
    };

    const handleChildDelete = (child) => {
        currentNode.children = currentNode.children.filter((childNode) => childNode !== child);

        uploadPgn();
        setTooltipNode(null);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.parentColumn} contentContainerStyle={styles.contentContainer}>
                {currentNode.parent &&
                    currentNode.parent.parent &&
                    currentNode.parent.parent.children.map((parentSibling, index) => (
                        <DeleteTooltip
                            isVisible={parentSibling === tooltipNode}
                            onClose={() => {
                                setTooltipNode(null);
                            }}
                            onDelete={() => handleParentSiblingDelete(parentSibling)}
                        >
                            <OpacityPressable
                                key={index}
                                title={parentSibling.move}
                                onPress={() => handleParentSiblingPress(parentSibling)}
                                onLongPress={() => {
                                    setTooltipNode(parentSibling);
                                }}
                                color={parentSibling === currentNode.parent ? "#000" : "#666"}
                            >
                                <Text
                                    style={
                                        parentSibling === currentNode.parent
                                            ? styles.relatedMove
                                            : styles.siblingMove
                                    }
                                >
                                    {parentSibling.move}
                                </Text>
                            </OpacityPressable>
                        </DeleteTooltip>
                    ))}
                {currentNode.parent &&
                    (!currentNode.parent.parent ||
                        !currentNode.parent.parent.children.includes(currentNode.parent)) && (
                        <OpacityPressable
                            onPress={handleParentPress}
                            onLongPress={() => {
                                setTooltipNode(currentNode.parent);
                            }}
                        >
                            <Text style={styles.relatedMove}>{currentNode.parent.move}</Text>
                        </OpacityPressable>
                    )}
            </ScrollView>
            <ScrollView style={styles.mainColumn} contentContainerStyle={styles.contentContainer}>
                {currentNode.parent &&
                    currentNode.parent.children.map((sibling, index) => (
                        <DeleteTooltip
                            isVisible={sibling === tooltipNode}
                            content={<Text>HI</Text>}
                            onClose={() => {
                                setTooltipNode(null);
                            }}
                            onDelete={() => handleSiblingDelete(sibling)}
                        >
                            <OpacityPressable
                                key={index}
                                onPress={() => handleSiblingPress(sibling)}
                                onLongPress={() => {
                                    setTooltipNode(sibling);
                                }}
                            >
                                <Text
                                    style={
                                        currentNode === sibling
                                            ? styles.currentMove
                                            : styles.siblingMove
                                    }
                                >
                                    {sibling.move}
                                </Text>
                            </OpacityPressable>
                        </DeleteTooltip>
                    ))}
                {!currentNode.parent && (
                    <OpacityPressable>
                        <Text style={styles.currentMove}>{currentNode.move}</Text>
                    </OpacityPressable>
                )}
            </ScrollView>
            <ScrollView
                style={styles.childrenColumn}
                contentContainerStyle={styles.contentContainer}
            >
                {currentNode.children.map((child, index) => (
                    <DeleteTooltip
                        isVisible={child === tooltipNode}
                        onClose={() => {
                            setTooltipNode(null);
                        }}
                        onDelete={() => handleChildDelete(child)}
                    >
                        <OpacityPressable
                            key={index}
                            onPress={() => handleChildPress(child)}
                            onLongPress={() => {
                                setTooltipNode(child);
                            }}
                        >
                            <Text style={styles.relatedMove}>{child.move}</Text>
                        </OpacityPressable>
                    </DeleteTooltip>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: "center",
    },
    parentColumn: {
        flex: 1,
        backgroundColor: "#ccc",
    },
    mainColumn: {
        flex: 1,
        backgroundColor: "#fff",
    },
    childrenColumn: {
        flex: 1,
        backgroundColor: "#ccc",
    },
    currentMove: {
        fontWeight: "bold",
        color: "#000",
        fontSize: 20,
    },
    relatedMove: {
        color: "#000",
        fontSize: 20,
    },
    siblingMove: {
        color: "#666",
        fontSize: 20,
    },
});

export default MoveNavigator;
