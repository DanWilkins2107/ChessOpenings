import getMoveListFromNode from "./getMoveListFromNode";

export default function findOtherBranchCategory(endNode, previousCategory) {
    const moveList = getMoveListFromNode(endNode.endNode);  

    let status = previousCategory;
    if (previousCategory === "unselected") {
        // Check whether branch should be selected
        if (endNode.endNode.reached) {
            status = "selected";
        } else if (endNode.endNode.parent?.reached) {
            status = "selected";
        }
    }
    if (status === "unselected") {
        return "unselected";
    }

    // Check whether branch should be finished
    let finished = true;
    let trainable = false;
    let currentNode = endNode.endNode;
    while (currentNode.parent) {
        currentNode = currentNode.parent;
    }
    const colorNo = currentNode.color === "white" ? 0 : 1;
    for (let i = 0; i < moveList.length; i++) {
        currentNode = currentNode.children.find((child) => {
            return child.move === moveList[i].move;
        });
        if (i % 2 === colorNo && currentNode.parent?.children.length === 1) {
            if (moveList[i].confidence < 2) {
                finished = false;
            }
            trainable = true;
        }
    }

    if (!trainable) {
        return "untrainable";
    }

    return finished ? "finished" : "selected";
}
