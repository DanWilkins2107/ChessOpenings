import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const UrlButton = ({ url, setUrl, placeholder, title, onPress, colors, textColor, icon }) => {
  return (
    <View>
      <TextInput
        style={styles.urlTextInput}
        placeholder={placeholder}
        value={url}
        onChangeText={(text) => setUrl(text)}
      />
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
    </View>
  );
};

const styles = StyleSheet.create({
  urlTextInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
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

export default UrlButton;