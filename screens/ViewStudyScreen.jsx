import React, { useState } from "react";
import { View } from "react-native";
import { Chess } from "chess.js";
import Chessboard from "../components/chessboard/chessboard.jsx";
import Header from "../components/Header.jsx";
import Container from "../components/Container.jsx";

const ViewStudyScreen = () => {
    const [chess, setChess] = useState(new Chess());

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
                    }}
                >
                    <Chessboard chess={chess} />
                </View>
            </View>
        </Container>
    );
};

export default ViewStudyScreen;
