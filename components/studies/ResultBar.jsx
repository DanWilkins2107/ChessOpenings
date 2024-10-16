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
            <View style={[styles.whiteBar, { width: `${whitePercent}%` }]}>
                {whitePercent >= 10 && (
                    <Body style={[styles.smallText, styles.whitePercentText]}>{roundedWhite}%</Body>
                )}
            </View>
            <View style={[{ width: `${drawPercent}%` }, styles.drawBar]}>
                {drawPercent >= 10 && (
                    <Body style={[styles.smallText, styles.drawPercentText]}>{roundedDraw}%</Body>
                )}
            </View>
            <View style={[styles.blackBar, { width: `${blackPercent}%` }]}>
                {blackPercent >= 10 && (
                    <Body style={[styles.smallText, styles.blackPercentText]}>{roundedBlack}%</Body>
                )}
            </View>
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
        display: "flex",
        justifyContent: "center",
    },
    drawBar: {
        height: 20,
        backgroundColor: Colors.card3,
        display: "flex",
        justifyContent: "center",
    },
    blackBar: {
        height: 20,
        display: "flex",
        flexDirectionL: "row",
        backgroundColor: Colors.black,
        justifyContent: "center",
    },
    whitePercentText: {
        textAlign: "left",
    },
    drawPercentText: {
        textAlign: "center",
    },
    blackPercentText: {
        color: Colors.background,
        textAlign: "right",
    },
    smallText: {
        fontSize: 12,
        marginHorizontal: 2,
        height: 15,
        justifyContent: "center",
    },
});
