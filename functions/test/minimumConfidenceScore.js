import getMoveListFromNode from "./getMoveListFromNode";

export default function minimumConfidenceScore(branch) {
    let minimumConfidence = 5;
    const branchMoves = getMoveListFromNode(branch.endNode, branch.color);

    for (let i = branch.color === "white" ? 0 : 1; i < branchMoves.length; i = i + 2) {
        if (branchMoves[i].confidence < minimumConfidence) {
            minimumConfidence = branchMoves[i].confidence;
        }
    }

    return minimumConfidence;
}

// export default function checkForFullConfidenceMoveList(moveList, color) {
//     for (let i = color === "white" ? 0 : 1; i < moveList.length; i = i + 2) {
//         if ((moveList[i].confidence || 0) !== 5) {
//             return i;
//         }
//     }
//     return -1;
// }
