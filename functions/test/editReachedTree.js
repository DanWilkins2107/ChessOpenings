import getMoveListFromNode from "./getMoveListFromNode";

export default function editReachedTree(tree, branch) {
    const moveList = getMoveListFromNode(branch.endNode);
    let currentNode = tree
    for (const move of moveList) {
        currentNode = currentNode.children.find((child) => child.move === move.move);
        currentNode["reached"] = true;
    }
}
