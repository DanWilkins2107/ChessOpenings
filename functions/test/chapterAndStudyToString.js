export default function ChapterAndStudyToString(chapter, study, studyUUID) {
    const chapterString =
        chapter.pgn +
        "___" +
        (study.color || "white") +
        "___" +
        study.title +
        "___" +
        chapter.name +
        "___" +
        studyUUID;

    return chapterString;
}
