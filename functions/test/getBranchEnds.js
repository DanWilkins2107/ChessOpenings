const getBranchEnds = (tree) => {
    const branchEnds = [];
    const getBranchEndsHelper = (node) => {
        if (!node.children || node.children.length === 0) {
            branchEnds.push(node);
        } else {
            node.children.forEach((child) => getBranchEndsHelper(child));
        }
    };
    getBranchEndsHelper(tree);
    return branchEnds;
};

export default getBranchEnds;
