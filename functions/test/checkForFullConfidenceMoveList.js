export default function checkForFullConfidenceMoveList(moveList, color) {
    for (let i = color === "white" ? 0 : 1; i < moveList.length; i = i + 2) {
        if ((moveList[i].confidence || 0) !== 5) {
            return i;
        }
    }
    return -1;
}
