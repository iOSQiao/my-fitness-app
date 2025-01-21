import React, { useEffect, useMemo } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import axios from "axios";

import { Challenge } from "../../utils/constants";

export default function RecordsScreen({ route, navigation }) {
    const [title, setTitle] = React.useState("");
    const [source, setSource] = React.useState(null);

    useEffect(() => {
        const challenge = route.params.challenge;
        setTitle(challenge?.title || "Records");
        setSource(challenge?.uri || null);
    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => console.log("Refresh pressed")}
                    style={{ marginRight: 10 }}>
                    <Ionicons name="refresh" size={24} color="#000" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const [days, setDays] = React.useState([]);
    const [groupDays, setGroupDays] = React.useState([]);

    // useEffect(() => {
    //     const today = dayjs();
    //     setDays(Array.from({ length: today.daysInMonth() }, (_, i) => i + 1));
    // }, []);

    useEffect(() => {
        setDays(Array.from({ length: 30 }, (_, i) => i + 1));
    }, []);

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

    const handleStartDay = () => {
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.scrollViewContainer}>
                <ScrollView>
                    <View style={styles.content}>
                        <Image source={source} style={styles.bg} />
                        <View style={styles.progressContainer}>
                            <View style={styles.progressTop}>
                                <Text style={styles.left}>26 days left</Text>
                                <Text style={styles.right}>13%</Text>
                            </View>
                            <View style={styles.progress}>
                                <View style={styles.total}></View>
                                <View style={styles.rest}></View>
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
                                                    style={[styles.dayBox, { opacity: 0 }]}></View>
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
                                                <Text style={styles.dayLabel}>{day}</Text>
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
                    <TouchableOpacity onPress={() => console.log("Start pressed")}>
                        <Text style={styles.startLabel}>START DAY 5</Text>
                    </TouchableOpacity>
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
    content: {
        backgroundColor: "#000",
        width: "100%",
        minHeight: 200,
    },
    bg: {
        width: "100%",
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
        width: "13%",
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
    dayRow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    dayBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: "lightgray",
    },
    dayLabel: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 16,
    },
    startBtnContainer: {
        width: "100%",
        height: 85,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        flexDirection: "row",
    },
    startBtn: {
        flex: 1,
        backgroundColor: "#4f3f82",
        height: 55,
        margin: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    startLabel: {
        color: "#fff",
        fontSize: 18,
        lineHeight: 18,
        fontWeight: "bold",
    },
});
