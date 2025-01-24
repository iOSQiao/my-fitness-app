import React, { useEffect, useMemo, useState, useRef } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import * as helper from "../../utils/challengeDataHelper";

export default function BeginScreen({ route, navigation }) {
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
    const exercisesRef = useRef([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const challengeId = route.params.challengeId;
        const settings = await helper.getChallengeSettings();
        const index = settings.challenges.findIndex((c) => c.id === challengeId);
        const challenge = settings.challenges[index];
        setTitle(challenge?.name || "");
        setImg(challenge?.img || null);
        exercisesRef.current = challenge?.exercises || [];
        handleExercise();
    };

    const [readyTitle, setReadyTitle] = React.useState("");
    const intervalReadyRef = useRef(null);

    const timeRef = useRef(0);
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        return () => {
            clearInterval(intervalReadyRef.current);
            clearInterval(intervalRef.current);
        };
    }, []);

    const handleExercise = () => {
        if (exercisesRef.current.length === 0) {
            // TODO: navigate to end screen
            return;
        }
        // const durationMinutes = route.params.durationMinutes;
        const exercise = exercisesRef.current.shift();
        timeRef.current = exercise.duration;
        setTime(timeRef.current);
        readyAction();
    };

    const readyAction = () => {
        const _action = () => {
            setTimeout(() => {
                setReadyTitle("");
                countdownAction();
            }, 1000);
        };
        setReadyTitle("5");
        const readys = [4, 3, 2, 1, 0];
        intervalReadyRef.current = setInterval(() => {
            const ready = readys.shift();
            if (ready === 0) {
                clearInterval(intervalReadyRef.current);
                setReadyTitle("Go");
                _action();
            } else {
                setReadyTitle(ready.toString());
            }
        }, 1000);
    };

    const countdownAction = () => {
        intervalRef.current = setInterval(() => {
            if (timeRef.current <= 0) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
                handleExercise();
            } else {
                timeRef.current -= 1;
                setTime(timeRef.current);
            }
        }, 1000);
    };

    useEffect(() => {
        if (!intervalRef.current && isActive) {
            return;
        }
        if (isActive) {
            countdownAction();
        } else {
            clearInterval(intervalRef.current);
        }
    }, [isActive]);

    const handlePause = () => {
        setIsActive((prev) => !prev);
    };

    const [itemProgress, setItemProgress] = useState(0);
    const [groupProgress, setGroupProgress] = useState(0);

    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#fff",
                paddingTop: 0,
                paddingBottom: 0,
            }}>
            <View style={styles.container}>
                <View style={styles.scrollViewContainer}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View
                            style={{
                                marginTop: insets.top,
                                height: 30,
                                backgroundColor: "#fff",
                            }}></View>
                        <Image source={img} style={styles.bg} />
                        <View style={styles.center}>
                            <Text style={styles.title}>{title}</Text>
                        </View>
                        <View style={styles.countdown}>
                            <View style={styles.itemProgress}></View>
                            <View style={styles.groupProgress}></View>
                            <Text style={styles.countdownSeconds}>{time}</Text>
                        </View>
                        <View style={styles.pause}>
                            <TouchableOpacity onPress={handlePause}>
                                <Ionicons name="pause" size={30} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.go}>
                            <Text style={styles.goLabel}>{readyTitle}</Text>
                        </View>
                    </ScrollView>
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
    bg: {
        width: "100%",
    },
    center: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    title: {
        color: "#000",
        fontSize: 36,
        lineHeight: 36,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 60,
    },
    go: {
        position: "absolute",
        bottom: 200 + 60 + 36 + 40,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    goLabel: {
        color: "#000",
        fontSize: 96,
        lineHeight: 96,
        fontWeight: "bold",
        textAlign: "center",
    },
    pause: {
        position: "absolute",
        bottom: 200 - 30,
        right: 20,
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#666666",
    },
    countdown: {
        backgroundColor: "#444444",
        width: "100%",
        height: 200,
    },
    countdownSeconds: {
        color: "#fff",
        fontSize: 100,
        lineHeight: 100,
        fontWeight: "bold",
        textAlign: "center",
    },
});
