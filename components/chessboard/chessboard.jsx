import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const pieceImages = {
  b: {
    b: require("./pieces/bb.png"),
    k: require("./pieces/bk.png"),
    n: require("./pieces/bn.png"),
    p: require("./pieces/bp.png"),
    q: require("./pieces/bq.png"),
    r: require("./pieces/br.png"),
  },
  w: {
    b: require("./pieces/wb.png"),
    k: require("./pieces/wk.png"),
    n: require("./pieces/wn.png"),
    p: require("./pieces/wp.png"),
    q: require("./pieces/wq.png"),
    r: require("./pieces/wr.png"),
  },
};

const Chessboard = ({ position }) => {
  const rows = "abcdefgh".split("");
  const columns = "87654321".split("");

  return (
    <View style={styles.chessboardContainer}>
      <View style={styles.chessboard}>
        {columns.map((column, columnIndex) => (
          <View key={column} style={styles.row}>
            {rows.map((row, rowIndex) => {
              const piece = position[columnIndex][rowIndex];
              return (
                <View
                  key={row}
                  style={[
                    styles.square,
                    (columnIndex + rowIndex) % 2 === 0
                      ? styles.whiteSquare
                      : styles.blackSquare,
                  ]}
                >
                  {piece && (
                    <Image
                      source={pieceImages[piece.color][piece.type]}
                      style={styles.piece}
                    />
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </View>
      <View style={[styles.topAxis, styles.axis]}>
        {rows.map((row) => (
          <View key={row} style={styles.axisHolder}>
            <Text style={styles.axisText}>{row}</Text>
          </View>
        ))}
      </View>
      <View style={[styles.leftAxis, styles.axis]}>
        {columns.map((column) => (
          <View key={column} style={styles.axisHolder}>
            <Text style={styles.axisText}>{column}</Text>
          </View>
        ))}
      </View>
      <View style={[styles.rightAxis, styles.axis]}>
        {columns.map((column) => (
          <View key={column} style={styles.axisHolder}>
            <Text style={styles.axisText}>{column}</Text>
          </View>
        ))}
      </View>
      <View style={[styles.bottomAxis, styles.axis]}>
        {rows.map((row) => (
          <View key={row} style={styles.axisHolder}>
            <Text style={styles.axisText}>{row}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chessboardContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "white",
  },
  chessboard: {
    position: "absolute",
    top: "5%",
    left: "5%",
    width: "90%",
    height: "90%",
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black", // Changed from orange to black
  },
  row: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  square: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  whiteSquare: {
    backgroundColor: "white",
  },
  blackSquare: {
    backgroundColor: "gray",
  },
  piece: {
    width: "80%",
    height: "80%",
  },
  axis: {
    position: "absolute",
    display: "flex",
    justifyContent: "space-between",
  },
  topAxis: {
    left: "5%",
    width: "90%",
    height: "5%",
    flexDirection: "row",
  },
  leftAxis: {
    top: "5%",
    width: "5%",
    height: "90%",
    flexDirection: "column",
  },
  rightAxis: {
    right: "0%",
    top: "5%",
    width: "5%",
    height: "90%",
    flexDirection: "column",
  },
  bottomAxis: {
    bottom: "0%",
    left: "5%",
    width: "90%",
    height: "5%",
    flexDirection: "row",
  },
  axisHolder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  axisText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Chessboard;
