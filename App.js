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
import ViewStudyScreen from "./screens/ViewStudyScreen.jsx";
import AddStudyScreen from "./screens/AddStudyScreen.jsx";
import ChooseTrainStudyScreen from "./screens/ChooseTrainStudyScreen.jsx";
import ChooseViewStudyScreen from "./screens/ChooseViewStudyScreen.jsx";
import TrainScreen from "./screens/TrainScreen.jsx";
import DailyTestScreen from "./screens/DailyTestScreen.jsx";
import ChangePlanScreen from "./screens/ChangePlanScreen.jsx";
import { Image } from "react-native";

const Stack = createStackNavigator();

const authScreens = [
    { name: "Login", component: LoginScreen, header: false },
    { name: "SignUp", component: SignUpScreen, header: false },
    { name: "ForgottenPassword", component: ForgottenPasswordScreen, header: false },
];

const userScreens = [
    { name: "Dashboard", component: DashboardScreen, header: true },
    { name: "DailyTestDash", component: DailyTestDashScreen, header: true },
    { name: "ViewStudy", component: ViewStudyScreen, header: true },
    { name: "AddStudy", component: AddStudyScreen, header: true },
    { name: "ChooseTrainStudy", component: ChooseTrainStudyScreen, header: true },
    { name: "ChooseViewStudy", component: ChooseViewStudyScreen, header: true },
    { name: "Train", component: TrainScreen, header: true },
    { name: "DailyTest", component: DailyTestScreen, header: true },
    { name: "ChangePlan", component: ChangePlanScreen, header: true },
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
                            options={
                                screen.header
                                    ? {
                                          headerTitle: (props) => (
                                              <Image
                                                  source={require("./assets/favicon.png")}
                                                  style={{ width: 40, height: 40 }}
                                              />
                                          ),
                                          
                                          
                                          headerTransparent: true,
                                      }
                                    : { headerShown: false }
                            }
                        />
                    ))}
                </Stack.Navigator>
            </NavigationContainer>
        </AlertProvider>
    );
};

export default App;
