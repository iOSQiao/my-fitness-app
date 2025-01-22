import React, { useEffect, useMemo, useState } from "react";
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
    };

    const handlePause = () => {
        console.log("Pause");
    };

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
                        <View style={{marginTop: insets.top, height: 30, backgroundColor: '#fff'}}></View>
                        <Image source={img} style={styles.bg} />
                        <View style={styles.center}>
                            <Text style={styles.title}>{title}</Text>
                        </View>
                        <View style={styles.countdown}></View>
                        <View style={styles.pause}>
                            <TouchableOpacity onPress={handlePause}>
                                <Ionicons name="pause" size={30} color="#fff" />
                            </TouchableOpacity>
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
});
