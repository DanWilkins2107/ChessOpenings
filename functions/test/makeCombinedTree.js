import getMoveListFromNode from "./getMoveListFromNode";

export default function makeCombinedTree({ branchArray }) {
    const combinedTree = {
        children: [],
        parent: null,
        move: "Start",
    };

    branchArray.forEach((branch) => {
        // Move to initial node of the branch
        let currentNode = branch.endNode;
        const branchMoveList = getMoveListFromNode(currentNode);
        while (currentNode.parent) {
            currentNode = currentNode.parent;
        }
        let currentTreeNode = combinedTree;
        branchMoveList.forEach((moveObj) => {
            let found = false;
            currentTreeNode.children.forEach((child) => {
                if (child.move === moveObj.move) {
                    currentTreeNode = child;
                    found = true;
                    if (moveObj.confidence || 0 < currentNode.confidence || 0) {
                        currentNode.confidence = moveObj.confidence || 0;
                    }
                }
            });

            if (!found) {
                const newTreeNode = {
                    children: [],
                    parent: currentTreeNode,
                    move: moveObj.move,
                    confidence: moveObj.confidence || 0,
                };
                currentTreeNode.children.push(newTreeNode);
                currentTreeNode = newTreeNode;
            }
        });
    });

    return combinedTree;
}
