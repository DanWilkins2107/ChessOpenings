import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const useGetStudy = (studyUUID) => {
    const [study, setStudy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getStudy = async () => {
            try {
                const study = await AsyncStorage.getItem("studies/" + studyUUID);
                if (study) {
                    setStudy(JSON.parse(study));
                }
                setLoading(false);
            } catch (error) {
                setError(error);
            }
        };
        getStudy();
    }, [studyUUID]);

    return { study, loading, error };
}

export default useGetStudy;