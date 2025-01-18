import React from "react";
import { ScrollView, View, Image, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function WorkoutsView() {
    const items = [
        {
            uri: require("../../assets/planks.jpg"),
            title: "Burpees, Squats & Planks",
        },
        {

            uri: require("../../assets/shape-body.jpg"),
            title: "Shape your body",
        },
        {

            uri: require("../../assets/HIIT.jpg"),
            title: "HIIT Workout",
        },
        {
            uri: require("../../assets/squat-variations.jpg"),
            title: "Squat Variations",
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
