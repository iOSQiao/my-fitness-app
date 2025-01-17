import React from "react";
import { ScrollView, View, Image, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function ChallengesView() {
    const items = [
        { id: "1", uri: require("../../assets/images/home/test_challenges.png"), title: "The Squat Challenge", desc: '30 days'  },
        { id: "2", uri: require("../../assets/images/home/test_challenges.png"), title: "Squat Variations", desc: '30 days'  },
        { id: "3", uri: require("../../assets/images/home/test_challenges.png"), title: "For Beginners", desc: '30 days'  },
        { id: "4", uri: require("../../assets/images/home/test_challenges.png"), title: "Cardio & Squat - Booty Burn", desc: '30 days'  },
    ];

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {items.map((item, index) => (
                <View key={index} style={styles.container}>
                    <Image source={item.uri} style={styles.image} />
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.desc}>{item.desc}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.75,
        height: 240,
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
    desc: {
        position: "absolute",
        right: 15,
        top: 15,
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 5,
        borderRadius: 5,
    },
});
