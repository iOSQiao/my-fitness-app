import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import HomeScreen from "./index";
// import DetailsScreen from "./details";

import RecordsScreen from "../home/records";
import DetailsScreen from "../home/details";
import BeginScreen from "../home/begin";
import EndScreen from "../home/end";

export default function App() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Workouts"
                component={HomeScreen}
                options={{
                    title: "Workouts",
                    headerStyle: { backgroundColor: "#ff6347" }, // Tomato header background
                    headerTintColor: "#fff", // White header text
                    headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
                }}
            />
            {/* <Stack.Screen
                name="Workout"
                component={DetailsScreen}
                options={{
                    title: "Workout",
                    headerStyle: { backgroundColor: "#ff6347" },
                    headerTintColor: "#fff",
                    headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
                }}
            /> */}
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
                options={{ title: "", headerBackTitle: "", gestureEnabled: true }}
            />
            <Stack.Screen
                name="end"
                component={EndScreen}
                options={{ title: "", headerBackTitle: "" }}
            />
        </Stack.Navigator>
    );
}
