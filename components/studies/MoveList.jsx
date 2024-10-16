import React, { useState, useEffect, useContext } from "react";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, SectionList } from "react-native";
import { AlertContext } from "../alert/AlertContextProvider";
import Body from "../text/Body";
import Subheading2 from "../text/Subheading2";
import { Colors } from "../../styling";
import OpacityPressable from "../genericButtons/OpacityPressable";
import getMoveListFromNode from "../../functions/test/getMoveListFromNode";

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

    const renderTree = (node, moveNumber, isVariation, showFirstMove, key) => {
        const noOfChildren = node.children?.length ?? 0;

        if (noOfChildren === 0) {
            return showFirstMove ? renderMove(node, moveNumber, isVariation) : null;
        }

        if (noOfChildren === 1) {
            return (
                <>
                    {showFirstMove && renderMove(node, moveNumber, isVariation)}
                    {renderTree(
                        node.children[0],
                        moveNumber + 1,
                        false,
                        true,
                        `${key}${node.children[0].move}`
                    )}
                </>
            );
        }

        return (
            <>
                {showFirstMove && renderMove(node, moveNumber, isVariation)}
                {renderMove(node.children[0], moveNumber + 1, false)}
                {node.children.slice(1).map((child) => {
                    return (
                        <Body key={`${key}${child.move}`}>
                            <View style={styles.bracketContainer}>
                                <Body>(</Body>
                            </View>
                            {renderTree(child, moveNumber + 1, true, true, `${key}${child.move}`)}
                            <View style={styles.bracketContainer}>
                                <Body>)</Body>
                            </View>
                        </Body>
                    );
                })}
                {renderTree(
                    node.children[0],
                    moveNumber + 1,
                    false,
                    false,
                    `${key}${node.children[0].move}`
                )}
            </>
        );
    };

    const renderMove = (node, moveNumber, isVariation) => {
        let numberAnnotation;
        const colorToPlay = moveNumber % 2 === 1 ? "white" : "black";
        const pgnMoveNumber = Math.floor((moveNumber + 1) / 2);

        if (node.move === "Start") {
            return;
        }

        if (colorToPlay === "white") {
            numberAnnotation = `${pgnMoveNumber}.`;
        } else {
            numberAnnotation = isVariation ? `${pgnMoveNumber}...` : "";
        }

        const isActive = currentNode === node;

        return (
            <OpacityPressable
                style={[styles.moveCircle, isActive && styles.activeMove]}
                onPress={() => {
                    handleMovePress(node);
                }}
                shadow={false}
            >
                <Subheading2 style={[isActive && styles.activeMoveText]}>
                    {numberAnnotation}
                    {node.move}
                </Subheading2>
            </OpacityPressable>
        );
    };

    const handleMovePress = (node) => {
        const moveList = getMoveListFromNode(node);
        chess.reset();
        for (const moveObj of moveList) {
            chess.move(moveObj.move);
        }
        setCurrentNode(node);
    };

    return (
        <ScrollView style={styles.container}>
            {rootNode && <Text>{renderTree(rootNode, 0, false, true, "")}</Text>}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    activeMove: {
        backgroundColor: Colors.primaryButton,
    },
    activeMoveText: {
        color: Colors.background,
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
    },
});

export default MoveList;
