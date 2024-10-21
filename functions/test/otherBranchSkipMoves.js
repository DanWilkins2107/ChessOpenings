import pause from "./pause";

export default async function otherBranchSkipMoves(
    chess,
    moveList,
    moveIndex,
    setMoveIndex,
    forceRerender,
    setForceRerender
) {
    const upcomingMoves = moveList.slice(moveIndex + 1);
    let newIndex = moveIndex;
    let finished = true;
    for (const moveObj of upcomingMoves) {
        if (moveObj.skip) {
            newIndex++;
        } else {
            newIndex++;
            finished = false;
            break;
        }
    }

    if (finished) {
        return false;
    }
    let renderValue = forceRerender;
    setMoveIndex(moveIndex => moveIndex + 1)
    for (let i = moveIndex + 1; i < newIndex; i++) {
        await pause(200);
        setMoveIndex(moveIndex => moveIndex + 1)
        chess.move(moveList[i].move);
        setForceRerender(!renderValue);
        renderValue = !renderValue;
    }
    return newIndex;
}
