export default function ChapterAndStudyToString(chapter, study) {
    const chapterString =
        chapter.pgn + "___" + (study.color || "white") + "___" + study.title + "___" + chapter.name;

    return chapterString;
}
