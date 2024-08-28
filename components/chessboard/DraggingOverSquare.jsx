import { View, StyleSheet } from "react-native";

const DraggingOverSquare = ({ square, squareWidth, rows, cols }) => {
    if (!square) {
        return null;
    }
    const rowIndex = rows.indexOf(square[1]);
    const colIndex = cols.indexOf(square[0]);
    
    return (
        <View style={styles.container}>
            {square && (
                <View
                    style={[
                        {
                            top: rowIndex * squareWidth - squareWidth / 2,
                            left: colIndex * squareWidth - squareWidth / 2,
                            width: squareWidth * 2,
                            height: squareWidth * 2,
                        },
                        styles.circle,
                    ]}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    circle: {
        position: "absolute",
        borderRadius: 100,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
});

export default DraggingOverSquare;
