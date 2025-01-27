import AsyncStorage from "@react-native-async-storage/async-storage";

import { defaultConfig } from "./config";

const CacheDataName = "GlobalSeetings";

function isString(value) {
    return typeof value === "string";
}

// 初始化全局变量
export const initGlobalSettings = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(CacheDataName);
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
        await AsyncStorage.setItem(CacheDataName, jsonValue);
    } catch (e) {
        console.error(e);
    }
    return true;
};

// 读取全局变量
export const getGlobalSettings = async () => {
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
        await initGlobalSettings();
    } catch (e) {
        console.error("Error clearing data:", e);
    }
    return true;
};
