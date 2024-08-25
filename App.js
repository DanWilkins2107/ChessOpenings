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
import { Colors } from "./styling.js";
import Icon from "react-native-vector-icons/FontAwesome";
import Training from "./screens/Training.jsx";

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

    function HomeScreens() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{
                        headerTitle: (props) => HeaderCenter(props),
                        headerTransparent: true,
                    }}
                />
            </Stack.Navigator>
        );
    }

    function TrainScreens() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Training"
                    component={Training}
                    options={{
                        headerTitle: (props) => HeaderCenter(props),
                        headerLeft: (props) => HeaderLeft(props),
                        headerTransparent: true,
                    }}
                />
            </Stack.Navigator>
        );
    }

    return (
        <AlertProvider>
            <ModalProvider>
                <NavigationContainer>
                    <Alert />
                    <Modal />
                    {!actual && (
                        <Stack.Navigator initialRouteName={user ? "UserDashboard" : "Login"}>
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
                        </Stack.Navigator>
                    )}
                    {actual && (
                        <Tab.Navigator
                            initialRouteName="Home"
                            screenOptions={{
                                headerShown: false,
                                tabBarStyle: {
                                    backgroundColor: Colors.background,
                                    borderTopWidth: 0,
                                },
                            }}
                        >
                            <Tab.Screen
                                name="Home"
                                component={HomeScreens}
                                options={{
                                    tabBarIcon: ({ color, size }) => {
                                        return <Icon name="home" color={color} size={size} />;
                                    },
                                }}
                            />
                            <Tab.Screen
                                name="Study"
                                component={Dashboard}
                                options={{
                                    tabBarIcon: ({ color, size }) => {
                                        return <Icon name="book" color={color} size={size} />;
                                    },
                                }}
                            />
                            <Tab.Screen
                                name="Train"
                                component={TrainScreens}
                                options={{
                                    tabBarIcon: ({ color, size }) => {
                                        return <Icon name="refresh" color={color} size={size} />;
                                    },
                                }}
                            />
                            <Tab.Screen name="Settings" component={Dashboard} options={{
                                    tabBarIcon: ({ color, size }) => {
                                        return <Icon name="cog" color={color} size={size} />;
                                    },
                                }}/>
                        </Tab.Navigator>
                    )}
                </NavigationContainer>
            </ModalProvider>
        </AlertProvider>
    );
};

export default App;
