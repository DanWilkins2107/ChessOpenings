import { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import OpeningMove from "./OpeningMove";
import { Colors } from "../../styling";
import Body from "../text/Body";

export default function OpeningExplorer({ chess, onPress }) {
    const [fen, setFen] = useState("");
    const [moveData, setMoveData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [lastAPICall, setLastAPICall] = useState(null);
    useEffect(() => {
        async function getData() {
            const fen = chess.fen();
            setFen(fen);
            setLoading(true);
            // Fetch Opening Explorer Data
            try {
                const res = await fetch(
                    `https://explorer.lichess.ovh/masters?fen=${fen}&moves=20&topGames=0`
                );
                const data = await res.json();
                setMoveData(data);
                setError(false);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(true);
            }
        }

        getData();
    }, [chess.fen()]);

    if (error) {
        return (
            <View style={styles.wrapper}>
                <Text>Could Not fetch Data</Text>
            </View>
        );
    }

    if (loading) {
        return (
            <View style={styles.wrapper}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <Body style={styles.leftText}>Move</Body>
                <Body style={styles.centerText}>Results</Body>
                <Body style={styles.rightText}>Games</Body>
            </View>
            <ScrollView>
                {moveData.moves.map((moveObj, index) => {
                    return <OpeningMove moveObj={moveObj} key={index} index={index} onPress={onPress}/>;
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: "100%",
    },
    header: {
        backgroundColor: Colors.card2,
        width: "100%",
        paddingHorizontal: 5,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
    },
    leftText: {
        width: 80,
    },
    centerText: {
        flex: 1,
    },
    rightText: {
        width: 60,
    },
});
