import { useEffect, useState } from "react";
import Container from "../components/Container";
import { Text, View, StyleSheet } from "react-native";
import { auth, db } from "../firebase";
import { ref, get } from "firebase/database";

const TrainScreen = ({ navigation, route }) => {
    const chosenPGNs = route.params.chosenPGNs || null;
    const [chapters, setChapters] = useState(chosenPGNs);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const setStudies = async () => {
            if (!chosenPGNs) {
                const userStudiesRef = ref(db, `users/${auth.currentUser.uid}/studies`);
                const snapshot = await get(userStudiesRef);
                const studyUUIDs = Object.keys(snapshot.val());
                let pgnUUIDs = [];

                await Promise.all(
                    studyUUIDs.map(async (studyUUID) => {
                        const studyRef = ref(db, `studies/${studyUUID}`);
                        const studySnapshot = await get(studyRef);
                        const chapters = studySnapshot.val().chapters;

                        chapters.forEach((chapter) => {
                            pgnUUIDs.push(chapter.pgn);
                        });
                    })
                );
                setChapters(pgnUUIDs); 
            }
            setLoading(false);
        };

        setStudies();

    }, []);

    return (
        <Container>
            <View>
                <Text style={styles.text} >{String(loading)}</Text>
                <Text style={styles.text}>{JSON.stringify(chapters)}</Text>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    text: {
        color: "white",
    }
});

export default TrainScreen;
