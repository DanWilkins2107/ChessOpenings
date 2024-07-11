import Container from "../components/Container";
import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { get, ref } from "firebase/database";
import StudyAndChapterSelector from "../components/chooseStudy/StudyAndChapterSelector";

const ChooseTrainStudyScreen = ({ navigation }) => {
    const [studies, setStudies] = useState([]);

    useEffect(async () => {
        const getStudyInfo = async (study) => {
            const userStudies = ref(db, `users/${auth.currentUser.uid}/studies`);
            const studyObj = {};
            get(userStudies).then(async (snapshot) => {
                if (snapshot.exists()) {
                    const studies = snapshot.val();
                    await Promise.all(
                        Object.keys(studies).map(async (study) => {
                            const studyRef = ref(db, `studies/${study}`);
                            const studySnapshot = await get(studyRef);
                            if (studySnapshot.exists()) {
                                studyObj[study] = studySnapshot.val();
                            }
                        })
                    );
                    setStudies(studyObj);
                } else {
                    console.log("No studies found");
                }
            });
        };
        getStudyInfo();
    }, []);

    return (
        <Container>
            <View>
                <StudyAndChapterSelector studyObj={studies} />
            </View>
        </Container>
    );
};

export default ChooseTrainStudyScreen;
