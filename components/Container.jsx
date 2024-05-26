import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Container = ({ children }) => {
  return (
    <View style={styles.fill}>
      <LinearGradient
        colors={['#4949a2', '#191462']}
        style={styles.fill}
      >
        <SafeAreaView style={styles.innerContainer}>{children}</SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default Container;