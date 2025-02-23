import React, { useEffect } from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import HomeLayout from "./app/home/_layout";
import ChallengeLayout from "./app/challenge/_layout";
import WorkoutsScreen from "./app/workouts/_layout";
import ExercisesLayout from "./app/exercises/_layout";

import * as helper from "./utils/globalSettingsHelper";

const Tab = createBottomTabNavigator();

const CustomTabBarIcon = ({ source, color, size }) => {
    return <Image source={source} style={{ width: size, height: size }} />;
};

export default function App() {
    useEffect(() => {
        helper.initGlobalSettings();
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Tab.Navigator screenOptions={{ headerShown: false }}>
                    <Tab.Screen
                        name="Home"
                        component={HomeLayout}
                        options={{
                            title: "Home",
                            tabBarIcon: ({ color, size }) => (
                                <CustomTabBarIcon
                                    source={require("./assets/tabs/home.png")}
                                    color={color}
                                    size={size}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Challenge"
                        component={ChallengeLayout}
                        options={{
                            title: "Challenge",
                            tabBarIcon: ({ color, size }) => (
                                <CustomTabBarIcon
                                    source={require("./assets/tabs/challenge.png")}
                                    color={color}
                                    size={size}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Workouts"
                        component={WorkoutsScreen}
                        options={{
                            title: "Workouts",
                            tabBarIcon: ({ color, size }) => (
                                <CustomTabBarIcon
                                    source={require("./assets/tabs/Workouts.jpg")}
                                    color={color}
                                    size={size}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Exercises"
                        component={ExercisesLayout}
                        options={{
                            title: "Exercises",
                            tabBarIcon: ({ color, size }) => (
                                <CustomTabBarIcon
                                    source={require("./assets/tabs/user.png")}
                                    color={color}
                                    size={size}
                                />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}
