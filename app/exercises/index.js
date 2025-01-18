import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";

export default function ExercisesScreen() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.bigTitle}>Exercises</Text>
                {/* Push-ups Section */}
                <Image
                    source={require("../../assets/push-ups.jpg")} // Ensure this path is valid push-ups
                    style={styles.image}
                    resizeMode="stretch" // Ensure the ratio of the picture is consistent
                />
                <Text style={styles.title}>Push-ups</Text>
                <Text style={styles.paragraph}>
                    Push-ups are a highly effective full-body strength training exercise, primarily
                    targeting the chest, shoulders, and triceps.
                </Text>
                <Text style={styles.paragraph}>
                    When performing push-ups, keep your body in a straight line from head to heels
                    to avoid sagging the back or raising the shoulders.
                </Text>
                <Text style={styles.paragraph}>
                    It is recommended to start with a small number of repetitions and gradually
                    increase the count, setting the appropriate number of sets and repetitions
                    according to individual fitness levels and goals.
                </Text>

                {/* Crunches Section */}
                <Image
                    source={require("../../assets/crunches.png")} // Ensure this path is valid
                    style={styles.image}
                    resizeMode="stretch" // Ensure the ratio of the picture is consistent
                />
                <Text style={styles.title}>Crunches</Text>
                <Text style={styles.paragraph}>
                    Crunches are a popular exercise that primarily targets the abdominal muscles,
                    helping to strengthen and tone the core.
                </Text>
                <Text style={styles.paragraph}>
                    To perform a crunch, lie on your back with your knees bent and feet flat on the
                    floor, then lift your shoulders towards your knees while engaging your abs.
                </Text>
                <Text style={styles.paragraph}>
                    It is important to avoid pulling on your neck and to keep your lower back
                    pressed against the floor throughout the movement.
                </Text>

                {/* Squats Section */}
                <Image
                    source={require("../../assets/squats.jpg")} // Ensure this path is valid
                    style={styles.image}
                    resizeMode="contain" // Ensure the ratio of the picture is consistent
                />
                <Text style={styles.title}>Squats</Text>
                <Text style={styles.paragraph}>
                    Squats are an excellent exercise for developing lower body strength, targeting
                    the quadriceps, hamstrings, and glutes.
                </Text>
                <Text style={styles.paragraph}>
                    When performing squats, keep your feet shoulder-width apart and lower your body
                    by bending your knees, ensuring that your knees do not extend past your toes.
                </Text>
                <Text style={styles.paragraph}>
                    Start with a comfortable range of motion and gradually increase depth as your
                    strength and flexibility improve.
                </Text>

                {/* Pull-ups Section */}
                <Image
                    source={require("../../assets/pull-ups.jpg")} // Ensure this path is valid
                    style={styles.image}
                    resizeMode="contain" // Ensure the ratio of the picture is consistent
                />
                <Text style={styles.title}>Pull-ups</Text>
                <Text style={styles.paragraph}>
                    Pull-ups are a challenging exercise that primarily targets the upper body,
                    focusing on the back, shoulders, and biceps.
                </Text>
                <Text style={styles.paragraph}>
                    To perform a pull-up, grasp the bar with an overhand grip and pull your body
                    upward until your chin is above the bar.
                </Text>
                <Text style={styles.paragraph}>
                    If you are new to pull-ups, you may want to start with assisted variations or
                    negative pull-ups to build strength.
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 16,
    },
    bigTitle: {
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    image: {
        width: "80%", //Set the picture width to the screen width
        height: 200, //adjust the height of the image
        marginBottom: 16,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: "center", // Set the text to be in the center
    },
    toolKitBar: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-around", // Space buttons evenly
        alignItems: "center",
        backgroundColor: "#f8f8f8", // Optional background color for buttons
    },
    tabButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    tabText: {
        fontWeight: "bold",
        fontSize: 10,
        marginTop: 5,
    },
    tabImage: {
        width: 20,
        height: 20,
    },
});
