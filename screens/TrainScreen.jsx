import { useEffect, useState } from "react";
import Container from "../components/Container";
import { Text, View, StyleSheet } from "react-native";
import { auth, db } from "../firebase";
import { ref, get } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import pgnToTree from "../functions/tree/pgnToTree";

const TrainScreen = ({ navigation, route }) => {
    const chosenPGNs = route.params.chosenPGNs || null;
    const [chapters, setChapters] = useState(chosenPGNs);
    const [loading, setLoading] = useState(true);
    const [trees, setTrees] = useState([]);

    useEffect(() => {
        const setStudies = async () => {
            let pgnUUIDs = [];
            if (!chosenPGNs) {
                const userStudiesRef = ref(db, `users/${auth.currentUser.uid}/studies`);
                const snapshot = await get(userStudiesRef);
                const studyUUIDs = Object.keys(snapshot.val());
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
            } else {
                pgnUUIDs = chosenPGNs;
            }

            const treeArray = [];

            const treePromises = pgnUUIDs.map(async (pgnUUID) => {
                // Check AsyncStorage for pgn
                const pgnAsync = await AsyncStorage.getItem("pgnData/" + pgnUUID);
                if (pgnAsync) {
                    const tree = pgnToTree(JSON.parse(pgnAsync));
                    treeArray.push(tree);
                } else {
                    const pgnRef = ref(db, `pgns/${pgnUUID}`);
                    const pgnSnapshot = await get(pgnRef);
                    if (!pgnSnapshot.exists()) {
                        return;
                    }
                    const pgn = pgnSnapshot.val();
                    const tree = pgnToTree(pgn);
                    treeArray.push(tree);
                }
            });

            await Promise.all(treePromises);
            setTrees(treeArray);
            setLoading(false);

            
        };

        setStudies();
    }, []);

    return (
        <Container>
            <View>
                <Text style={styles.text}>{String(loading)}</Text>
                <Text style={styles.text}>{JSON.stringify(chapters)}</Text>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    text: {
        color: "white",
    },
});

export default TrainScreen;
