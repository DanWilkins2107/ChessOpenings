import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const AddStudyButton = ({ title, onPress, backgroundColor, borderColor, textColor }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, { backgroundColor, borderColor, borderWidth: 2 }]}>
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default AddStudyButton;