import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

export default function CurrentChallenge() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.item}>
                    <Text style={styles.value}>6</Text>
                    <Text style={styles.label}>Workouts</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.value}>9</Text>
                    <Text style={styles.label}>Minutes</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Image
                    source={require("../../assets/images/home/challenge_2.jpg")} // 替换为你的图片链接
                    style={styles.image}></Image>
                <Text style={styles.day}>day 5</Text>
                <Text style={styles.challenge}>current challenge</Text>
                <Text style={styles.title}>The Squat Challenge</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        marginTop: 16,
    },
    item: {
        flex: 1,
        direction: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    value: {
        fontSize: 36,
        lineHeight: 36,
        fontWeight: "bold",
        marginRight: 4,
    },
    label: {
        fontSize: 12,
        lineHeight: 12,
        color: "#999",
        marginTop: 4,
    },
    content: {
        margin: 16,
        height: 260,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    day: {
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: "#693b4b",
        fontSize: 16,
        lineHeight: 16,
        color: "#fff",
        fontWeight: "bold",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
    },
    challenge: {
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        color: "#fff",
        fontSize: 16,
        lineHeight: 16,
        textAlign: "center",
    },
    title: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        color: "#fff",
        fontSize: 24,
        lineHeight: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
});
