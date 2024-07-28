import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { Chess } from "chess.js";
import Chessboard from "../components/chessboard/chessboard.jsx";
import Container from "../components/Container.jsx";
import MessageBox from "../components/chessboard/messagebox.jsx";
import MoveNavigator from "../components/studies/MoveNavigator.jsx";
import Navigation from "../components/studies/Navigation.jsx";
import { navigateToParentNode, navigateToChildNode } from "../functions/treeFunctions";
import treeToPgn from "../functions/treeToPgn.js";
import { db } from "../firebase";
import { get, ref, set } from "firebase/database";
import MoveList from "../components/studies/MoveList.jsx";
import { AlertContext } from "../components/alert/AlertContextProvider";
import pgnToTree from "../functions/pgnToTree.js";
import TabSelector from "../components/studies/TabSelector.jsx";
import Colors from "../colors.js";
import ChapterSelector from "../components/studies/ChapterSelector.jsx";
import StudyOptions from "../components/studies/StudyOptions.jsx";

const ViewStudyScreen = ({ navigation, route }) => {
    const [currentPage, setCurrentPage] = useState(0);
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
    const [pov, setPov] = useState("w");
    const { setAlert } = useContext(AlertContext);

    // Download PGN from db
    useEffect(() => {
        const studyUUID = route.params.study;
        const pgnRef = ref(db, `pgns/${studyUUID}`);
        console.log("Downloading: ", studyUUID);
        get(pgnRef).then((snapshot) => {
            if (snapshot.exists()) {
                const pgnData = snapshot.val();
                console.log("PGN Data: ", JSON.stringify(pgnData, null, 2));
                const tree = pgnToTree(pgnData);
                setCurrentNode(tree);
            }
        });
    }, []);

    const uploadPgn = async () => {
        const pgnData = treeToPgn(currentNode);
        const pgnRef = ref(db, `pgns/${route.params.study}`);
        try {
            await set(pgnRef, pgnData);
        } catch (error) {
            setAlert("Error Uploading PGN", "red");
        }
    };

    useEffect(() => {
        updateMoveMessage();
    }, [chess.turn()]);

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
        } catch (error) {}
    };

    const handleParentPress = () => {
        navigateToParentNode(currentNode, setCurrentNode, chess);
    };

    const handleRightPress = () => {
        navigateToChildNode(null, currentNode, setCurrentNode, chess, true);
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
    };

    const handleBackToStartPress = () => {
        if (currentNode.parent) {
            let tempNode = currentNode;
            while (tempNode.parent) {
                tempNode = tempNode.parent;
                chess.undo();
            }
            setCurrentNode(tempNode);
        }
    };

    return (
        <Container>
            <View style={styles.container}>
                <View style={styles.chessboardContainer}>
                    <Chessboard
                        chess={chess}
                        moveFunction={moveFunction}
                        backgroundColor={backgroundColor}
                        pov={pov}
                    />
                    <MessageBox
                        message={message.text}
                        textColor={message.color}
                        backgroundColor={message.backgroundColor}
                    />
                </View>
                <View style={styles.navigatorContainer}>
                    <Navigation
                        onDoubleLeftPress={handleBackToStartPress}
                        onLeftPress={handleParentPress}
                        onFlipPress={() => {
                            pov === "w" ? setPov("b") : setPov("w");
                        }}
                        onRightPress={handleRightPress}
                        onDoubleRightPress={handleDoubleRightPress}
                    />
                    <View style={styles.pagerView}>
                        <View style={styles.tab}>
                            {currentPage === 0 ? (
                                <MoveNavigator
                                    currentNode={currentNode}
                                    chess={chess}
                                    setCurrentNode={setCurrentNode}
                                />
                            ) : currentPage === 1 ? (
                                <MoveList
                                    currentNode={currentNode}
                                    chess={chess}
                                    setCurrentNode={setCurrentNode}
                                />
                            ) : currentPage === 2 ? (
                                <ChapterSelector />
                            ) : (
                                <StudyOptions />
                            )}
                        </View>
                    </View>
                    <View style={styles.tabContainer}>
                        <TabSelector selectedTab={currentPage} setSelectedTab={setCurrentPage} />
                        {/* <Button onPress={uploadPgn} title="Save" /> */}
                    </View>
                </View>
            </View>
        </Container>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    chessboardContainer: {
        width: "100%",
        display: "flex",
    },
    navigatorContainer: {
        width: "90%",
        flex: 1,
        display: "flex",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 10,
    },
    pagerView: {
        width: "100%",
        flex: 1,
        borderWidth: 2,
        borderBottomWidth: 0,
        borderColor: Colors.primaryBorder,
    },
    tab: {
        flex: 1,
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "white",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 4,
    },
    circleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    tabContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
};

export default ViewStudyScreen;
