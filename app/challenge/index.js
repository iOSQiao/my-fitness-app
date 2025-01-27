import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, Image } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";

import * as helper from "../../utils/globalSettingsHelper";

export default function HomeScreen({ navigation }) {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const settings = await helper.getGlobalSettings();
        setChallenges(settings.challenges);
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
                        <Text style={styles.cellEtaText}>{props.eta} days</Text>
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
                    {challenges.map((challenge) => (
                        <HomescreenCell
                            key={challenge.id}
                            title={challenge.title}
                            tagline={challenge.tagline}
                            eta="30"
                            imgUri={challenge.img}
                            action={() =>
                                navigation.navigate("Challenge", {
                                    items: [
                                        {
                                            title: "Exercise",
                                            contents: challenge.exercises,
                                        },
                                    ],
                                })
                            }
                        />
                    ))}

                    {/* <HomescreenCell
                        title="Squat"
                        tagline="Squat Everyday, get a nice shape"
                        eta="30"
                        imgUri={require("../../assets/squats2.jpg")}
                        action={() =>
                            navigation.navigate("Challenge", {
                                items: [
                                    {
                                        title: "Exercise",
                                        contents: [
                                            {
                                                title: "Squats",
                                                img: require("../../assets/squats.jpg"),
                                                duration: "40 seconds",
                                            }
                                        ],
                                    }
                                ],
                            })
                        }
                    />

                    <HomescreenCell
                        title="Push-ups"
                        tagline="Push-ups gives you a stronger arm"
                        eta="30"
                        imgUri={require("../../assets/push-ups2.jpg")}
                        action={() =>
                            navigation.navigate("Challenge", {
                                items: [
                                    {
                                        title: "Exercise",
                                        contents: [
                                            {                                                
                                                title: "Push-ups",
                                                img: require("../../assets/push-ups.jpg"),
                                                duration: "60 seconds",},
                                        ],
                                    }
                                ],
                            })
                        }
                    />

                    <HomescreenCell
                        title="Crunches"
                        tagline="Crunches will shape your belly"
                        eta="30"
                        imgUri={require("../../assets/crunches2.jpg")}
                        action={() =>
                            navigation.navigate("Challenge", {
                                items: [
                                    {
                                        title: "Exercise",
                                        contents: [
                                            {                                                
                                                title: "Crunches",
                                                img: require("../../assets/crunches.png"),
                                                duration: "60 seconds",},
                                        ],
                                    },
                                ],
                            })
                        }
                    />

                    <HomescreenCell
                        title="Pull-ups"
                        tagline="Pull-ups will enhance your stamina"
                        eta="30"
                        imgUri={require("../../assets/pull-ups2.jpg")}
                        action={() =>
                            navigation.navigate("Challenge", {
                                items: [
                                    {
                                        title: "Exercise",
                                        contents: [
                                            {                                                
                                                title: "Pull-ups",
                                                img: require("../../assets/pull-ups.jpg"),
                                                duration: "60 seconds",},
                                        ],
                                    }
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
