import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function LevelView({ level = 1, onChange }) {
    const [data, setData] = React.useState(Array.from({ length: 6 }, (_, i) => i + 1));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select difficulty</Text>
            <View style={styles.boxContainer}>
                {data.map((item, index) => (
                    <View
                        key={index}
                        style={[
                            item <= level ? styles.boxActive : styles.box,
                            index === data.length - 1 ? { borderRightWidth: 0 } : {},
                        ]}>
                        <TouchableOpacity onPress={() => onChange(item)}>
                            <View style={{width: '100%', height: '100%'}}></View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: "#fff",
    },
    title: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 16,
        textAlign: "center",
    },
    boxContainer: {
        marginTop: 10,
        height: 40,
        flexDirection: "row",
        borderRadius: 4,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "lightgray",
    },
    box: {
        flex: 1,
        borderRightWidth: 1,
        borderColor: "lightgray",
        backgroundColor: "#fff",
        overflow: "hidden",
    },
    boxActive: {
        flex: 1,
        borderRightWidth: 1,
        borderColor: "#fff",
        backgroundColor: "#afaac5",
        overflow: "hidden",
    },
});
