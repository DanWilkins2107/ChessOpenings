import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import { Chess } from "chess.js";
import Chessboard from "../components/chessboard/chessboard.jsx";
import Header from "../components/Header.jsx";
import Container from "../components/Container.jsx";
import MessageBox from "../components/chessboard/messagebox.jsx";
import MoveNavigator from "../components/studies/MoveNavigator.jsx";
import Navigation from "../components/studies/Navigation.jsx";
import { navigateToParentNode, navigateToChildNode } from "../functions/treeFunctions";
import treeToPgn from "../functions/treeToPgn.js";

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
    };
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
        } catch (error) {}
    };

    const handleParentPress = () => {
        navigateToParentNode(currentNode, setCurrentNode, chess);
        updateMoveMessage();
    };

    const handleRightPress = () => {
        navigateToChildNode(null, currentNode, setCurrentNode, chess, true);
        updateMoveMessage();
    };

    const handleDoubleRightPress = () => {
        let lastChild = currentNode;
        while (lastChild.children.length > 0) {
            lastChild = lastChild.children[0];
        }
        setCurrentNode(lastChild);
        const moves = [];
        let tempNode = lastChild;
        while (tempNode.parent) {
            moves.push(tempNode.move);
            tempNode = tempNode.parent;
        }
        chess.reset();
        for (let i = moves.length - 1; i >= 0; i--) {
            chess.move(moves[i]);
        }
        updateMoveMessage();
    };

    const handleBackToStartPress = () => {
        if (currentNode.parent) {
            let tempNode = currentNode;
            while (tempNode.parent) {
                tempNode = tempNode.parent;
                chess.undo();
            }
            setCurrentNode(tempNode);
            setPath([tempNode]);
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
                    <Button onPress={() => console.log(treeToPgn(currentNode))} title="Save" />
                </View>
            </View>
        </Container>
    );
};

export default ViewStudyScreen;
