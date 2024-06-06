import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const StudyIconPicker = ({ icon, setIcon }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log('Pick an icon')}>
        {icon ? (
          <Image source={{ uri: icon }} style={styles.icon} />
        ) : (
          <View style={styles.iconPlaceholder}>
            <Text>Pick an icon</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StudyIconPicker;