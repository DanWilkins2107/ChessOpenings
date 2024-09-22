import getMoveListFromNode from "./getMoveListFromNode";

export default function otherBranchMinConfScore(endNode) {
    const moveList = getMoveListFromNode(endNode.endNode);
    let minConfScore = 2;

    let currentNode = endNode.endNode;
    while (currentNode.parent) {
        currentNode = currentNode.parent;
    }

    const colorNo = currentNode.color === "white" ? 0 : 1;
    for (let i = 0; i < moveList.length; i++) {
        currentNode = currentNode.children.find((child) => {
            return child.move === moveList[i].move;
        });
        if (i % 2 === colorNo && moveList[i].confidence < minConfScore && currentNode.parent?.children.length === 1) {
            minConfScore = moveList[i].confidence;
        }
    }

    return minConfScore;
}
