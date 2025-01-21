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
                                cellStyle="RightDetail"
                                contentContainerStyle={styles.cellContainer}
                                cellImageView={
                                    <Image
                                        source={content.img}
                                        style={styles.menuItemImage}
                                    />
                                }
                                title={content.title}
                                detail={content.duration}
                            
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
        height: 90, 
        alignItems: "center", 
        justifyContent: "center", 
        flexDirection: "row", 
    },
    sectionHeader: {
        fontSize: 18, // Larger font for headers
        fontWeight: "bold", // Bold text
        color: "#333", // Darker grey for better contrast
        marginVertical: 8,
    },
    menuItemImage: {
        width: 70, // Fixed width for the image
        height: 70, // Fixed height for the image
        borderRadius: 8, // Rounded corners for the image
        marginRight: 10, // Space between the image and text
    },
});
