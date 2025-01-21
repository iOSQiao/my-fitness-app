import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import HomeScreen from "./index";
import DetailsScreen from "./details";

export default function App() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Challenges"
                component={HomeScreen}
                options={{
                    title: "Challenges",
                    headerStyle: { backgroundColor: "#ff6347" }, // Tomato header background
                    headerTintColor: "#fff", // White header text
                    headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
                }}
            />
            <Stack.Screen
                name="Challenge"
                component={DetailsScreen}
                options={{
                    title: "Challenge",
                    headerStyle: { backgroundColor: "#ff6347" },
                    headerTintColor: "#fff",
                    headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
                }}
            />
        </Stack.Navigator>
    );
}
