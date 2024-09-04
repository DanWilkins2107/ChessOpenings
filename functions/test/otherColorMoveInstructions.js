export default function otherColorMoveInstructions(moveList, combinedTree, color) {
    const colorNo = color === "white" ? 0 : 1;
    let currentNode = combinedTree;
    const instructionArray = [];

    let isTestable = false;
    let nonFullConfidence = false;

    for (let i = 0; i < moveList.length; i++) {
        if (i % 2 === colorNo && moveList[i].confidence < 2) {
            nonFullConfidence = true;
        }
        if (
            currentNode.children &&
            currentNode.children.length === 1 &&
            i % 2 === colorNo &&
            nonFullConfidence
        ) {
            instructionArray.push({ move: moveList[i].move, instruction: "test" });
            isTestable = true;
        } else {
            instructionArray.push({ move: moveList[i].move, instruction: "skip" });
        }
        const correctChild = currentNode.children.find((child) => {
            return child.move === moveList[i].move;
        });
        currentNode = correctChild;
    }

    return { instructionArray, isTestable };
}
