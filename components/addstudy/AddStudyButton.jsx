import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AddStudyButton = ({ title, onPress, colors, textColor, icon }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={colors}
        style={styles.button}
      >
        <View style={styles.buttonContent}>
          {icon}
          <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginLeft: 10,
  },
});

export default AddStudyButton;