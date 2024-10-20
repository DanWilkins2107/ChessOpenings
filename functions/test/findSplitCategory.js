export default function findSplitCategory(split, previousStatus, threshold) {
    let status = previousStatus;

    if (previousStatus === "unselected") {
        if (split.reached) {
            status = "selected";
        }
    }

    if (status === "selected") {
        let upgrade = true;
        split.children.forEach((child) => {
            if ((child.confidence || 0) < threshold) {
                upgrade = false;
            }
        });
        if (upgrade) {
            status = "finished";
        }
    }

    return status;
}
