import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import LevelView from "../../components/home/LevelView";

export default function DetailsScreen({ route, navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: `Day ${route.params.currentDay + 1}`,
        });
    }, [navigation]);

    const [title, setTitle] = React.useState("");
    const [source, setSource] = React.useState(null);

    useEffect(() => {
        const challenge = route.params.challenge;
        setTitle(challenge?.title || "");
        setSource(challenge?.uri || null);
    }, []);

    const handleStart = () => {
        // TODO
        navigation.navigate("end", {
            challenge: route.params.challenge,
            currentDay: route.params.currentDay,
        });
    };

    const [level, setLevel] = useState(1);

    const handleChangeLevel = (level) => {
        setLevel(level);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.container}>
                <View style={styles.scrollViewContainer}>
                    <ScrollView>
                        <View style={styles.header}>
                            <Image source={source} style={styles.bg} />
                            <Text style={styles.title}>{title}</Text>
                        </View>
                        <View style={styles.main}>
                            <LevelView level={level} onChange={handleChangeLevel} />
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
    main: {
        minHeight: 500,
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
