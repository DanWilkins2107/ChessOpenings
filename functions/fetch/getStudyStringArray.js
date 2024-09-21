import ChapterAndStudyToString from "../test/chapterAndStudyToString";
import getStudyDataFromStudyUUID from "./getStudyDataFromStudyUUID";
import getUserStudies from "./getUserStudies";

export default async function getStudyStringArray() {
    const studyStringArray = [];

    const userStudies = await getUserStudies();
    const studyUUIDs = Object.keys(userStudies);

    await Promise.all(
        studyUUIDs.map(async (studyUUID) => {
            const studyData = await getStudyDataFromStudyUUID(studyUUID);
            const chapters = studyData.chapters;

            chapters.forEach((chapter) => {
                const chapterString = ChapterAndStudyToString(chapter, studyData);
                studyStringArray.push(chapterString);
            });
        })
    );

    return studyStringArray;
}
