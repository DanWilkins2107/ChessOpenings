import React, { useState } from "react";
import { View } from "react-native";
import { Chess } from "chess.js";
import Chessboard from "../components/chessboard/chessboard.jsx";
import Header from "../components/Header.jsx";
import Container from "../components/Container.jsx";
import MessageBox from "../components/chessboard/messagebox.jsx";
import MoveNavigator from "../components/studies/moveNavigator.jsx";
import Navigation from "../components/studies/Navigation.jsx";
import { navigateToParentNode, navigateToChildNode } from "../functions/treeFunctions";

const ViewStudyScreen = () => {
    const [chess] = useState(new Chess());
    const [backgroundColor, setBackgroundColor] = useState("white");
    const [message, setMessage] = useState({
        text: `It's White's turn`,
        color: "black",
        backgroundColor: "white",
    });
    let tree = {
        move: "Start",
        children: [],
        parent: null,
    }
    const [currentNode, setCurrentNode] = useState(tree);
    const [path, setPath] = useState([tree]);
    const [pov, setPov] = useState("w");

    const updateMoveMessage = () => {
        setMessage({
            text: `It's ${chess.turn() === "w" ? "White" : "Black"}'s turn`,
            color: `${chess.turn() === "b" ? "white" : "black"}`,
            backgroundColor: `${chess.turn() === "w" ? "white" : "black"}`,
        });
    };

    const moveFunction = (from, to) => {
        try {
            const move = chess.move({ from: from, to: to });
            navigateToChildNode(move.san, currentNode, setCurrentNode, chess, false);
            setPath((prevPath) => [...prevPath, currentNode]);
            updateMoveMessage();
        } catch (error) {
        }
    };

    const handleParentPress = () => {
        navigateToParentNode(tree, currentNode, setCurrentNode, chess);
        updateMoveMessage();
    };

    const handleChildPress = (child) => {
        navigateToChildNode(child.move, currentNode, setCurrentNode, chess, tree);
        updateMoveMessage();
    };

    const handleRightPress = () => {
        navigateToChildNode(null, currentNode, setCurrentNode, chess, tree);
        updateMoveMessage();
    };

    const handleDoubleRightPress = () => {
        let newNode = currentNode;
        while (newNode.children.length > 0) {
            newNode = newNode.children[0];
            chess.move(newNode.move);
        }
        setPath((prevPath) => [...prevPath, newNode]);
        setCurrentNode(newNode);
        updateMoveMessage();
    };

    const handleBackToStartPress = () => {
        if (path.length > 1) {
            const newPath = [path[0]];
            const parentNode = newPath[0];
            setCurrentNode(parentNode);
            setPath(newPath);
            chess.reset();
            updateMoveMessage();
        }
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
                        pov={pov}
                    />
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Navigation
                            onDoubleLeftPress={handleBackToStartPress}
                            onLeftPress={handleParentPress}
                            onFlipPress={() => {
                                pov === "w" ? setPov("b") : setPov("w");
                            }}
                            onRightPress={handleRightPress}
                            onDoubleRightPress={handleDoubleRightPress}
                        />
                    </View>
                    <MessageBox
                        message={message.text}
                        textColor={message.color}
                        backgroundColor={message.backgroundColor}
                    />
                    <MoveNavigator
                        currentNode={currentNode}
                        chess={chess}
                        setCurrentNode={setCurrentNode}
                    />
                </View>
            </View>
        </Container>
    );
};

export default ViewStudyScreen;