function pgnToTree(pgn) {
  let tree = null;
  let current = null;
  let prevMove = null;

  for (const move of pgn) {
    if (move.ravs) {
      // Handle alternative moves
      for (const rav of move.ravs) {
        const child = { move: rav.moves[0].move, comments: rav.moves[0].comments, children: [] };
        current.children.push(child);
        let newCurrent = child;
        for (const ravMove of rav.moves.slice(1)) {
          const grandchild = { move: ravMove.move, comments: ravMove.comments, children: [] };
          newCurrent.children.push(grandchild);
          newCurrent = grandchild;
        }
      }
    }

    const newNode = { move: move.move, comments: move.comments, children: [] };
    if (prevMove) {
      current.children.push(newNode);
    } else {
      tree = newNode;
    }
    current = newNode;
    prevMove = move;
  }

  return tree;
}

export default pgnToTree;