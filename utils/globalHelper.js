import AsyncStorage from "@react-native-async-storage/async-storage";

import { Challenge } from "./constants";

const defaultConfig = {
    currentChallengeId: null,
    challenges: [
        {
            id: Challenge.Squat.id,
            name: Challenge.Squat.name,
            uri: require("../assets/images/home/challenge_1.jpg"),
            title: "The squats challenge",
            progress: Array.from({ length: 30 }, (_, i) => false),
            desc: "30 days",
        },
        {
            id: Challenge.Pushup.id,
            name: Challenge.Pushup.name,
            uri: require("../assets/images/home/challenge_2.jpg"),
            title: "The push-ups challenge",
            progress: Array.from({ length: 30 }, (_, i) => false),
            desc: "30 days",
        },
        {
            id: Challenge.Crunch.id,
            name: Challenge.Crunch.name,
            uri: require("../assets/images/home/challenge_3.jpg"),
            title: "The crunch challenge",
            progress: Array.from({ length: 30 }, (_, i) => false),
            desc: "30 days",
        },
        {
            id: Challenge.Pullup.id,
            name: Challenge.Pullup.name,
            uri: require("../assets/images/home/challenge_4.jpg"),
            title: "The pull-ups challenge",
            progress: Array.from({ length: 30 }, (_, i) => false),
            desc: "30 days",
        },
    ],
};

function isString(value) {
    return typeof value === "string";
}

// 初始化全局变量
export const initGlobalSettings = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem("globalSettings");
        if (jsonValue == null) {
            await saveGlobalSettings(defaultConfig);
        } else {
            await saveGlobalSettings(jsonValue);
        }
    } catch (e) {
        console.error(e);
    }
    return true;
};

// 存储全局变量
export const saveGlobalSettings = async (settings) => {
    try {
        let jsonValue = settings;
        if (!isString(settings)) {
            jsonValue = JSON.stringify(settings);
        }
        await AsyncStorage.setItem("globalSettings", jsonValue);
    } catch (e) {
        console.error(e);
    }
    return true;
};

// 读取全局变量
export const getGlobalSettings = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem("globalSettings");
        if (!isString(jsonValue)) {
            return jsonValue;
        }
        return JSON.parse(jsonValue);
    } catch (e) {
        console.error(e);
    }
};

// 清除所有数据
export const clearAllData = async () => {
    try {
        await AsyncStorage.clear();
        console.log("All data cleared");
        initGlobalSettings();
    } catch (e) {
        console.error("Error clearing data:", e);
    }
    return true;
};
