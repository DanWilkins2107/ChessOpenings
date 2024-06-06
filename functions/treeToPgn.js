function treeToPgn(currentNode) {
    let tempNode = currentNode;
    while (tempNode.parent) {
        tempNode = tempNode.parent;
    }
    const topParent = tempNode;
    return formatPgn(topParent, 1);
}

function formatPgn(node, moveNumber) {
    let moves = [];
    let tempNode = node;
    while (tempNode.children && tempNode.children.length > 0) {
        tempNode = tempNode.children[0];
        let move = {
            comments: [],
            move: tempNode.move,
            move_number: moveNumber
        };
        if (tempNode.parent.children.length > 1) {
            move.ravs = [];
            for (let i = 1; i < tempNode.parent.children.length; i++) {
                move.ravs.push(formatPgn(tempNode.parent.children[i], moveNumber));
            }
        }
        moves.push(move);
        moveNumber++;
    }
    for (let i = 0; i < moves.length; i++) {
        if (i % 2 === 0) {
            moves[i].move_number = Math.floor(i / 2) + 1;
        } else {
            delete moves[i].move_number;
        }
    }
    return moves;
}

export default treeToPgn;