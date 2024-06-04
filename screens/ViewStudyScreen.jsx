import React, { useState } from "react";
import { View } from "react-native";
import { Chess } from "chess.js";
import Chessboard from "../components/chessboard/chessboard.jsx";
import Header from "../components/Header.jsx";
import Container from "../components/Container.jsx";
import MessageBox from "../components/chessboard/messagebox.jsx";

const ViewStudyScreen = () => {
    const [chess, setChess] = useState(new Chess());
    const [backgroundColor, setBackgroundColor] = useState("white");
    const [message, setMessage] = useState({
        text: `It's ${chess.turn() === "w" ? "White" : "Black"}'s turn`,
        color: "black",
        backgroundColor: "white",
    });

    const moveFunction = (from, to) => {
        try {
            chess.move({ from: from, to: to });
            setMessage({
                text: `It's ${chess.turn() === "w" ? "White" : "Black"}'s turn`,
                color: `${chess.turn() === "b" ? "white" : "black"}`,
                backgroundColor: `${chess.turn() === "w" ? "white" : "black"}`
            });
        } catch (error) {}
    };

    return (
        <Container>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Header showBackButton />
                <View
                    style={{
                        width: "90%",
                        height: "90%",
                        borderColor: "red",
                        borderStyle: "solid",
                        borderWidth: "2px",
                        display: "flex",
                        gap: "5"
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
                </View>
            </View>
        </Container>
    );
};

export default ViewStudyScreen;
