import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";
import { View, Text } from "react-native";
import { AlertProvider } from "./components/alert/AlertContextProvider";
import Alert from "./components/alert/Alert";
import { ModalProvider } from "./components/modal/ModalContextProvider.jsx";
import Modal from "./components/modal/Modal.jsx";
import HeaderCenter from "./components/header/HeaderCenter.jsx";
import HeaderLeft from "./components/header/HeaderLeft.jsx";
import { useFonts } from "expo-font";
import Dashboard from "./screens/Dashboard.jsx";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "./styling.js";
import Icon from "react-native-vector-icons/FontAwesome";
import Training from "./screens/Training.jsx";
import ChooseTrain from "./screens/ChooseTrain.jsx";
import TrainDashboard from "./screens/TrainDashboard.jsx";
import StudyDashboard from "./screens/StudyDashboard.jsx";
import ViewStudy from "./screens/ViewStudy.jsx";
import AddStudy from "./screens/AddStudy.jsx";
import Settings from "./screens/Settings.jsx";
import { MessageBoxProvider } from "./components/chessboard/MessageBoxContextProvider.jsx";
import Login from "./screens/Login.jsx";
import SignUp from "./screens/SignUp.jsx";
import ForgotPassword from "./screens/ForgotPassword.jsx";

const Stack = createStackNavigator();

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

    function AuthScreens() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        );
    }

    function StudyScreens() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="StudyDashboard"
                    component={StudyDashboard}
                    options={{
                        headerTitle: (props) => HeaderCenter(props),
                        headerTransparent: true,
                    }}
                />
                <Stack.Screen
                    name="AddStudy"
                    component={AddStudy}
                    options={{
                        headerTitle: (props) => HeaderCenter(props),
                        headerTransparent: true,
                        headerLeft: (props) => HeaderLeft(props),
                    }}
                />
                <Stack.Screen
                    name="ViewStudy"
                    component={ViewStudy}
                    options={{
                        headerTitle: (props) => HeaderCenter(props),
                        headerTransparent: true,
                        headerLeft: (props) => HeaderLeft(props),
                    }}
                />
            </Stack.Navigator>
        );
    }

    function TrainScreens() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="TrainDashboard"
                    component={TrainDashboard}
                    options={{
                        headerTitle: (props) => HeaderCenter(props),
                        headerTransparent: true,
                    }}
                />
                <Stack.Screen
                    name="ChooseTrain"
                    component={ChooseTrain}
                    options={{
                        headerTitle: (props) => HeaderCenter(props),
                        headerLeft: (props) => HeaderLeft(props),
                        headerTransparent: true,
                    }}
                />
                <Stack.Screen
                    name="Training"
                    component={WrappedTrainScreen}
                    options={{
                        headerTitle: (props) => HeaderCenter(props),
                        headerLeft: (props) => HeaderLeft(props),
                        headerTransparent: true,
                    }}
                />
            </Stack.Navigator>
        );
    }

    function SettingsScreens() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="UserSettings"
                    component={Settings}
                    options={{
                        headerTitle: (props) => HeaderCenter(props),
                        headerTransparent: true,
                    }}
                />
            </Stack.Navigator>
        );
    }

    function WrappedTrainScreen(navigation) {
        return (
            <MessageBoxProvider>
                <Training navigation={navigation} route={navigation.route} />
            </MessageBoxProvider>
        );
    }

    return (
        <AlertProvider>
            <ModalProvider>
                <NavigationContainer>
                    <Alert />
                    <Modal />
                    {user ? (
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
                                component={StudyScreens}
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
                            <Tab.Screen
                                name="Settings"
                                component={SettingsScreens}
                                options={{
                                    tabBarIcon: ({ color, size }) => {
                                        return <Icon name="cog" color={color} size={size} />;
                                    },
                                }}
                            />
                        </Tab.Navigator>
                    ) : (
                        <AuthScreens />
                    )}
                </NavigationContainer>
            </ModalProvider>
        </AlertProvider>
    );
};

export default App;
