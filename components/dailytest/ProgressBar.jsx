import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ProgressBar = ({ completedLines, totalLines, correctLines }) => {
  const rectangles = [];

  for (let i = 0; i < totalLines; i++) {
    const isCompleted = i < completedLines;
    const isCorrect = i < correctLines;

    rectangles.push(
      <View key={i} style={styles.rectangle}>
        {isCompleted ? (
          <LinearGradient
            colors={isCorrect ? ["#00ff00", "#008000"] : ["#ff0000", "#800000"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          />
        ) : (
          <View style={styles.incomplete} />
        )}
      </View>
    );
  }

  return <View style={styles.progressBar}>{rectangles}</View>;
};

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  rectangle: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  gradient: {
    flex: 1,
    borderRadius: 5,
  },
  incomplete: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#333",
  },
});

export default ProgressBar;