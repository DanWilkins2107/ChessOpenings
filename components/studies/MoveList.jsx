import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";

const MoveList = ({ currentNode, chess, setCurrentNode }) => {
    const [rootNode, setRootNode] = useState(null);

    useEffect(() => {
        let tempNode = currentNode;
        while (tempNode.parent) {
            tempNode = tempNode.parent;
        }
        setRootNode(tempNode);
    }, [currentNode]);

    const handleMoveClick = (move, node) => {
        const childNode = node.children.find((child) => child.move === move);
        if (childNode) {
            setCurrentNode(childNode);
            chess.move(childNode.move);
        }
    };

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
                            {tempNode.parent.children.slice(1).map((child, index) => (
                                <Text key={child.move}>
                                    {" ("}
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
                                    {")"}
                                </Text>
                            ))}
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

        return (
            <TouchableOpacity key={move} onPress={() => handleMoveClick(move, node)}>
                <Text>
                    {isMainLine && isWhiteMove && <Text>{moveNumber}.</Text>}
                    {!isMainLine && !isWhiteMove && <Text>{moveNumber}...</Text>}
                    <Text>{move}</Text>
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ backgroundColor: "white" }}>
            {rootNode && <Text>{renderTree(rootNode, 1, true)}</Text>}
        </View>
    );
};

export default MoveList;
