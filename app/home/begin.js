import React, { useEffect, useMemo, useState, useRef } from "react";
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import * as helper from "../../utils/globalSettingsHelper";

const screenWidth = Dimensions.get("window").width;

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
    const exerciseIndexRef = useRef(null);
    const exerciseFinishedDurationRef = useRef(0);
    const exercisesTotal = useRef(0);
    const exercisesFinished = useRef(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const settings = await helper.getGlobalSettings();
        if (route.params.isWorkout) {
            const workoutId = route.params.workoutId;
            const index = settings.workouts.findIndex((c) => c.id === workoutId);
            const workout = settings.workouts[index];
            exercisesRef.current = workout?.exercises || [];
            exercisesTotal.current = exercisesRef.current.length;
        } else {
            const challengeId = route.params.challengeId;
            const index = settings.challenges.findIndex((c) => c.id === challengeId);
            const challenge = settings.challenges[index];
            exercisesRef.current = challenge?.exercises || [];
            exercisesTotal.current = exercisesRef.current.length;
        }
        if (exercisesRef.current.length > 0) {
            handleExercise();
        }
    };

    const [readyTitle, setReadyTitle] = React.useState("");
    const intervalReadyRef = useRef(null);

    const timeRef = useRef(0);
    const [time, setTime] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        return () => {
            clearInterval(intervalReadyRef.current);
            clearInterval(intervalRef.current);
        };
    }, []);

    const saveChallengeExercise = async () => {
        const settings = await helper.getGlobalSettings();
        const challengeId = route.params.challengeId;
        const index = settings.challenges.findIndex((c) => c.id === challengeId);
        const challenge = settings.challenges[index];
        for (let i = 0; i < challenge.progress.length; i++) {
            if (!challenge.progress[i]) {
                challenge.progress[i] = true;
                break;
            }
        }
        challenge.calories = route.params.calories;
        settings.challenges[index] = challenge;
        settings.workoutsTotal += 1;
        settings.minutesTotal += route.params.durationMinutes;
        settings.currentChallengeId = challengeId;
        await helper.saveGlobalSettings({ ...settings });
    };

    const saveWorkoutExercise = async () => {
        const settings = await helper.getGlobalSettings();
        const workoutId = route.params.workoutId;
        const index = settings.workouts.findIndex((c) => c.id === workoutId);
        const workout = settings.workouts[index];
        workout.calories = route.params.calories;
        settings.workoutsTotal += 1;
        settings.minutesTotal += route.params.durationMinutes;
        await helper.saveGlobalSettings({ ...settings });
    };

    const handleExercise = async () => {
        if (exercisesRef.current.length === 0) {
            if (route.params.isWorkout) {
                await saveWorkoutExercise();
            } else {
                await saveChallengeExercise();
            }
            navigation.navigate("end", {
                isWorkout: route.params.isWorkout,
                workoutId: route.params.workoutId,
                challengeId: route.params.challengeId,
                currentDay: route.params.currentDay,
                durationMinutes: route.params.durationMinutes,
                spaceSeconds: route.params.spaceSeconds,
                calories: route.params.calories,
                exercisesTotal: exercisesTotal.current,
            });
            return;
        }
        if (!exerciseIndexRef.current) {
            const exercise = exercisesRef.current.shift();
            exerciseIndexRef.current = exercise;
        }
        setTitle(exerciseIndexRef.current.title);
        setImg(exerciseIndexRef.current.img);
        timeRef.current = exerciseIndexRef.current.duration * exerciseIndexRef.current.multiple;
        setTime(timeRef.current);
        exercisesFinished.current += 1;
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
                exerciseIndexRef.current = null;
                handleExercise();
            } else {
                timeRef.current -= 1;
                setTime(timeRef.current);
                exerciseFinishedDurationRef.current += 1;
            }
        }, 1000);
    };

    const handlePause = () => {
        if (!intervalRef.current) {
            return;
        }
        clearInterval(intervalRef.current);
        setModalVisible(true);
    };

    const [itemProgress, setItemProgress] = useState(0);
    const [groupProgress, setGroupProgress] = useState(0);

    useEffect(() => {
        if (!exerciseIndexRef.current) {
            return;
        }
        if (time <= 0) {
            setItemProgress(0);
            return;
        }
        const progress =
            100 -
            (time / exerciseIndexRef.current.duration) * exerciseIndexRef.current.multiple * 100;
        setItemProgress(progress);
    }, [time]);

    useEffect(() => {
        const durationMinutes = route.params.durationMinutes;
        const progress = (exerciseFinishedDurationRef.current / durationMinutes) * 100;
        setGroupProgress(progress);
    }, [exerciseFinishedDurationRef.current]);

    const sectionLabel = useMemo(() => {
        return `${exercisesFinished.current}/${exercisesTotal.current}`;
    }, [exercisesFinished.current, exercisesTotal.current]);

    const [modalVisible, setModalVisible] = useState(false);

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
                            <View style={styles.itemProgress}>
                                <View
                                    style={{
                                        width: `${itemProgress}%`,
                                        height: "100%",
                                        backgroundColor: "#504083",
                                    }}></View>
                                <Text style={styles.countdownSeconds}>{time ? time : ""}</Text>
                            </View>
                            <View style={styles.groupProgress}>
                                <View
                                    style={{
                                        width: `${groupProgress}%`,
                                        height: "100%",
                                        backgroundColor: "#444444",
                                    }}></View>
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.sectionLabel}>{sectionLabel}</Text>
                            </View>
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
            <Modal
                transparent={true} // 设置背景透明
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>这是一个全屏半透明背景的Modal</Text>
                        <View style={styles.modalButtonGroup}>
                            <View style={styles.modalButtonContainer}>
                                <View style={styles.modalButton}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModalVisible(false);
                                            navigation.goBack();
                                        }}>
                                        <Ionicons name="close" size={60} color="#444444" />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.modalButtonLabel}>Quit</Text>
                            </View>
                            <View style={styles.modalButtonContainer}>
                                <View style={styles.modalButton}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModalVisible(false);
                                            countdownAction();
                                        }}>
                                        <Ionicons name="play" size={60} color="#444444" />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.modalButtonLabel}>Continue</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
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
        height: 260,
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
        bottom: 240 + 60 + 36 + 40,
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
        bottom: 240 - 30,
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
        height: 240,
    },
    countdownSeconds: {
        color: "#fff",
        fontSize: 100,
        lineHeight: 100,
        fontWeight: "bold",
        textAlign: "center",
        position: "absolute",
        top: 50,
        left: 0,
        right: 0,
    },
    itemProgress: {
        backgroundColor: "444444",
        width: "100%",
        height: 200,
    },
    groupProgress: {
        backgroundColor: "#888888",
        width: "100%",
        height: 40,
    },
    section: {
        backgroundColor: "#fff",
        width: 100,
        height: 30,
        borderRadius: 8,
        position: "absolute",
        bottom: 40 - 15,
        left: (screenWidth - 100) / 2,
        justifyContent: "center",
        alignItems: "center",
    },
    sectionLabel: {
        color: "#000",
        fontSize: 16,
        lineHeight: 16,
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modalContent: {
        alignItems: "center",
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButtonGroup: {
        flexDirection: "row",
        columnGap: 40,
    },
    modalButtonContainer: {
        alignItems: "center",
        justifyContent: "center",
        rowGap: 10,
    },
    modalButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    modalButtonLabel: {
        fontSize: 16,
        color: "#fff",
        lineHeight: 16,
    },
});
