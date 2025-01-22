import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import LevelView from "../../components/home/LevelView";
import * as helper from "../../utils/challengeDataHelper";

export default function DetailsScreen({ route, navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: `Day ${route.params.currentDay + 1}`,
        });
    }, [navigation]);

    const [title, setTitle] = React.useState("");
    const [img, setImg] = React.useState(null);
    const [level, setLevel] = useState(1);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const challengeId = route.params.challengeId;
        const settings = await helper.getChallengeSettings();
        const index = settings.challenges.findIndex((c) => c.id === challengeId);
        const challenge = settings.challenges[index];
        setTitle(challenge?.title || "");
        setImg(challenge?.img || null);
        setExercises(challenge?.exercises || []);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        // 格式化为两位数
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(remainingSeconds).padStart(2, "0");

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    useEffect(() => {
        let mseconds = 0;
        exercises.forEach((exercise) => {
            mseconds += exercise.duration;
        });
        setMseconds(mseconds);
    }, [exercises]);

    const [mseconds, setMseconds] = useState(0);
    const [seconds, setSeconds] = useState(45);
    const [calories, setCalories] = useState(5);

    const handleChangeLevel = (level) => {
        setLevel(level);
        setCalories(5 + (level - 1) * 5);
    };

    const handleSub = () => {
        if (seconds <= 5) {
            return;
        }
        setSeconds(seconds - 5);
    };

    const handleAdd = () => {
        setSeconds(seconds + 5);
    };

    const handleStart = () => {
        // TODO
        navigation.navigate("end", {
            challengeId: route.params.challengeId,
            currentDay: route.params.currentDay,
        });
    };

    const renderCenter = useMemo(() => {
        return (
            <View style={styles.center}>
                <View style={styles.item}>
                    <Text style={styles.value}>{formatTime(mseconds)}</Text>
                    <Text style={styles.label}>Minutes</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.value}>{seconds}</Text>
                    <Text style={styles.label}>Seconds</Text>
                    <View style={styles.countdown}>
                        <View style={styles.sub}>
                            <TouchableOpacity onPress={handleSub}>
                                <Ionicons name="remove-circle-outline" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.add}>
                            <TouchableOpacity onPress={handleAdd}>
                                <Ionicons name="add-circle-outline" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.item}>
                    <Text style={styles.value}>{calories}</Text>
                    <Text style={styles.label}>Calories</Text>
                </View>
            </View>
        );
    });

    const renderExercises = useMemo(() => {
        return exercises.map((exercise, index) => (
            <View key={index} style={styles.exerciseCell}>
                <Image source={exercise.img} style={styles.exerciseImg} />
                <View>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseDuration}>{exercise.duration} seconds</Text>
                </View>
            </View>
        ));
    }, [exercises]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.container}>
                <View style={styles.scrollViewContainer}>
                    <ScrollView>
                        <View style={styles.header}>
                            <Image source={img} style={styles.bg} />
                            <Text style={styles.title}>{title}</Text>
                        </View>
                        <View style={styles.main}>
                            <LevelView level={level} onChange={handleChangeLevel} />
                            {renderCenter}
                            <Text style={styles.exercisesTitle}>Exercises</Text>
                            <View style={styles.divide}></View>
                            {renderExercises}
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.startBtnContainer}>
                    <View style={styles.startBtn}>
                        <TouchableOpacity onPress={handleStart}>
                            <Text style={styles.startLabel}>START</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
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
    },
    title: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        color: "#fff",
        fontSize: 24,
        lineHeight: 24,
        fontWeight: "bold",
        padding: 10,
        textAlign: "center",
    },
    startBtnContainer: {
        width: "100%",
        height: 85,
        backgroundColor: "#fff",
        flexDirection: "row",
    },
    startBtn: {
        flex: 1,
        height: 55,
        margin: 15,
        backgroundColor: "#4f3f82",
    },
    startLabel: {
        color: "#fff",
        fontSize: 18,
        lineHeight: 55,
        fontWeight: "bold",
        textAlign: "center",
    },
    main: {
        flexDirection: "column",
        paddingTop: 20,
    },
    exercisesTitle: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 16,
        textAlign: "center",
        width: "100%",
        marginTop: 60,
    },
    divide: {
        width: "100%",
        height: 1,
        backgroundColor: "lightgray",
        marginTop: 15,
        marginBottom: 20,
    },
    exerciseCell: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
    exerciseImg: {
        width: 120,
        height: 80,
        resizeMode: "cover",
    },
    exerciseName: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 16,
        marginLeft: 10,
    },
    exerciseDuration: {
        color: "gray",
        fontSize: 14,
        fontWeight: "normal",
        lineHeight: 14,
        marginLeft: 10,
        marginTop: 5,
    },
    center: {
        marginTop: 20,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    item: {
        flex: 1,
        alignItems: "center",
    },
    value: {
        color: "#000",
        fontSize: 24,
        fontWeight: "bold",
        lineHeight: 24,
    },
    label: {
        marginTop: 10,
        color: "gray",
        fontSize: 14,
        fontWeight: "normal",
        lineHeight: 14,
    },
    countdown: {
        flexDirection: "row",
        marginTop: 15,
        gap: 10,
    },
    sub: {
        width: 30,
        height: 30,
    },
    add: {
        width: 30,
        height: 30,
    },
});
