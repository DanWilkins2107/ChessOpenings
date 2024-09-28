export default function updateCombinedTree(tree, moveList, moveIndex) {
    let currentNode = tree;
    for (moveObj of moveList.slice(0, moveIndex + 1)) {
        let found = false;
        for (child of currentNode.children) {
            if (child.move === moveObj.move) {
                currentNode = child;
                found = true;
                currentNode.reached = true;
                break;
            }
        }
        if (!found) {
            return;
        }
    }
}
