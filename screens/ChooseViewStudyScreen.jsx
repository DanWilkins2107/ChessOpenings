import { useEffect, useState } from "react";
import Container from "../components/Container";
import { Text, View } from "react-native";
import { auth } from "../firebase";
import { db } from "../firebase";
import { ref, get } from "firebase/database";
import StudyPicker from "../components/studies/StudyPicker";

const ChooseViewStudyScreen = ({ navigation }) => {
    const [studies, setStudies] = useState([]);
    const [studyInfo, setStudyInfo] = useState({});
    useEffect(() => {
        const userStudyRef = ref(db, `users/${auth.currentUser.uid}/studies`);
        get(userStudyRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const studyUuids = Object.keys(data);
                    setStudies(studyUuids);
                    for (const studyUuid of studyUuids) {
                        const studyRef = ref(db, `studies/${studyUuid}`);
                        get(studyRef).then((snapshot) => {
                            if (snapshot.exists()) {
                                const studyData = snapshot.val();
                                setStudyInfo((prev) => {
                                    return { ...prev, [studyUuid]: studyData };
                                });
                            }
                        });
                    }
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <Container>
            <View>
                {studies.map((studyUuid) => {
                    return (
                        <View key={studyUuid}>
                            <StudyPicker title={studyInfo[studyUuid]?.title} icon={studyInfo[studyUuid]?.icon} chapterArray={studyInfo[studyUuid]?.chapters} />
                        </View>
                    );
                })}
            </View>
        </Container>
    );
};

export default ChooseViewStudyScreen;
