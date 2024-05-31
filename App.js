import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgottenPasswordScreen from "./screens/ForgottenPasswordScreen";
import { AlertProvider } from "./components/alert/AlertContextProvider";
import Alert from "./components/alert/Alert";
import DashboardScreen from "./screens/DashboardScreen.jsx";
import DailyTestDashScreen from "./screens/DailyTestDashScreen.jsx";
import CustomTestingScreen from "./screens/CustomTestingScreen.jsx";

const Stack = createStackNavigator();

const authScreens = [
  { name: "Login", component: LoginScreen },
  { name: "SignUp", component: SignUpScreen },
  { name: "ForgottenPassword", component: ForgottenPasswordScreen },
];

const userScreens = [
  { name: "Dashboard", component: DashboardScreen },
  { name: "DailyTestDash", component: DailyTestDashScreen },
  { name: "CustomTesting", component: CustomTestingScreen },
];

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <AlertProvider>
      <NavigationContainer>
        <Alert />
        <Stack.Navigator initialRouteName={user ? "UserDashboard" : "Login"}>
          {(user ? userScreens : authScreens).map((screen) => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
              options={{ headerShown: false }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </AlertProvider>
  );
};

export default App;