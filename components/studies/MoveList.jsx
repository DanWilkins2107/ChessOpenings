import React, { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { AlertContext } from "../alert/AlertContextProvider";

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

    const renderTree = (node, moveNumber) => {
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
                        true,
                        moveIndex % 2 === 0
                    )}
                    {tempNode.parent.children.length > 1 && (
                        <Text>
                            <View>
                                <Text> (</Text>
                            </View>
                            {tempNode.parent.children.slice(1).map((child, index) => (
                                <Text key={child.move}>
                                    {child.moveNumber ===
                                        moveNumber + Math.floor(moveIndex / 2) && (
                                        <Text>{moveNumber + Math.floor(moveIndex / 2)}...</Text>
                                    )}
                                    {renderMove(
                                        child,
                                        moveNumber + Math.floor(moveIndex / 2),
                                        false,
                                        moveIndex % 2 === 0
                                    )}
                                    {child.children && child.children.length > 0 && (
                                        <Text>
                                            {" "}
                                            {renderTree(
                                                child,
                                                moveNumber + Math.floor(moveIndex / 2) + 1
                                            )}
                                        </Text>
                                    )}
                                    {index < tempNode.parent.children.length - 2 ? ", " : ""}
                                </Text>
                            ))}
                            <View>
                                <Text>)</Text>
                            </View>
                        </Text>
                    )}
                </Text>
            );
            moves.push(move);
            moveIndex++;
        }
        return (
            <Text>
                {moves.map((move, index) => (
                    <Text key={index}>
                        {move}
                        {index < moves.length - 1 ? " " : ""}
                    </Text>
                ))}
            </Text>
        );
    };

    const renderMove = (node, moveNumber, isMainLine, isWhiteMove) => {
        const move = node.move;
        const isActive = node === currentNode;

        return (
            <TouchableOpacity
                key={move}
                onPress={() => handleMoveClick(node)}
                style={{
                    borderRadius: 5,
                    backgroundColor: isActive ? "black" : "transparent",
                }}
            >
                <Text style={{ color: isActive ? "white" : "black" }}>
                    {(isWhiteMove ? moveNumber + "." : moveNumber + "...") + move}
                </Text>
            </TouchableOpacity>
        );
    };

    const handleMoveClick = (node) => {
        let moves = [];
        let tempNode = node;
        while (tempNode.parent) {
            console.log("Move:", tempNode.move);
            moves.push(tempNode.move);
            tempNode = tempNode.parent;
        }
        moves.reverse();
        chess.reset();
        moves.forEach((move) => {
            try {
                chess.move(move);
            }
            catch (error) {
                setAlert("We ran into an error.", "red");
            }
        });
        setCurrentNode(node);
    };

    return (
        <View style={{ backgroundColor: "white" }}>
            {rootNode && <Text>{renderTree(rootNode, 1, true)}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    move: {
        color: "black",
    },
    activeMove: {
        color: "white",
        backgroundColor: "black",
    },
});

export default MoveList;
