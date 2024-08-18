// Returns an array of nodes that are likely mistakes in the branch

export default function scanBranchForMistakes(node, color, threshold, lastMoveNumber) {
    if (threshold === 0) {return [];}
    const mistakes = [];
    const moveNumber = -1;
    const numberToMatch = color === "white" ? 0 : 1;


    const getMistakeHelper = (node, moveNumber) => {
        if (moveNumber % 2 === numberToMatch) {
            if (node.confidence || 0 < threshold) {
                // mistakes.push(node); 
                console.log("Node");
            }
        }
    }

    getMistakeHelper(node, moveNumber);
    return mistakes;
}
