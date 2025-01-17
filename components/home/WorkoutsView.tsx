import React from "react";
import { ScrollView, View, Image, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function WorkoutsView() {
    const items = [
        {
            id: "1",
            uri: require("../../assets/images/home/test_workouts.png"),
            title: "Squat Variations",
        },
        {
            id: "2",
            uri: require("../../assets/images/home/test_workouts.png"),
            title: "Fat Burning HIIT Workout",
        },
        {
            id: "3",
            uri: require("../../assets/images/home/test_workouts.png"),
            title: "Tone your Butt Thighs and Legs",
        },
        {
            id: "4",
            uri: require("../../assets/images/home/test_workouts.png"),
            title: "Cardio & Squat - Booty Burn",
        },
    ];

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {items.map((item, index) => (
                <View key={index} style={styles.container}>
                    <Image source={item.uri} style={styles.image} />
                    <Text style={styles.title}>{item.title}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.55,
        height: 160,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 4,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    title: {
        position: "absolute",
        left: 5,
        bottom: 5,
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        backgroundColor: "transparent",
        padding: 5,
    },
});
