export default function findSplitCategory(split, previousStatus, threshold) {
    let status = previousStatus;
    if (previousStatus === "unselected") {
        let reached = true;
        split.children?.forEach((child) => {
            if (!child.reached) {
                reached = false;
            }
        });
        if (reached) {
            status = "selected";
        }
    }

    if (previousStatus === "selected") {
        let upgrade = true;
        split.children?.forEach((child) => {
            if (child.confidenceScore || 0 < threshold) {
                upgrade = false;
            }
        });
        if (upgrade) {
            status = "finished";
        }
    }
    return status;
}