export default function convertPGNToFormat(pgn) {
    const pgnArray = pgn.split("\n\n");
    const tags = pgnArray[0];
    const moves = pgnArray[1];

    const movesArray = moves.split(" ");

    const output = [];
    let currentArray = output;
    const parentStack = [output];

    let isComment = false;
    let comment = "";

    for (let i = 1; i < movesArray.length; i++) {
        const currentSection = movesArray[i];

        if (isComment) {
            comment += currentSection + " ";
        }

        if (currentSection[0].match(/[A-Z,a-z]/) && !isComment) {
            let moveToAdd = currentSection;
            while (!moveToAdd[moveToAdd.length - 1].match(/[A-Za-z0-9+#]/)) {
                moveToAdd = moveToAdd.slice(0, -1);
            }

            currentArray.push({ move: moveToAdd });
        }

        if (currentSection[0] === "(") {
            // Need to create a new array for the variation
            const newVariation = [];

            const lastMove = currentArray[currentArray.length - 1];

            if (!lastMove.ravs) {
                lastMove.ravs = [];
            }

            lastMove.ravs.push({ moves: newVariation });

            parentStack.push(currentArray);
            currentArray = newVariation;
        }

        if (currentSection[0] === "{") {
            isComment = true;
        }

        if (currentSection[0] === "}") {
            isComment = false;
            currentArray[currentArray.length - 1].comment = comment;
            comment = "";
        }

        if (currentSection[currentSection.length - 1] === ")") {
            currentArray = parentStack.pop();
        }
    }

    const pgnObject = {
        event: tags.match(/Event "(.*?)"/)[1],
        moves: output,
    };

    return pgnObject;
}
