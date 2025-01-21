import AsyncStorage from "@react-native-async-storage/async-storage";

// 存储全局变量
const saveGlobalSettings = async (settings) => {
    try {
        const jsonValue = JSON.stringify(settings);
        await AsyncStorage.setItem("globalSettings", jsonValue);
    } catch (e) {
        console.error(e);
    }
};

// 读取全局变量
const getGlobalSettings = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem("globalSettings");
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error(e);
    }
};

// 使用
const settings = { theme: "dark", language: "en" };
saveGlobalSettings(settings);

getGlobalSettings().then((settings) => {
    console.log(settings.theme); // 输出：dark
});
