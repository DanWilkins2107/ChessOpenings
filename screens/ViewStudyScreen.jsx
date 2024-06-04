import React, { useState } from "react";
import { View } from "react-native";
import { Chess } from "chess.js";
import Chessboard from "../components/chessboard/chessboard.jsx";
import Header from "../components/Header.jsx";
import Container from "../components/Container.jsx";
import MessageBox from "../components/chessboard/messagebox.jsx";
import MoveNavigator from "../components/chessboard/moveNavigator.jsx";

const ViewStudyScreen = () => {
    const [chess, setChess] = useState(new Chess());
    const [backgroundColor, setBackgroundColor] = useState("white");
    const [message, setMessage] = useState({
        text: `It's ${chess.turn() === "w" ? "White" : "Black"}'s turn`,
        color: "black",
        backgroundColor: "white",
    });
    const [tree, setTree] = useState({
        move: "Start",
        children: [],
    });
    const [currentNode, setCurrentNode] = useState(tree);
    const [path, setPath] = useState([tree]);

    const addChildNode = (parentNode, childNode) => {
        setTree((prevTree) => {
            const newTree = { ...prevTree };
            const addChild = (node, child) => {
                const existingChild = node.children.find((c) => c.move === child.move);
                if (existingChild) {
                    existingChild.children = child.children;
                } else {
                    node.children.push(child);
                }
            };
            const findNode = (node, move) => {
                if (node.move === move) {
                    return node;
                }
                for (const child of node.children) {
                    const found = findNode(child, move);
                    if (found) {
                        return found;
                    }
                }
                return null;
            };
            const parentNodeInTree = findNode(newTree, parentNode.move);
            if (parentNodeInTree) {
                addChild(parentNodeInTree, childNode);
            }
            return newTree;
        });
    };

    const moveFunction = (from, to) => {
        try {
            const move = chess.move({ from: from, to: to });
            setMessage({
                text: `It's ${chess.turn() === "w" ? "White" : "Black"}'s turn`,
                color: `${chess.turn() === "b" ? "white" : "black"}`,
                backgroundColor: `${chess.turn() === "w" ? "white" : "black"}`
            });
            const newNode = {
                move: move.san,
                children: [],
            };
            const existingChild = currentNode.children.find((child) => child.move === newNode.move);
            if (existingChild) {
                setCurrentNode(existingChild);
            } else {
                addChildNode(currentNode, newNode);
                setCurrentNode(newNode);
            }
            setPath((prevPath) => [...prevPath, newNode]);
        } catch (error) {}
    };

    const handleParentPress = () => {
        if (path.length > 1) {
            const newPath = path.slice(0, path.length - 1);
            const parentNode = newPath[newPath.length - 1];
            if (parentNode) {
                setCurrentNode(parentNode);
                setPath(newPath);
                chess.undo(); // Undo the move
            }
        }
    };
    
    const handleChildPress = (child) => {
        setPath((prevPath) => [...prevPath, child]);
        setCurrentNode(child);
        chess.move(child.move); // Make the move
    };

    const handleMoveNavigation = (node) => {
        setCurrentNode(node);
        chess.reset();
        node.children.forEach((child) => {
            chess.move(child.move);
        });
        setMessage({
            text: `It's ${chess.turn() === "w" ? "White" : "Black"}'s turn`,
            color: `${chess.turn() === "b" ? "white" : "black"}`,
            backgroundColor: `${chess.turn() === "w" ? "white" : "black"}`,
        });
    };

    return (
        <Container>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Header showBackButton />
                <View
                    style={{
                        width: "90%",
                        height: "90%",
                        display: "flex",
                        gap: "5",
                    }}
                >
                    <Chessboard
                        chess={chess}
                        moveFunction={moveFunction}
                        backgroundColor={backgroundColor}
                    />
                    <MessageBox
                        message={message.text}
                        textColor={message.color}
                        backgroundColor={message.backgroundColor}
                    />
                    <MoveNavigator
                        tree={tree}
                        path={path}
                        currentNode={currentNode}
                        handleParentPress={handleParentPress}
                        handleChildPress={handleChildPress}
                        onMove={handleMoveNavigation}
                    />
                </View>
            </View>
        </Container>
    );
};

export default ViewStudyScreen;
