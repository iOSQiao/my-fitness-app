export const defaultConfig = {
    currentChallengeId: null,
    challenges: [
        {
            id: 1001,
            name: "Squat",
            img: require("../assets/images/home/challenge_1.jpg"),
            title: "The squats challenge",
            progress: Array.from({ length: 30 }, (_, i) => false),
            duration: "30 days",
            exercises: [
                {
                    name: "Squat",
                    img: require("../assets/squats.jpg"),
                    duration: 40,
                },
            ],
        },
        {
            id: 1002,
            name: "Pushup",
            img: require("../assets/images/home/challenge_2.jpg"),
            title: "The push-ups challenge",
            progress: Array.from({ length: 30 }, (_, i) => false),
            duration: "30 days",
            exercises: [
                {
                    title: "Push-ups",
                    img: require("../assets/push-ups.jpg"),
                    duration: 60,
                },
            ],
        },
        {
            id: 1003,
            name: "Crunch",
            img: require("../assets/images/home/challenge_3.jpg"),
            title: "The crunch challenge",
            progress: Array.from({ length: 30 }, (_, i) => false),
            duration: "30 days",
            exercises: [
                {
                    title: "Crunches",
                    img: require("../assets/crunches.png"),
                    duration: 60,
                },
            ],
        },
        {
            id: 1004,
            name: "Pullup",
            img: require("../assets/images/home/challenge_4.jpg"),
            title: "The pull-ups challenge",
            progress: Array.from({ length: 30 }, (_, i) => false),
            duration: "30 days",
            exercises: [
                {
                    title: "Pull-ups",
                    img: require("../assets/pull-ups.jpg"),
                    duration: 60,
                },
            ],
        },
    ],
};
