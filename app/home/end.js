import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as helper from "../../utils/globalSettingsHelper";
import { Ionicons } from "@expo/vector-icons";

export default function EndScreen({ route, navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
        return () => {
            navigation.setOptions({
                headerShown: true,
            });
        };
    }, [navigation]);

    const [title, setTitle] = React.useState("");
    const [img, setImg] = React.useState(null);
    const [currentDay, setCurrentDay] = useState(0);
    const [durationMinutes, setDurationMinutes] = useState(1);
    const [exercisesTotal, setExercisesTotal] = useState(0);
    const [calories, setCalories] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const settings = await helper.getGlobalSettings();
        if (route.params.isWorkout) {
            const workoutId = route.params.workoutId;
            const index = settings.workouts.findIndex((c) => c.id === workoutId);
            const workout = settings.workouts[index];
            setTitle(workout?.title || "");
            setImg(workout?.img || null);
            setDurationMinutes(route.params.durationMinutes);
            setExercisesTotal(route.params.exercisesTotal);
            setCalories(route.params.calories);
        } else {
            const challengeId = route.params.challengeId;
            const index = settings.challenges.findIndex((c) => c.id === challengeId);
            const challenge = settings.challenges[index];
            setTitle(challenge?.title || "");
            setImg(challenge?.img || null);
            setCurrentDay(route.params.currentDay + 1);
            setDurationMinutes(route.params.durationMinutes);
            setExercisesTotal(route.params.exercisesTotal);
            setCalories(route.params.calories);
        }
    };

    const handleContinue = () => {
        navigation.popToTop();
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(remainingSeconds).padStart(2, "0");

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#fff",
                paddingTop: 0,
                paddingBottom: insets.bottom,
            }}>
            <View style={styles.container}>
                <View style={styles.scrollViewContainer}>
                    <ScrollView>
                        <View style={styles.header}>
                            <Image source={img} style={styles.bg} />
                            <Text style={styles.title}>{title}</Text>
                            {route.params.isWorkout ? null : <Text style={styles.currentDay}>Day {currentDay}</Text>}
                        </View>
                        <View style={styles.main}>
                            <View style={styles.result}>
                                <View style={styles.item}>
                                    <Text style={styles.value}>
                                        {formatTime(durationMinutes)}
                                    </Text>
                                    <Text style={styles.label}>Minutes</Text>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.value}>{exercisesTotal}</Text>
                                    <Text style={styles.label}>Exercises</Text>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.value}>{calories}</Text>
                                    <Text style={styles.label}>Calories</Text>
                                </View>
                            </View>
                            <View style={styles.divide}></View>
                            <View style={styles.content}>
                                <Ionicons name="trophy-outline" size={45} color="#000" />
                                <Text style={styles.desc}>
                                    Amazing work! You've crushed the workout.
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.btnContainer}>
                    <View style={styles.btn}>
                        <TouchableOpacity onPress={handleContinue}>
                            <Text style={styles.btnLabel}>CONTINUE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollViewContainer: {
        flex: 1,
    },
    header: {
        backgroundColor: "#000",
        width: "100%",
        minHeight: 200,
    },
    bg: {
        width: "100%",
        height: 240,
    },
    title: {
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        color: "#fff",
        fontSize: 24,
        lineHeight: 24,
        fontWeight: "bold",
        padding: 10,
        textAlign: "center",
    },
    currentDay: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        color: "#fff",
        fontSize: 16,
        lineHeight: 16,
        textAlign: "center",
    },
    main: {
        flexDirection: "column",
    },
    result: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
        paddingBottom: 30,
    },
    item: {
        flex: 1,
        alignItems: "center",
        rowGap: 10,
    },
    value: {
        fontSize: 40,
        lineHeight: 40,
        fontWeight: "bold",
        color: "#000",
    },
    label: {
        fontSize: 12,
        lineHeight: 12,
        color: "gray",
    },
    divide: {
        height: 1,
        backgroundColor: "gray",
        opacity: 0.2,
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
        paddingBottom: 30,
    },
    desc: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
        marginTop: 30,
    },
    btnContainer: {
        width: "100%",
        height: 85,
        backgroundColor: "#fff",
        flexDirection: "row",
    },
    btn: {
        flex: 1,
        height: 55,
        margin: 15,
        backgroundColor: "#4f3f82",
    },
    btnLabel: {
        color: "#fff",
        fontSize: 18,
        lineHeight: 55,
        fontWeight: "bold",
        textAlign: "center",
    },
});
