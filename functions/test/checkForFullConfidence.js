export default function checkForFullConfidence(moveList) {
    for (let i = 0; i < moveList.length; i++) {
        if (moveList[i].confidence || 0 !== 5) {
            return i;
        }
    }
    return -1;
}