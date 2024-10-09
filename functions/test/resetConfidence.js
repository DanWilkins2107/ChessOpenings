export default function resetConfidence(tree, combinedTree) {
    console.log(tree)
    const treeHelperFunction = (node, combinedTreeNode) => {
        // Edit confidence of the tree
        node.confidence = 0;
        combinedTreeNode.confidence = 0;
        if (!node.children || node.children.length === 0) {
            return;
        }

        for (const child of node.children) {
            // Find combined tree node (should always exist)
            const combinedTreeChildNode = combinedTreeNode.children.find((treeChild) => {
                return child.move === treeChild.move;
            });
            treeHelperFunction(child, combinedTreeChildNode);
        }
    };

    treeHelperFunction(tree, combinedTree);

    return tree;
}
