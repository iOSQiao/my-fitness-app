import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CurrentChallenge({ title, img, currentDay, workouts, minutes, onPress }) {
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(remainingSeconds).padStart(2, "0");

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onPress()}>
                <View style={styles.header}>
                    <View style={styles.item}>
                        <Text style={styles.value}>{workouts}</Text>
                        <Text style={styles.label}>Workouts Total</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.value}>{formatTime(minutes)}</Text>
                        <Text style={styles.label}>Minutes Total</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <Image source={img} style={styles.image}></Image>
                    <Text style={styles.day}>day {currentDay}</Text>
                    <Text style={styles.challenge}>current challenge</Text>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </TouchableOpacity>
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
