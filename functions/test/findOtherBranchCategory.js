import getMoveListFromNode from "./getMoveListFromNode";

export default function findOtherBranchCategory(endNode, previousCategory) {
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
    const moveList = getMoveListFromNode(endNode.endNode);
    let finished = true;
    let currentNode = endNode.endNode;
    while (currentNode.parent) {
        currentNode = currentNode.parent;
    }
    const colorNo = currentNode.color === "white" ? 0 : 1;
    for (let i = 0; i < moveList.length; i++) {
        currentNode = currentNode.children.find((child) => {
            return child.move === moveList[i].move;
        });
        if (
            i % 2 === colorNo &&
            moveList[i].confidence < 2 &&
            currentNode.parent?.children.length === 1
        ) {
            finished = false;
        }
    }

    return finished ? "finished" : "selected";
}
