import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./index";
import RecordsScreen from "./records";
import DetailsScreen from "./details";
import BeginScreen from "./begin";
import EndScreen from "./end";

const Stack = createStackNavigator();

export default function Home() {
    return (
        <Stack.Navigator
            initialRouteName="home"
            screenOptions={{
                headerBackTitleVisible: false,
                headerTintColor: "#000",
                headerStyle: { backgroundColor: "#fff" },
                headerShadowVisible: false,
            }}>
            <Stack.Screen
                name="home"
                component={HomeScreen}
                options={{ title: "", headerBackTitle: "" }}
            />
            <Stack.Screen
                name="records"
                component={RecordsScreen}
                options={{ title: "Challenge", headerBackTitle: "" }}
            />
            <Stack.Screen
                name="details"
                component={DetailsScreen}
                options={{ title: "", headerBackTitle: "" }}
            />
            <Stack.Screen
                name="begin"
                component={BeginScreen}
                options={{ title: "", headerBackTitle: "", gestureEnabled: false }}
            />
            <Stack.Screen
                name="end"
                component={EndScreen}
                options={{ title: "", headerBackTitle: "" }}
            />
        </Stack.Navigator>
    );
}
