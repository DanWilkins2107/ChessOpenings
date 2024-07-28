import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const useSetStudy = (studyUUID, studyObj) => {
    const [isSubmitting, setIsSubmitting] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const study = JSON.stringify(studyObj);
        const setStudy = async () => {
            try {
                await AsyncStorage.setItem("studies/" + studyUUID, study);
                setIsSubmitting(false);
            } catch (error) {
                setError(error);
            }
        };
        setStudy();
    }, [studyUUID, studyObj]);

    return { isSubmitting, error };
};

export default useSetStudy;
