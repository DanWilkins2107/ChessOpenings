import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";
import { View, Text } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgottenPasswordScreen from "./screens/ForgottenPasswordScreen";
import { AlertProvider } from "./components/alert/AlertContextProvider";
import Alert from "./components/alert/Alert";
import { ModalProvider } from "./components/modal/ModalContextProvider.jsx";
import Modal from "./components/modal/Modal.jsx";
import DashboardScreen from "./screens/DashboardScreen.jsx";
import DailyTestDashScreen from "./screens/DailyTestDashScreen.jsx";
import ViewStudyScreen from "./screens/ViewStudyScreen.jsx";
import AddStudyScreen from "./screens/AddStudyScreen.jsx";
import ChooseTrainStudyScreen from "./screens/ChooseTrainStudyScreen.jsx";
import ChooseViewStudyScreen from "./screens/ChooseViewStudyScreen.jsx";
import TrainScreen from "./screens/TrainScreen.jsx";
import DailyTestScreen from "./screens/DailyTestScreen.jsx";
import ChangePlanScreen from "./screens/ChangePlanScreen.jsx";
import HeaderCenter from "./components/header/HeaderCenter.jsx";
import HeaderLeft from "./components/header/HeaderLeft.jsx";
import { useFonts } from "expo-font";
import Dashboard from "./screens/Dashboard.jsx";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();

const authScreens = [
    { name: "Login", component: LoginScreen, header: false },
    { name: "SignUp", component: SignUpScreen, header: false },
    { name: "ForgottenPassword", component: ForgottenPasswordScreen, header: false },
];

actual = false;

let userScreens = [];

if (!actual) {
    userScreens = [
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
} else {
    userScreens = [{ name: "Dashboard", component: Dashboard, header: true }];
}

const App = () => {
    const [user, setUser] = useState(null);

    const [fontsLoaded] = useFonts({
        "Salsa-Regular": require("./assets/fonts/Salsa-Regular.ttf"),
    });

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, []);

    const Tab = createBottomTabNavigator();

    if (!fontsLoaded) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <AlertProvider>
            <ModalProvider>
                <NavigationContainer>
                    <Alert />
                    <Modal />
                    {!actual && <Stack.Navigator initialRouteName={user ? "UserDashboard" : "Login"}>


                        
                        {(user ? userScreens : authScreens).map((screen) => (
                            <Stack.Screen
                                key={screen.name}
                                name={screen.name}
                                component={screen.component}
                                options={
                                    screen.header
                                        ? {
                                              headerTitle: (props) => HeaderCenter(props),
                                              headerLeft: (props) => HeaderLeft(props),
                                              headerTransparent: true,
                                          }
                                        : { headerShown: false }
                                }
                            />
                        ))}
                    </Stack.Navigator>}
                    {actual && <Tab.Navigator>
                        <Tab.Screen name="Dashboard" component={Dashboard} />
                    </Tab.Navigator>}
                </NavigationContainer>
            </ModalProvider>
        </AlertProvider>
    );
};

export default App;
