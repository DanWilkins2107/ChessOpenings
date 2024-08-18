import { get, ref } from 'firebase/database';
import { db } from '../../firebase';

export default async function getStudyDataFromStudyUUID(studyUUID) {
    try {
        const studyRef = ref(db, `studies/${studyUUID}`);
        const studySnapshot = await get(studyRef);
        return studySnapshot.val();
    } catch (error) {
        throw new Error(error);
    }
};
