import React from 'react';
import { View, ScrollView, StyleSheet, Button } from 'react-native';

const MoveNavigator = ({ tree, path, currentNode, handleParentPress, handleChildPress, onMove, turn }) => {
  const isWhiteTurn = turn === 'w';

  return (
    <View style={styles.container}>
      <ScrollView style={styles.parentColumn}>
        {path.length > 1 && (
          <Button title={path[path.length - 2].move} onPress={handleParentPress} color="#000" />
        )}
      </ScrollView>
      <ScrollView style={styles.mainColumn}>
        <Button title={currentNode.move} color="#000" />
      </ScrollView>
      <ScrollView style={styles.childrenColumn}>
        {currentNode.children.map((child, index) => (
          <Button key={index} title={child.move} onPress={() => handleChildPress(child)} color="#000" />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parentColumn: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  mainColumn: {
    flex: 1,
    backgroundColor: '#fff',
  },
  childrenColumn: {
    flex: 1,
    backgroundColor: '#ccc',
  },
});

export default MoveNavigator;