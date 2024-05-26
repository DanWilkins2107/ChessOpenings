import Container from "../components/Container";
import { Image, Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const LoginScreen = () => {
  return (
    <Container>
      <View style={styles.container}>
        <Image source={require('../assets/favicon.png')} style={styles.logo} />
        <Text style={styles.loginTitle}>Login</Text>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
        <TouchableOpacity onPress={() => console.log('Forgot password pressed')}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={() => console.log('Login pressed')}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.orLine} />
        </View>
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={() => console.log('Apple login pressed')}>
            <Text style={styles.loginButtonText}>Apple Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={() => console.log('Google login pressed')}>
            <Text style={styles.loginButtonText}>Google Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Not got an Account? </Text>
          <TouchableOpacity style={styles.loginButton} onPress={() => console.log('Sign up pressed')}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Add horizontal padding
    backgroundColor: '#000', // Set background color to black
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff', // Set text color to white
    textAlign: 'center', // Center text
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#eee', // Set background color to off-white
    borderRadius: 10, // Make input rounded
    width: '100%', // Make input full width
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#C7B8EA', // Set text color to lavender
    textAlign: 'center', // Center text
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#C7B8EA', // Set background color to lavender
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  loginButtonText: {
    fontSize: 16,
    color: '#fff', // Set text color to white
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#00d4ff',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#fff', // Set text color to white
  },
  socialLoginContainer: {
    marginTop: 20,
  },
  signupContainer: {
    borderTopWidth: 1,
    borderTopColor: '#00d4ff',
    marginTop: 20,
    paddingTop: 20,
    flexDirection: 'row', // Make signup container a row
  },
  signupText: {
    fontSize: 16,
    color: '#fff', // Set text color to white
  },
});

export default LoginScreen;