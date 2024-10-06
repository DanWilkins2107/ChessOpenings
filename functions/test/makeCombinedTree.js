import getMoveListFromNode from "./getMoveListFromNode";

export default function makeCombinedTree({ branchArray }) {
    const combinedTree = {
        children: [],
        parent: null,
        move: "Start",
    };

    branchArray.forEach((branch) => {
        // Move to initial node of the branch
        let currentBranchNode = branch.endNode;
        const branchMoveList = getMoveListFromNode(currentBranchNode);
        while (currentBranchNode.parent) {
            currentBranchNode = currentBranchNode.parent;
        }
        console.log(currentBranchNode);
        let currentTreeNode = combinedTree;
        branchMoveList.forEach((moveObj) => {
            let found = false;
            currentTreeNode.children.forEach((child) => {
                if (found || child.move !== moveObj.move) {
                    return;
                }

                found = true;
                currentTreeNode = child;
                currentBranchNode = currentBranchNode.children.find(
                    (child) => child.move === moveObj.move
                );
                const currentConfidence = currentTreeNode.confidence || 0;
                const currentBranchConfidence = currentBranchNode.confidence || 0;

                // Choose the smallest confidence to ensure testing continues until 100% confidence
                if (currentConfidence > currentBranchConfidence) {
                    currentTreeNode.confidence = currentConfidence;
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
                console.log(
                    "Added new node: move:",
                    moveObj.move,
                    "confidence:",
                    moveObj.confidence || 0
                );
            }
        });
    });

    return combinedTree;
}
