import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultConfig = {
    currentChallengeId: null,
    challenges: [
        {
            id: 1001,
            name: "Squat",
            img: require("../assets/images/home/challenge_1.jpg"),
            title: "The squats challenge",
            progress: Array.from({ length: 30 }, (_, i) => false),
            duration: "30 days",
            exercises: [
                {
                    name: "Squat",
                    img: require("../assets/squats.jpg"),
                    duration: 10,
                },
                {
                    name: "Squat2",
                    img: require("../assets/squats.jpg"),
                    duration: 7,
                },
            ],
        },
        {
            id: 1002,
            name: "Pushup",
            img: require("../assets/images/home/challenge_2.jpg"),
            title: "The push-ups challenge",
            progress: Array.from({ length: 30 }, (_, i) => false),
            duration: "30 days",
        },
        {
            id: 1003,
            name: "Crunch",
            img: require("../assets/images/home/challenge_3.jpg"),
            title: "The crunch challenge",
            progress: Array.from({ length: 30 }, (_, i) => false),
            duration: "30 days",
        },
        {
            id: 1004,
            name: "Pullup",
            img: require("../assets/images/home/challenge_4.jpg"),
            title: "The pull-ups challenge",
            progress: Array.from({ length: 30 }, (_, i) => false),
            duration: "30 days",
        },
    ],
};

const CacheDataName = "challengeData";

function isString(value) {
    return typeof value === "string";
}

// 初始化全局变量
export const initChallengeSettings = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(CacheDataName);
        if (jsonValue == null) {
            await saveChallengeSettings(defaultConfig);
        } else {
            await saveChallengeSettings(jsonValue);
        }
    } catch (e) {
        console.error(e);
    }
    return true;
};

// 存储全局变量
export const saveChallengeSettings = async (settings) => {
    try {
        let jsonValue = settings;
        if (!isString(settings)) {
            jsonValue = JSON.stringify(settings);
        }
        await AsyncStorage.setItem(CacheDataName, jsonValue);
    } catch (e) {
        console.error(e);
    }
    return true;
};

// 读取全局变量
export const getChallengeSettings = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(CacheDataName);
        if (!isString(jsonValue)) {
            return jsonValue;
        }
        return JSON.parse(jsonValue);
    } catch (e) {
        console.error(e);
    }
    return null;
};

// 清除所有数据
export const clearAllData = async () => {
    try {
        await AsyncStorage.clear();
        console.log("All data cleared");
        await initChallengeSettings();
    } catch (e) {
        console.error("Error clearing data:", e);
    }
    return true;
};
