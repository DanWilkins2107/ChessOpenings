import { Colors } from "../../styling";
import getMoveListFromNode from "./getMoveListFromNode";

export default function setUpOtherBranchTest(
    branch,
    chess,
    setPermMessage,
    setPov,
    setMoveList,
    setMoveIndex,
    whiteCombinedTree,
    blackCombinedTree
) {
    const moveList = getMoveListFromNode(branch.endNode, branch.color);
    const correctTree = branch.color === "white" ? blackCombinedTree : whiteCombinedTree;

    const otherBranchMoveList = [];
    let currentNode = correctTree;

    const colorMoveNumber = branch.color === "white" ? 0 : 1;

    let moveNo = 0;

    for (const moveObj of moveList) {
        // Find the child node
        const childNode = currentNode.children.find((child) => child.move === moveObj.move);
        const noOfChildren = currentNode.children.length;

        if (moveNo % 2 === colorMoveNumber && noOfChildren === 1) {
            otherBranchMoveList.push({
                move: moveObj.move,
                skip: false,
                confidence: moveObj.confidence || 0,
            });
        } else {
            otherBranchMoveList.push({ move: moveObj.move, skip: true });
        }
        currentNode = childNode;
        moveNo++;
    }

    setMoveList(otherBranchMoveList);

    let index = null;
    let backupIndex = null;
    // Find Move Index
    for (const moveObj of otherBranchMoveList) {
        if (!moveObj.skip && backupIndex === null) {
            backupIndex = otherBranchMoveList.indexOf(moveObj);
        }
        if (!moveObj.skip && (moveObj.confidence || 0) < 2) {
            index = otherBranchMoveList.indexOf(moveObj);
            break;
        }
    }

    if (index === null) {
        index = backupIndex;
    }

    chess.reset();
    otherBranchMoveList.slice(0, index).forEach((moveObj) => {
        chess.move(moveObj.move);
    });

    const color = branch.color === "white" ? "White" : "Black";
    const pov = branch.color === "white" ? "black" : "white";
    setPov(pov);
    setPermMessage({
        message: `What is ${color}'s move?`,
        backgroundColor: Colors.card1,
        textColor: Colors.text,
    });

    setMoveIndex(index);
}
