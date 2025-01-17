import { View, Text, StyleSheet } from "react-native";

export default function WorkoutsScreen() {
    return (
        <View style={styles.screen}>
            <Text>Workouts Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
