import { StyleSheet, View } from "react-native";
import Body from "../text/Body";
import { Colors } from "../../styling";

export default function ResultBar({ white, draws, black }) {
    const total = white + draws + black;
    const whitePercent = (white / total) * 100;
    const drawPercent = (draws / total) * 100;
    const blackPercent = (black / total) * 100;

    // const whitePercent = 0
    // const drawPercent = 0
    // const blackPercent = 100

    const roundedWhite = Math.round(whitePercent);
    const roundedDraw = Math.round(drawPercent);
    const roundedBlack = 100 - roundedWhite - roundedDraw;

    let centrePoint = roundedWhite + roundedDraw / 2 - 3;
    if (roundedWhite === 0 && !(roundedBlack === 0)) {
        centrePoint = 1;
    }
    if (roundedBlack === 0 && !(roundedWhite === 0)) {
        centrePoint = 86;
    }

    return (
        <View style={styles.wrapper}>
            <View style={[styles.whiteBar, { width: `${whitePercent}%` }]} />
            <View style={[styles.drawBar, { width: `${drawPercent}%` }]} />
            <View style={[styles.blackBar, { width: `${blackPercent}%` }]} />
            {whitePercent >= 10 && (
                <Body style={[styles.smallText, { left: 1 }]}>{roundedWhite}%</Body>
            )}
            {drawPercent >= 10 && (
                <Body style={[styles.smallText, { left: `${centrePoint}%` }]}>{roundedDraw}%</Body>
            )}
            {blackPercent >= 10 && (
                <Body style={[styles.smallText, { right: 1, color: Colors.background }]}>
                    {roundedBlack}%
                </Body>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    whiteBar: {
        height: 20,
        backgroundColor: Colors.background,
    },
    drawBar: {
        height: 20,
        backgroundColor: Colors.card3,
    },
    blackBar: {
        height: 20,
        backgroundColor: Colors.black,
    },
    smallText: {
        position: "absolute",
        fontSize: 12,
    },
});
