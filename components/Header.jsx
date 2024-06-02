import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const Header = ({ showBackButton }) => {
  const navigation = useNavigation();

  const handleGoToDashboard = () => {
    navigation.navigate("Dashboard");
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.logoContainer}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="chevron-left" size={20} color="#fff" />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={handleGoToDashboard}>
        <Image
          source={require("../assets/favicon.png")}
          style={styles.logo}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
});

export default Header;