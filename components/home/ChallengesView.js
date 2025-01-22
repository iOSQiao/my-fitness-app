import React, { useEffect } from "react";
import { ScrollView, View, Image, Text, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import * as helper from "../../utils/challengeDataHelper";

const { width } = Dimensions.get("window");

export default function ChallengesView({ onPress }) {
    const [items, setItems] = React.useState([]);

    useEffect(() => {
        helper.getGlobalSettings().then((settings) => {
            setItems(settings.challenges);
        });
    }, []);

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {items &&
                items.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => onPress && onPress(item)}>
                        <View style={styles.container}>
                            <Image source={item.uri} style={styles.image} />
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.desc}>{item.desc}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.75,
        height: 240,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 4,
        overflow: "hidden",
    },
    image: {
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
    desc: {
        position: "absolute",
        right: 15,
        top: 15,
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 5,
        borderRadius: 5,
    },
});
