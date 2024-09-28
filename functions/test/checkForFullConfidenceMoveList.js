export default function checkForFullConfidenceMoveList(moveList, color, threshold = 5) {
    for (let i = color === "white" ? 0 : 1; i < moveList.length; i = i + 2) {
        if ((moveList[i].confidence || 0) !== threshold) {
            return i;
        }
    }
    return -1;
}
