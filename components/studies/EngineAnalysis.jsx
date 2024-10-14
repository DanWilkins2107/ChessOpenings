import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function EngineAnalysis({ chess }) {
    const [fen, setFen] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastAPICall, setLastAPICall] = useState(null);
    useEffect(() => {
        setFen(chess.fen());
    }, [chess.fen()]);
    return (
        <View>
            <Text>Engine Analysis</Text>
            <Text>{JSON.stringify(fen)}</Text>
        </View>
    );
}
