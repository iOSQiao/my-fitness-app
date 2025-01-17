import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface SectionProps {
    title: string;
    desc: string;
    children?: React.ReactNode;
}
export default function Section({ title, desc, children }: SectionProps) {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", paddingRight: 16 }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.desc}>{desc}</Text>
                </View>
                {/* <Ionicons name="arrow-forward" size={16} color="#000" /> */}
            </View>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        paddingTop: 32,
    },
    title: {
        color: "#000",
        fontSize: 18,
        lineHeight: 18,
        fontWeight: "bold",
        marginLeft: 16,
        marginRight: 16,
        textAlign: "center",
    },
    desc: {
        color: "#000",
        fontSize: 14,
        lineHeight: 14,
        fontWeight: "normal",
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8,
        textAlign: "center",
    },
});
