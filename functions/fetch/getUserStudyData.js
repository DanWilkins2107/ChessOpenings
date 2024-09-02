import { ref } from "firebase/database";
import { db, auth } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getUserStudies from "./getUserStudies";
import getStudyDataFromStudyUUID from "./getStudyDataFromStudyUUID";

export default async function getUserStudyData() {
    const studyObjToAdd = {};
    let studyUUIDs = [];
    let userStudies;

    try {
        userStudies = await getUserStudies();
    } catch {
        throw new Error("Could not fetch your studies.");
    }

    if (!userStudies) return { studyObjToAdd, studyUUIDs };

    studyUUIDs = Object.keys(userStudies);

    try {
        await Promise.all(
            studyUUIDs.map(async (studyUUID) => {
                const studyData = await getStudyDataFromStudyUUID(studyUUID);
                if (studyData) {
                    studyObjToAdd[studyUUID] = studyData;
                }
            })
        );
    } catch {
        throw new Error("Could not fetch study information.");
    }

    let combinedStudies = { ...userStudies };
    const localStudies = JSON.parse((await AsyncStorage.getItem("studies")) || "{}");
    Object.keys(userStudies).forEach((studyUUID) => {
        if (localStudies[studyUUID]) {
            combinedStudies[studyUUID] = localStudies[studyUUID];
        }
    });

    const sortedStudies = studyUUIDs.sort((a, b) => {
        return combinedStudies[b] - combinedStudies[a];
    });

    return { studyObjToAdd, sortedStudies };
}
