import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, Alert, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import * as helper from "../../utils/globalSettingsHelper";
import { defaultConfig } from "../../utils/config";

export default function RecordsScreen({ route, navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handlerClearChallengePopup} style={{ marginRight: 10 }}>
                    <Ionicons name="refresh" size={24} color="#000" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    React.useLayoutEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => {
            navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
        };
    }, [navigation]);

    const handlerClearChallengePopup = () => {
        Alert.alert("Reset", "Are you sure you want to reset your progress for this challenge?", [
            {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            { text: "YES,reset!", onPress: () => handlerClearChallenge() },
        ]);
    };

    const handlerClearChallenge = async () => {
        const challengeId = route.params.challengeId;
        const settings = await helper.getGlobalSettings();
        const index = settings.challenges.findIndex((c) => c.id === challengeId);
        const defaultChallenge = defaultConfig.challenges[index];
        settings.challenges[index] = defaultChallenge;
        await helper.saveGlobalSettings({ ...settings });
        fetchData();
    };

    const [title, setTitle] = React.useState("");
    const [img, setImg] = React.useState(null);
    const [days, setDays] = React.useState([]);
    const [groupDays, setGroupDays] = React.useState([]);
    const [currentDay, setCurrentDay] = React.useState(-1);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const challengeId = route.params.challengeId;
        const settings = await helper.getGlobalSettings();
        const index = settings.challenges.findIndex((c) => c.id === challengeId);
        const challenge = settings.challenges[index];
        setTitle(challenge?.title || "");
        setImg(challenge?.img || null);
        setCurrentDay(challenge.progress.findIndex((d) => !d));
        setDays(challenge?.progress);
    };

    const numColumns = 7;

    useMemo(() => {
        const result = [];
        for (let i = 0; i < days.length; i += numColumns) {
            const group = days.slice(i, i + numColumns);
            while (group.length < numColumns) {
                group.push(null);
            }
            result.push(group);
        }
        setGroupDays(result);
    }, [days]);

    const handleStartDay = async () => {
        navigation.navigate("details", {
            isWorkout: false,
            challengeId: route.params.challengeId,
            currentDay: currentDay,
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.container}>
                <View style={styles.scrollViewContainer}>
                    <ScrollView>
                        <View style={styles.header}>
                            <Image source={img} style={styles.bg} />
                            <View style={styles.progressContainer}>
                                <View style={styles.progressTop}>
                                    <Text style={styles.left}>
                                        {`${
                                            currentDay === -1 ? 0 : days.length - currentDay
                                        } days left`}
                                    </Text>
                                    <Text style={styles.right}>
                                        {currentDay === -1
                                            ? 100
                                            : parseInt((currentDay / days.length) * 100)}
                                        %
                                    </Text>
                                </View>
                                <View style={styles.progress}>
                                    <View style={styles.total}></View>
                                    <View
                                        style={[
                                            styles.rest,
                                            {
                                                width: `${parseInt(
                                                    (currentDay / days.length) * 100
                                                )}%`,
                                            },
                                        ]}></View>
                                </View>
                            </View>
                            <Text style={styles.title}>{title}</Text>
                        </View>
                        <View style={styles.daysContainer}>
                            {groupDays.map((group, groupIndex) => (
                                <View style={styles.dayGroup} key={groupIndex}>
                                    <Text style={styles.weekTitle}>Week {groupIndex + 1}</Text>
                                    <View style={styles.dayRow}>
                                        {group.map((day, index) => {
                                            if (day === null) {
                                                return (
                                                    <View
                                                        key={index}
                                                        style={[
                                                            styles.dayBox,
                                                            { opacity: 0 },
                                                        ]}></View>
                                                );
                                            }
                                            if (groupIndex * numColumns + index === currentDay) {
                                                return (
                                                    <View key={index} style={styles.dayBoxActive}>
                                                        <TouchableOpacity
                                                            style={styles.dayClickContainer}
                                                            onPress={handleStartDay}>
                                                            <Text style={styles.dayLabelActive}>
                                                                {groupIndex * numColumns +
                                                                    index +
                                                                    1}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                );
                                            }
                                            if (!!day) {
                                                return (
                                                    <View key={index} style={styles.dayBox}>
                                                        <TouchableOpacity
                                                            style={styles.dayClickContainer}
                                                            onPress={handleStartDay}>
                                                            <Text style={styles.dayLabelSuccess}>
                                                                {groupIndex * numColumns +
                                                                    index +
                                                                    1}
                                                            </Text>
                                                            <Ionicons
                                                                name="checkmark"
                                                                size={36}
                                                                color="#000"
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                );
                                            }
                                            return (
                                                <View
                                                    key={index}
                                                    style={[
                                                        styles.dayBox,
                                                        index === group.length - 1
                                                            ? { borderRightWidth: 0 }
                                                            : {},
                                                    ]}>
                                                    <TouchableOpacity
                                                        style={styles.dayClickContainer}
                                                        onPress={handleStartDay}>
                                                        <Text style={styles.dayLabel}>
                                                            {groupIndex * numColumns + index + 1}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.startBtnContainer}>
                    <View style={styles.startBtn}>
                        <TouchableOpacity onPress={handleStartDay}>
                            <Text style={styles.startLabel}>
                                START DAY {currentDay === -1 ? "" : currentDay + 1}
                            </Text>
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
        maxHeight: 240,
    },
    progressContainer: {
        position: "absolute",
        bottom: 74,
        left: 25,
        right: 25,
    },
    progressTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
    },
    left: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 16,
    },
    right: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 16,
    },
    progress: {
        height: 30,
        borderRadius: 15,
        overflow: "hidden",
        margin: 5,
    },
    rest: {
        width: "0%",
        height: "100%",
        backgroundColor: "#7e759d",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    total: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0.7,
        backgroundColor: "lightgray",
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
    daysContainer: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    dayGroup: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: 30,
    },
    weekTitle: {
        color: "gray",
        fontSize: 16,
        lineHeight: 16,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 4,
    },
    dayClickContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    dayRow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    dayBox: {
        flex: 1,
        justifyContent: "center",
        height: 50,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: "lightgray",
        backgroundColor: "#fff",
    },
    dayLabel: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 16,
    },
    dayBoxActive: {
        flex: 1,
        justifyContent: "center",
        height: 50,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: "lightgray",
        backgroundColor: "#4f3f84",
    },
    dayLabelActive: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 16,
    },
    dayLabelSuccess: {
        color: "lightgray",
        fontSize: 12,
        fontWeight: "normal",
        lineHeight: 12,
        position: "absolute",
        top: 5,
        left: 5,
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
});
