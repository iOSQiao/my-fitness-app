import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

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

    const handleChangeLevel = (level) => {
        setLevel(level);
    };

    const handleStart = () => {
        // TODO
        navigation.navigate("end", {
            challengeId: route.params.challengeId,
            currentDay: route.params.currentDay,
        });
    };

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
        minHeight: 500,
    },
    exercisesTitle: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 16,
        textAlign: "center",
        width: "100%",
        marginTop: 30,
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
});
