import { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import OpeningMove from "./OpeningMove";
import { Colors } from "../../styling";
import Body from "../text/Body";
import Icon from "react-native-vector-icons/FontAwesome5";
import Subheading2 from "../text/Subheading2";

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
            <View style={styles.errorWrapper}>
                <Icon name="exclamation-triangle" size={20} color={Colors.text} />
                <Subheading2 style={styles.errorText}>Could not fetch opening data</Subheading2>
            </View>
        );
    }

    if (loading) {
        return (
            <View style={styles.wrapper}>
                <ActivityIndicator color={Colors.text} />
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
            {moveData.moves.length === 0 ? (
                <View style={styles.errorWrapper}>
                    <Body>No opening data found for this position</Body>
                </View>
            ) : (
                <ScrollView>
                    {moveData.moves.map((moveObj, index) => {
                        return (
                            <OpeningMove
                                moveObj={moveObj}
                                key={index}
                                index={index}
                                onPress={onPress}
                            />
                        );
                    })}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
    },
    errorWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    errorText: {
        marginTop: 5,
    },
});
