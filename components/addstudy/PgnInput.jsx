import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const PgnInput = ({ pgnText, setPgnText }) => {
  return (
    <TextInput
      style={styles.pgnTextInput}
      placeholder="Copy PGN text here..."
      value={pgnText}
      onChangeText={(text) => setPgnText(text)}
      multiline={true}
    />
  );
};

const styles = StyleSheet.create({
  pgnTextInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    height: "20%",
    textAlignVertical: "top",
  },
});

export default PgnInput;