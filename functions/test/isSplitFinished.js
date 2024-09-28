export default function isSplitFinished(moveList) {
    let finished = true;
    moveList.forEach((splitMoveObj) => {
        if (!splitMoveObj.guessed) {
            finished = false;
        }
    });

    return finished;
}
