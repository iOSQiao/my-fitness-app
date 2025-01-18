import { StyleSheet, Text, View, Button, ScrollView, Image } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";

export default function DetailsScreen({ route }) {
    const { items } = route.params;

    return (
        <ScrollView style={{ backgroundColor: "#f9f9f9" }}>
            <TableView>
                {items.map((section, index) => (
                    <Section
                        key={index}
                        header={section.title}
                        headerTextStyle={styles.sectionHeader}>
                        {section.contents.map((content, subIndex) => (
                            <Cell
                                key={subIndex}
                                title={content.title}
                                titleTextStyle={{
                                    color: content.inStock ? "#333" : "#999", // Grey out "out of stock" items
                                    textDecorationLine: content.inStock ? "none" : "line-through",
                                }}
                                cellStyle="Basic"
                                contentContainerStyle={{
                                    backgroundColor: "#fff",
                                    borderRadius: 8,
                                    marginVertical: 4,
                                    marginHorizontal: 16,
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 3,
                                    elevation: 3,
                                }}
                                cellImageView={
                                    <Image
                                        source={content.img} // Menu item image
                                        style={[
                                            styles.menuItemImage,
                                            { opacity: content.inStock ? 1 : 0.5 }, // Dim the image for "Out of Stock" items
                                        ]}
                                    />
                                }
                                // isDisabled={!content.inStock} // Disable "out of stock" items
                            />
                        ))}
                    </Section>
                ))}
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
