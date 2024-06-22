import { useEffect, useState } from "react";
import Container from "../components/Container";
import { Image, View } from "react-native";
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

    const iconObj = {
        wb: require("./../components/addstudy/icons/wb.png"),
        wr: require("./../components/addstudy/icons/wr.png"),
        wn: require("./../components/addstudy/icons/wn.png"),
        wq: require("./../components/addstudy/icons/wq.png"),
        wk: require("./../components/addstudy/icons/wk.png"),
        wp: require("./../components/addstudy/icons/wp.png"),
        bb: require("./../components/addstudy/icons/bb.png"),
        br: require("./../components/addstudy/icons/br.png"),
        bn: require("./../components/addstudy/icons/bn.png"),
        bq: require("./../components/addstudy/icons/bq.png"),
        bk: require("./../components/addstudy/icons/bk.png"),
        bp: require("./../components/addstudy/icons/bp.png"),
    };

    const handleStudyPress = (UUID) => {
        navigation.navigate("ViewStudy", { UUID });
    };

    return (
        <Container>
            <View>
                {studies.map((studyUuid) => {
                    return (
                        <View key={studyUuid}>
                            <StudyPicker
                                UUID={studyUuid}
                                title={studyInfo[studyUuid]?.title}
                                onStudyPress={handleStudyPress}
                                chapters={studyInfo[studyUuid]?.chapters || []}
                            >
                                <Image
                                    source={iconObj[studyInfo[studyUuid]?.icon]}
                                    style={{ width: 80, height: 80 }}
                                />
                            </StudyPicker>
                        </View>
                    );
                })}
            </View>
        </Container>
    );
};

export default ChooseViewStudyScreen;
