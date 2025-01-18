import { StyleSheet, Text, View, Button, ScrollView, Image } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";

export default function HomeScreen({ navigation }) {
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
                    <HomescreenCell
                        title="Burpees, Squats & Planks"
                        tagline="Have a try at small workout"
                        eta="30"
                        imgUri={require("../../assets/planks.jpg")}
                        action={() =>
                            navigation.navigate("Workout", {
                                items: [
                                    {
                                        title: "Gelato",
                                        contents: [
                                            {
                                                title: "Vanilla",
                                                img: require("../../assets/vanilla.jpg"),
                                                inStock: true,
                                            },
                                            {
                                                title: "Chocolate (Disabled)",
                                                img: require("../../assets/chocolate.jpg"),
                                                inStock: false,
                                            },
                                            {
                                                title: "Mint",
                                                img: require("../../assets/mint.jpg"),
                                                inStock: true,
                                            },
                                        ],
                                    },
                                    {
                                        title: "Coffee",
                                        contents: [
                                            { title: "Flat white", inStock: true },
                                            { title: "Latte", inStock: true },
                                            { title: "Caffe Americano", inStock: true },
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
                                        title: "Burgers",
                                        contents: [
                                            { title: "Classic Burger", inStock: true },
                                            { title: "Cheeseburger", inStock: true },
                                            { title: "Bacon Burger", inStock: true },
                                        ],
                                    },
                                    {
                                        title: "Drink",
                                        contents: [
                                            { title: "Coke", inStock: true },
                                            { title: "Sprite", inStock: false },
                                            { title: "Water", inStock: true },
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
                                        title: "Pizzas",
                                        contents: [
                                            { title: "Margherita", inStock: true },
                                            { title: "Pepperoni", inStock: true },
                                            { title: "BBQ Chicken", inStock: false },
                                            { title: "Vegetarian", inStock: true },
                                        ],
                                    },
                                    {
                                        title: "Sides",
                                        contents: [
                                            { title: "Garlic Bread", inStock: true },
                                            { title: "Mozzarella Sticks", inStock: true },
                                            { title: "Wings", inStock: true },
                                        ],
                                    },
                                    {
                                        title: "Drinks",
                                        contents: [
                                            { title: "Lemonade", inStock: true },
                                            { title: "Iced Tea", inStock: true },
                                            { title: "Water", inStock: true },
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
                                        title: "Pizzas",
                                        contents: [
                                            { title: "Margherita", inStock: true },
                                            { title: "Pepperoni", inStock: true },
                                            { title: "BBQ Chicken", inStock: false },
                                            { title: "Vegetarian", inStock: true },
                                        ],
                                    },
                                    {
                                        title: "Sides",
                                        contents: [
                                            { title: "Garlic Bread", inStock: true },
                                            { title: "Mozzarella Sticks", inStock: true },
                                            { title: "Wings", inStock: true },
                                        ],
                                    },
                                    {
                                        title: "Drinks",
                                        contents: [
                                            { title: "Lemonade", inStock: true },
                                            { title: "Iced Tea", inStock: true },
                                            { title: "Water", inStock: true },
                                        ],
                                    },
                                ],
                            })
                        }
                    />
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
