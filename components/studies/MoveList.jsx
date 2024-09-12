import React, { useState, useEffect, useContext } from "react";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { AlertContext } from "../alert/AlertContextProvider";
import Body from "../text/Body";
import { Colors } from "../../styling";
const MoveList = ({ currentNode, chess, setCurrentNode }) => {
    const [rootNode, setRootNode] = useState(null);
    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        let tempNode = currentNode;
        while (tempNode.parent) {
            tempNode = tempNode.parent;
        }
        setRootNode(tempNode);
    }, [currentNode]);

    const renderTree = (node, moveNumber, isVariation = false) => {
        if (!node) return null;
        let moves = [];
        let tempNode = node;
        let moveIndex = 0;
        while (tempNode.children && tempNode.children.length > 0) {
            tempNode = tempNode.children[0];
            let move = (
                <Text key={tempNode.move}>
                    {renderMove(
                        tempNode,
                        moveNumber + Math.floor(moveIndex / 2),
                        !isVariation,
                        moveIndex % 2 === 0,
                        moveIndex === 0
                    )}
                    {tempNode.parent.children.length > 1 && (
                        <Text key={`${tempNode.move}-variations`}>
                            <View style={styles.bracketContainer}>
                                <Body>(</Body>
                            </View>
                            {tempNode.parent.children.slice(1).map((child, index) => (
                                <Text key={child.move}>
                                    {renderMove(
                                        child,
                                        moveNumber + Math.floor(moveIndex / 2),
                                        false,
                                        moveIndex % 2 === 0,
                                        index === 0
                                    )}
                                    {child.children && child.children.length > 0 && (
                                        <Text>
                                            {renderTree(
                                                child,
                                                moveNumber + Math.floor(moveIndex / 2) + 1,
                                                true
                                            )}
                                        </Text>
                                    )}
                                </Text>
                            ))}
                            <View style={styles.bracketContainer}>
                                <Body>)</Body>
                            </View>
                        </Text>
                    )}
                </Text>
            );
            moves.push(move);
            moveIndex++;
        }
        return (
            <Text style={styles.text}>
                {moves.map((move, index) => (
                    <Text key={index} style={styles.text}>
                        {move}
                    </Text>
                ))}
            </Text>
        );
    };

    const renderMove = (node, moveNumber, isMainLine, isWhiteMove, isFirstVariationMove) => {
        const move = node.move;
        const isActive = node === currentNode;
        let prefix = "";
        if (isMainLine) {
            prefix = isWhiteMove ? `${moveNumber}.` : "";
        } else if (isFirstVariationMove) {
            prefix = isWhiteMove ? `${moveNumber}.` : `${moveNumber}...`;
        }

        return (
            <TouchableOpacity
                key={move}
                onPress={() => handleMoveClick(node)}
                style={[styles.moveCircle, isActive && styles.activeMove]}
            >
                <Body style={[isActive && { color: Colors.background}, styles.text]}>
                    {prefix + move}
                </Body>
            </TouchableOpacity>
        );
    };

    const handleMoveClick = (node) => {
        let moves = [];
        let tempNode = node;
        while (tempNode.parent) {
            moves.push(tempNode.move);
            tempNode = tempNode.parent;
        }
        moves.reverse();
        chess.reset();
        moves.forEach((move) => {
            try {
                chess.move(move);
            } catch (error) {
                setAlert("We ran into an error.", "red");
            }
        });
        setCurrentNode(node);
    };

    return (
        <ScrollView style={styles.container}>
            {rootNode && <Text>{renderTree(rootNode, 1)}</Text>}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    activeMove: {
        backgroundColor: Colors.primaryButton,
    },
    container: {
        paddingVertical: 4,
        paddingHorizontal: 2,
    },
    bracketContainer: {
        paddingBottom: 2,
    },
    moveCircle: {
        borderRadius: 5,
        padding: 2,
    }
});

export default MoveList;
