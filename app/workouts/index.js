import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, Image } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { useFocusEffect } from "@react-navigation/native";

import * as helper from "../../utils/globalSettingsHelper";

export default function HomeScreen({ navigation }) {
    useFocusEffect(
        React.useCallback(() => {
            navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
        })
    );

    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const settings = await helper.getGlobalSettings();
        setWorkouts(settings.workouts);
    };

    // Define a new HomescreenCell constant
    const HomescreenCell = (props) => (
        <Cell
            {...props}
            cellStyle="Subtitle"
            contentContainerStyle={{
                height: 300, // Increased height for better spacing
                backgroundColor: "#fff", // White card background
                borderRadius: 12, // Rounded corners for the cell
                marginVertical: 10, // Spacing between cells
                marginHorizontal: 16, // Spacing from the screen edges
                shadowColor: "#000", // Add shadow for depth
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5, // Android shadow
            }}
            onPress={props.action} // Use the action prop for navigation
            highlightUnderlayColor={"#ccc"} // Highlight color on press
            cellContentView={
                <View style={styles.cellContainer}>
                    {/* Image */}
                    <Image source={props.imgUri} style={styles.cellImage} />

                    {/* ETA */}
                    <View style={styles.cellEtaContainer}>
                        <Text style={styles.cellEtaText}>{props.eta} mins</Text>
                    </View>

                    {/* Title and Tagline */}
                    <View style={styles.cellTextContainer}>
                        <Text style={styles.cellTitle}>{props.title}</Text>
                        <Text style={styles.cellTagline}>{props.tagline}</Text>
                    </View>
                </View>
            }
        />
    );

    return (
        <ScrollView>
            <TableView>
                <Section header="" hideSeparator={true} separatorTintColor="#ccc">
                    {workouts.map((workout) => (
                        <HomescreenCell
                            key={workout.id}
                            title={workout.title}
                            tagline={workout.tagline}
                            eta="30"
                            imgUri={workout.img}
                            action={
                                () =>
                                    navigation.navigate("details", {
                                        isWorkout: true,
                                        workoutId: workout.id,
                                    })
                                // navigation.navigate("Workout", {
                                //     items: [
                                //         {
                                //             title: "Exercise",
                                //             contents: workout.exercises,
                                //         },
                                //     ],
                                // })
                            }
                        />
                    ))}

                    {/* <HomescreenCell
                        title="Burpees, Squats & Planks"
                        tagline="Have a try at small workout"
                        eta="30"
                        imgUri={require("../../assets/planks.jpg")}
                        action={() =>
                            navigation.navigate("Workout", {
                                items: [
                                    {
                                        title: "Exercise",
                                        contents: [
                                            {
                                                title: "Plank Shoulder Taps",
                                                img: require("../../assets/Plank-Shoulder-Taps.jpg"),
                                                duration: "40 seconds",
                                            },
                                            {
                                                title: "Side Plank and Leg lift",
                                                img: require("../../assets/Side-Plank-Leg-Lift.jpg"),
                                                duration: "2*40 seconds",
                                            },
                                            {
                                                title: "Narrow Bodyweight Squat",
                                                img: require("../../assets/Narrow-Squat.jpg"),
                                                duration: "40 seconds",
                                            },
                                            {
                                                title: "Bodyweight Overhead Squats",
                                                img: require("../../assets/Overhead-Squat.jpg"),
                                                duration: "40 seconds",
                                            },
                                            {
                                                title: "Burpees",
                                                img: require("../../assets/burpees.jpg"),
                                                duration: "40 seconds",
                                            },
                                            {
                                                title: "Plank Knee Drive",
                                                img: require("../../assets/plank-knee-drive.jpg"),
                                                duration: "40 seconds",
                                            },
                                        ],
                                    },
                                ],
                            })
                        }
                    />

                    <HomescreenCell
                        title="Shape your body"
                        tagline="Exercise to tone your Butt, Thighs and Legs"
                        eta="30"
                        imgUri={require("../../assets/shape-body.jpg")}
                        action={() =>
                            navigation.navigate("Workout", {
                                items: [
                                    {
                                        title: "Exercise",
                                        contents: [
                                            {
                                                title: "Donkey Kick",
                                                img: require("../../assets/donkey-kick.jpg"),
                                                duration: "2*40 seconds",
                                            },
                                            {
                                                title: "Squat Jacks",
                                                img: require("../../assets/squat-jacks.jpg"),
                                                duration: "40 seconds",
                                            },
                                            {
                                                title: "Standing Kickback",
                                                img: require("../../assets/standing-kickback.jpg"),
                                                duration: "40 seconds",
                                            },
                                            {
                                                title: "Side-lying Leg Lifts",
                                                img: require("../../assets/side-lying-leg-lifts.jpg"),
                                                duration: "2*40 seconds",
                                            },
                                            {
                                                title: "Frog Squat",
                                                img: require("../../assets/frog-squat.jpg"),
                                                duration: "40 seconds",
                                            },
                                            {
                                                title: "Froggy Glute Lifts",
                                                img: require("../../assets/froggy-glute-lifts.jpg"),
                                                duration: "40 seconds",
                                            },
                                        ],
                                    },
                                ],
                            })
                        }
                    />

                    <HomescreenCell
                        title="HIIT Workout"
                        tagline="HIIT Workout will burn fat quickly"
                        eta="30"
                        imgUri={require("../../assets/HIIT.jpg")}
                        action={() =>
                            navigation.navigate("Workout", {
                                items: [
                                    {
                                        title: "Exercise",
                                        contents: [
                                            {
                                                title: "Narrow Bodyweight Squat",
                                                img: require("../../assets/Overhead-Squat.jpg"),
                                                duration: "40 seconds",
                                            },
                                            {
                                                title: "Curtsy Squat",
                                                img: require("../../assets/mountain-climbers.png"),
                                                duration: "40 seconds",
                                            },
                                            {
                                                title: "Jump Squats",
                                                img: require("../../assets/jump-squats.jpg"),
                                                duration: "40 seconds",
                                            },
                                            {
                                                title: "Alternating Jump Lunges",
                                                img: require("../../assets/alternating-jump-lunge.jpg"),
                                                duration: "40 seconds",
                                            },
                                            {
                                                title: "Squat with Punches",
                                                img: require("../../assets/squat-with-punches.jpg"),
                                                duration: "40 seconds",
                                            },
                                            {
                                                title: "Curtsy Squat",
                                                img: require("../../assets/curtsy-squat.jpg"),
                                                duration: "40 seconds",
                                            },
                                        ],
                                    },
                                ],
                            })
                        }
                    />

                    <HomescreenCell
                        title="Squat Variations"
                        tagline="Train your muscle at thighs"
                        eta="30"
                        imgUri={require("../../assets/squat-variations.jpg")}
                        action={() =>
                            navigation.navigate("Workout", {
                                items: [
                                    {
                                        title: "Exercise",
                                        contents: [
                                            {
                                                title: "Bodyweight Overhead Squats",
                                                img: require("../../assets/Narrow-Squat.jpg"),
                                                duration: "40 seconds",
                                            },
                                            {
                                                title: "Curtsy Squat",
                                                img: require("../../assets/curtsy-squat.jpg"),
                                                duration: "40 seconds",
                                            },
                                            {
                                                title: "Squat Side kicks",
                                                img: require("../../assets/squat-side-kicks.jpg"),
                                                duration: "40 seconds",
                                            },
                                            {
                                                title: "Frog Squat",
                                                img: require("../../assets/frog-squat.jpg"),
                                                duration: "40 seconds",
                                            },
                                            {
                                                title: "Squat Pulse",
                                                img: require("../../assets/squat-pulse.jpg"),
                                                duration: "40 seconds",
                                            },
                                            {
                                                title: "In-out Jump Squat",
                                                img: require("../../assets/in-out-jump-squat.jpg"),
                                                duration: "40 seconds",
                                            },
                                        ],
                                    },
                                ],
                            })
                        }
                    /> */}
                </Section>
            </TableView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    cellContainer: {
        flex: 1,
        height: 290, // Ensure the container height matches the cell
    },
    cellImage: {
        width: "100%", // Image spans the full width of the cell
        height: 200, // Height of the image
        borderRadius: 8, // Optional rounded corners
    },
    cellEtaContainer: {
        position: "absolute", // Absolute positioning for ETA
        top: 10, // Distance from top of the image
        right: 10, // Distance from the right
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black background
        paddingHorizontal: 8, // Horizontal padding
        paddingVertical: 4, // Vertical padding
        borderRadius: 4, // Rounded corners for ETA box
    },
    cellEtaText: {
        color: "#fff", // White text for contrast
        fontSize: 12, // Small text size
        fontWeight: "bold", // Bold text
    },
    cellTextContainer: {
        flex: 1,
        padding: 16, // Padding for the text container
        backgroundColor: "#fff", // White background
        borderBottomLeftRadius: 8, // Rounded corners for the bottom
        borderBottomRightRadius: 8, // Rounded corners for the bottom
    },
    cellTitle: {
        fontSize: 18, // Larger font size for title
        fontWeight: "bold", // Bold font for title
        marginBottom: 4, // Margin between title and tagline
    },
    cellTagline: {
        fontSize: 14, // Smaller font size for tagline
        color: "#666", // Grey text for tagline
    },
    menuHeader: {
        padding: 16,
        backgroundColor: "#ff6347", // Tomato red background
        alignItems: "center",
    },
    sectionHeader: {
        fontSize: 18, // Larger font for headers
        fontWeight: "bold", // Bold text
        color: "#333", // Darker grey for better contrast
        marginVertical: 8,
    },

    menuItemImage: {
        width: 40, // Fixed width for the image
        height: 40, // Fixed height for the image
        borderRadius: 8, // Rounded corners for the image
        marginRight: 10, // Space between the image and text
    },
});
