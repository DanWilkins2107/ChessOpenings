import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgottenPasswordScreen from "./screens/ForgottenPasswordScreen";
import { AlertProvider } from "./components/alert/AlertContextProvider";
import Alert from "./components/alert/Alert";

const Stack = createStackNavigator();

const App = () => {
  return (
    <AlertProvider>
      <NavigationContainer>
          <Alert />
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgottenPassword"
              component={ForgottenPasswordScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
      </NavigationContainer>
    </AlertProvider>
  );
};

export default App;