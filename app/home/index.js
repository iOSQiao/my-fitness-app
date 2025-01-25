import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, SafeAreaView } from "react-native";

import Section from "../../components/home/Section";
import ChallengesView from "../../components/home/ChallengesView";
import WorkoutsView from "../../components/home/WorkoutsView";
import CurrentChallenge from "../../components/home/CurrentChallenge";

import * as helper from "../../utils/challengeDataHelper";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
    const [title, setTitle] = useState("");
    const [img, setImg] = useState(null);
    const [currentDay, setCurrentDay] = useState(0);
    const [currentChallengeId, setCurrentChallengeId] = useState(null);
    const [workouts, setWorkouts] = useState(0);
    const [minutes, setMinutes] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const fetchData = async () => {
        const settings = await helper.getChallengeSettings();
        const challengeId = settings.currentChallengeId;
        const index = settings.challenges.findIndex((c) => c.id === challengeId);
        const challenge = settings.challenges[index];
        setTitle(challenge?.title || "");
        setImg(challenge?.img || null);
        setCurrentDay(challenge.progress.findIndex((d) => !d));
        setCurrentChallengeId(challengeId);
        setWorkouts(challenge.exercises.length);
        let totalDuration = 0;
        challenge.exercises.forEach((exercise) => {
            totalDuration += exercise.duration;
        });
        setMinutes(parseInt((totalDuration / 60) * 30));
    };

    const handleClickeChallenge = (item) => {
        navigation.navigate("records", {
            challengeId: item.id,
        });
    };

    const handleClickeCurrentChallenge = () => {
        navigation.navigate("records", {
            challengeId: currentChallengeId,
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <ScrollView
                    style={{ width: "100%", height: "100%" }}
                    contentContainerStyle={styles.scrollViewContent}
                    onScroll={(event) => {
                        const currentOffset = event.nativeEvent.contentOffset.y;
                        if (currentOffset > 36 * 2 + 16) {
                            navigation.setOptions({
                                headerTitle: "Fitness Application",
                                headerStyle: {
                                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                                },
                            });
                        } else {
                            navigation.setOptions({
                                headerTitle: "",
                                headerStyle: {
                                    backgroundColor: "#fff",
                                },
                            });
                        }
                    }}>
                    <View style={styles.content}>
                        <Text style={styles.title}>{"Fitness\nApplication"}</Text>
                        {currentChallengeId !== null ? (
                            <CurrentChallenge
                                title={title}
                                img={img}
                                currentDay={currentDay}
                                workouts={workouts}
                                minutes={minutes}
                                onPress={handleClickeCurrentChallenge}
                            />
                        ) : null}
                        <Section
                            title={"Challenges"}
                            desc={"Start the Challenges and fulfill your Potential"}>
                            <ChallengesView onPress={handleClickeChallenge}></ChallengesView>
                        </Section>
                        <Section title={"Workouts"} desc={"Test yourself and see concrete results"}>
                            <WorkoutsView></WorkoutsView>
                        </Section>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: "#fff",
    },
    scrollViewContent: {
        padding: 0,
    },
    content: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    title: {
        color: "#000",
        fontSize: 36,
        fontWeight: "bold",
        lineHeight: 36,
        textAlign: "left",
        padding: 16,
    },
});
