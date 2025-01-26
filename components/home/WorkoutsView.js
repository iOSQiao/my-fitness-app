import React, { useEffect } from "react";
import { ScrollView, View, Image, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

import { defaultConfig } from "../../utils/config";

export default function WorkoutsView() {
    const [items, setItems] = React.useState([]);

    useEffect(() => {
        setItems(defaultConfig.workouts);
    }, []);

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {items.map((item, index) => (
                <View key={index} style={styles.container}>
                    <Image source={item.img} style={styles.img} />
                    <Text style={styles.title}>{item.title}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.55,
        height: 160,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 4,
        overflow: "hidden",
    },
    img: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    title: {
        position: "absolute",
        left: 5,
        bottom: 5,
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        backgroundColor: "transparent",
        padding: 5,
    },
});
