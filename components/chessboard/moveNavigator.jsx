import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';

function MoveNavigator({ tree }) {
  const [current, setCurrent] = useState(tree);
  const [path, setPath] = useState([tree]);

  const handleParentPress = () => {
    if (path.length > 1) {
      const newPath = path.slice(0, path.length - 1);
      setCurrent(newPath[newPath.length - 1]);
      setPath(newPath);
    }
  };

  const handleChildPress = (child) => {
    setCurrent(child);
    setPath([...path, child]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.parentColumn}>
        {path.length > 1 && (
          <Button title={path[path.length - 2].move} onPress={handleParentPress} color="#000" />
        )}
      </ScrollView>
      <ScrollView style={styles.mainColumn}>
        <Button title={current.move} color="#000" />
      </ScrollView>
      <ScrollView style={styles.childrenColumn}>
        {current.children.map((child, index) => (
          <Button key={index} title={child.move} onPress={() => handleChildPress(child)} color="#000" />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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