import { useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Section from "../../components/home/Section";
import ChallengesView from "../../components/home/ChallengesView";
import WorkoutsView from "../../components/home/WorkoutsView";
import CurrentChallenge from "../../components/home/CurrentChallenge";

export default function HomeScreen() {
    const navigation = useNavigation();

    const handleClickeChallenge = (item) => {
        navigation.navigate("records", {
            challengeId: item.id,
        });
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
            <ScrollView
                style={{ width: "100%", height: "100%" }}
                contentContainerStyle={styles.scrollViewContent}
                onScroll={(event) => {
                    const currentOffset = event.nativeEvent.contentOffset.y;
                    if (currentOffset > 36 * 2 + 16) {
                        navigation.setOptions({
                            headerTitle: "Fitness Application",
                            headerStyle: {
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                            },
                        });
                    } else {
                        navigation.setOptions({
                            headerTitle: "",
                            headerStyle: {
                                backgroundColor: "#fff",
                            },
                        });
                    }
                }}>
                <View style={styles.content}>
                    <Text style={styles.title}>{'Fitness\nApplication'}</Text>
                    <CurrentChallenge></CurrentChallenge>
                    <Section
                        title={"Challenges"}
                        desc={"Start the Challenges and fulfill your Potential"}>
                        <ChallengesView onPress={handleClickeChallenge}></ChallengesView>
                    </Section>
                    <Section title={"Workouts"} desc={"Test yourself and see concrete results"}>
                        <WorkoutsView></WorkoutsView>
                    </Section>
                </View>
            </ScrollView>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: "#fff",
    },
    scrollViewContent: {
        padding: 0,
    },
    content: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    title: {
        color: "#000",
        fontSize: 36,
        fontWeight: "bold",
        lineHeight: 36,
        textAlign: "left",
        padding: 16,
    },
});
