export default function splitMinConfScore(split) {
    let minimumConfidence = 2;

    split.splitNode.children?.map((child) => {
        if ((child.confidence || 0) < minimumConfidence) {
            minimumConfidence = child.confidence || 0;
        }
    });

    return minimumConfidence;
}
