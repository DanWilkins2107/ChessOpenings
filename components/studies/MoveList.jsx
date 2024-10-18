import React, { useState, useEffect, useContext } from "react";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, SectionList } from "react-native";
import { AlertContext } from "../alert/AlertContextProvider";
import Body from "../text/Body";
import Subheading2 from "../text/Subheading2";
import { Colors } from "../../styling";
import OpacityPressable from "../genericButtons/OpacityPressable";
import getMoveListFromNode from "../../functions/test/getMoveListFromNode";
import { ModalContext } from "../modal/ModalContextProvider";
import MoveOptionsModal from "./MoveOptionsModal";
import removeChildNode from "../../functions/tree/removeChildNode";

const MoveList = ({ currentNode, chess, setCurrentNode, onSave }) => {
    const [rootNode, setRootNode] = useState(null);
    const { setAlert } = useContext(AlertContext);
    const { setModal } = useContext(ModalContext);

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
        let extendedAnnotation;
        const colorToPlay = moveNumber % 2 === 1 ? "white" : "black";
        const pgnMoveNumber = Math.floor((moveNumber + 1) / 2);

        if (node.move === "Start") {
            return;
        }

        if (colorToPlay === "white") {
            numberAnnotation = `${pgnMoveNumber}.`;
            extendedAnnotation = `${pgnMoveNumber}. ${node.move}`;
        } else {
            numberAnnotation = isVariation ? `${pgnMoveNumber}...` : "";
            extendedAnnotation = `${pgnMoveNumber}... ${node.move}`;
        }

        const isActive = currentNode === node;

        return (
            <OpacityPressable
                style={[styles.moveCircle, isActive && styles.activeMove]}
                onPress={() => {
                    handleMovePress(node);
                }}
                onLongPress={() => {
                    const moveName = `${numberAnnotation}${node.move}`;
                    setModal(
                        <MoveOptionsModal
                            onDelete={() => {
                                deleteMove(node, extendedAnnotation);
                                onSave()
                            }}
                            move={moveName}
                        />
                    );
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

    const deleteMove = (node, moveName) => {
        if (node === currentNode) {
            const newCurrentNode = currentNode.parent;
            chess.undo();
            setCurrentNode(newCurrentNode);
            removeChildNode(node.parent, node);
            setModal(null);
            setAlert(`Deleted move ${moveName}.`, "green");
            return;
        }

        let parentOfCurrent = false;
        let tempNode = currentNode;
        let movesToUndo = 1;
        while (tempNode.parent) {
            movesToUndo++;
            if (tempNode.parent === node) {
                parentOfCurrent = true;
                break;
            }
            tempNode = tempNode.parent;
        }

        if (parentOfCurrent) {
            const newCurrentNode = node.parent;
            console.log("Moves to undo", movesToUndo);
            for (let i = 0; i < movesToUndo; i++) {
                chess.undo();
            }
            removeChildNode(node.parent, node);
            setCurrentNode(newCurrentNode);
        } else {
            removeChildNode(node.parent, node);
        }

        setAlert(`Deleted move ${moveName}.`, "green");
        setModal(null);
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
