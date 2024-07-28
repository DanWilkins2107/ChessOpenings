import { useCallback, useState } from "react";
import Container from "../components/Container";
import { Image, View, StyleSheet, ScrollView, Text } from "react-native";
import { auth, db } from "../firebase";
import { ref, get } from "firebase/database";
import StudyPicker from "../components/studies/StudyPicker";
import PageTitle from "../components/PageTitle";
import LineSeparator from "../components/auth/LineSeparator";
import AddStudyButton from "../components/addstudy/AddStudyButton";
import Colors from "../colors";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChooseViewStudyScreen = ({ navigation }) => {
    const [studies, setStudies] = useState([]);
    const [studyInfo, setStudyInfo] = useState({});

    const getStudies = async () => {
        const userStudyRef = ref(db, `users/${auth.currentUser.uid}/studies`);
        get(userStudyRef)
            .then(async (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const studyUuids = Object.keys(data);
                    const localStudies = JSON.parse(
                        (await AsyncStorage.getItem("studies")) || "{}"
                    );
                    let combinedStudies = { ...data };
                    Object.keys(data).forEach((studyUuid) => {
                        if (localStudies[studyUuid]) {
                            combinedStudies[studyUuid] = localStudies[studyUuid];
                        }
                    });

                    const studyList = Object.keys(combinedStudies);
                    const sortedStudies = studyList.sort((a, b) => {
                        return combinedStudies[b] - combinedStudies[a];
                    });

                    setStudies(sortedStudies);

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
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useFocusEffect(
        useCallback(() => {
            getStudies();
        }, [])
    );

    const iconObj = {
        wb: require("../assets/icons/wb.png"),
        wr: require("../assets/icons/wr.png"),
        wn: require("../assets/icons/wn.png"),
        wq: require("../assets/icons/wq.png"),
        wk: require("../assets/icons/wk.png"),
        wp: require("../assets/icons/wp.png"),
        bb: require("../assets/icons/bb.png"),
        br: require("../assets/icons/br.png"),
        bn: require("../assets/icons/bn.png"),
        bq: require("../assets/icons/bq.png"),
        bk: require("../assets/icons/bk.png"),
        bp: require("../assets/icons/bp.png"),
    };

    const handleStudyPress = async (UUID) => {
        navigation.navigate("ViewStudy", { study: UUID });
        const existingData = await AsyncStorage.getItem("studies");
        const newData = { ...JSON.parse(existingData), [UUID]: Date.now() };
        await AsyncStorage.setItem("studies", JSON.stringify(newData));
    };

    return (
        <Container>
            <PageTitle title="Choose a Study" />
            <View style={styles.content}>
                <ScrollView style={styles.scrollView}>
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
                                        style={styles.image}
                                    />
                                </StudyPicker>
                                <LineSeparator text="" />
                            </View>
                        );
                    })}
                </ScrollView>
                {studies.length == 0 && <Text style={styles.text}>Not made any studies yet?</Text>}
                {studies.length != 0 && (
                    <Text style={styles.text}>Want to make another study?</Text>
                )}
                <AddStudyButton
                    title="Add a Study"
                    onPress={() => navigation.navigate("AddStudy")}
                    backgroundColor={Colors.primary}
                    borderColor={Colors.primaryBorder}
                    textColor="#fff"
                />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollView: {
        flexGrow: 0,
    },
    text: {
        fontSize: 16,
        color: Colors.primaryBorder,
        textAlign: "center",
        marginVertical: 10,
    },
    image: {
        width: "80%",
        height: "80%",
    },
});

export default ChooseViewStudyScreen;
