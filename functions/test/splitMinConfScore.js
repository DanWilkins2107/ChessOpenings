export default function splitMinConfScore(split) {
    let minimumConfidence = 2;

    split.children?.map((child) => {
        if (child.confidence < minimumConfidence) {
            minimumConfidence = child.confidence;
        }
    });

    return minimumConfidence;
}
