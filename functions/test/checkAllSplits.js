import findSplitCategory from "./findSplitCategory";

export default function checkAllSplits(splitObj) {
    const newSplitObj = {
        unselected: [],
        selected: [],
        finished: [],
    };

    splitObj.unselected.map((split) => {
        const category = findSplitCategory(split.splitNode, "unselected", 2);
        newSplitObj[category].push(split);
    });

    splitObj.selected.map((split) => {
        const category = findSplitCategory(split, "selected", 2);
        newSplitObj[category].push(split);
    });

    splitObj.finished.map((split) => {
        const category = findSplitCategory(split, "finished", 2);
        newSplitObj[category].push(split);
    });
    
    return newSplitObj;
}
