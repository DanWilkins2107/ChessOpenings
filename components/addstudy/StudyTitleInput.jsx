import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const StudyTitleInput = ({ title, setTitle }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Study Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
});

export default StudyTitleInput;