import { View, ScrollView, StyleSheet, Button } from 'react-native';
import { navigateToParentNode, navigateToChildNode } from '../../functions/treeFunctions';

const MoveNavigator = ({ currentNode, chess, setCurrentNode }) => {
  const handleParentPress = () => {
    navigateToParentNode(currentNode, setCurrentNode, chess);
  };

  const handleSiblingPress = (sibling) => {
    navigateToParentNode(currentNode, setCurrentNode, chess);
    navigateToChildNode(sibling.move, currentNode.parent, setCurrentNode, chess, true);
  };

  const handleChildPress = (child) => {
    navigateToChildNode(child.move, currentNode, setCurrentNode, chess, true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.parentColumn}>
        {currentNode.parent && (
          <Button title={currentNode.parent.move} onPress={handleParentPress} color="#000" />
        )}
      </ScrollView>
      <ScrollView style={styles.mainColumn}>
        {currentNode.parent && currentNode.parent.children.map((sibling, index) => (
          <Button
            key={index}
            title={sibling.move}
            onPress={() => handleSiblingPress(sibling)}
            color={sibling === currentNode ? '#000' : '#ccc'}
          />
        ))}
        {!currentNode.parent && (
          <Button title={currentNode.move} color="#000" />
        )}
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