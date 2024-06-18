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

  const handleParentSiblingPress = (parentSibling) => {
    navigateToParentNode(currentNode, setCurrentNode, chess);
    navigateToParentNode(currentNode.parent, setCurrentNode, chess);
    navigateToChildNode(parentSibling.move, currentNode.parent.parent, setCurrentNode, chess, true);
  };

  const handleChildPress = (child) => {
    navigateToChildNode(child.move, currentNode, setCurrentNode, chess, true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.parentColumn}>
        {currentNode.parent && currentNode.parent.parent && currentNode.parent.parent.children.map((parentSibling, index) => (
          <Button
            key={index}
            title={parentSibling.move}
            onPress={() => handleParentSiblingPress(parentSibling)}
            color={parentSibling === currentNode.parent ? '#000' : '#666'}
          />
        ))}
        {currentNode.parent && (!currentNode.parent.parent || !currentNode.parent.parent.children.includes(currentNode.parent)) && (
          <Button title={currentNode.parent.move} onPress={handleParentPress} color="#000" />
        )}
      </ScrollView>
      <ScrollView style={styles.mainColumn}>
        {currentNode.parent && currentNode.parent.children.map((sibling, index) => (
          <Button
            key={index}
            title={sibling.move}
            onPress={() => handleSiblingPress(sibling)}
            color={sibling === currentNode ? '#000' : '#666'}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
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