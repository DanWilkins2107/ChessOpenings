const test =
    '[Event "Chess App Tests: 2 variations at same point"] [Site "https://lichess.org/study/JWEDdHud/4W49nd3F"] [Result "*"] [Annotator "https://lichess.org/@/dd2107"] [Variant "Standard"] [ECO "B12"] [Opening "Caro-Kann Defense: Advance Variation"] [UTCDate "2024.06.01"] [UTCTime "14:07:38"]\n1. e4 c6 2. d4 d5 3. e5! (3. f3 dxe4 4. fxe4 e5 $13) (3. Bd3 dxe4 $15 4. Bxe4 Nf6 $22 $146 $140 $138 $40) 3... Bf5 4. c4 e6 5. Nc3 *';

function convertPGNToFormat(pgn) {
    const pgnArray = pgn.split("\n");
    const tags = pgnArray[0];
    const moves = pgnArray[1];

    

    const movesArray = moves.split(" ");

    const output = [];
    let currentArray = output;
    const parentStack = [output];

    for (let i = 1; i < movesArray.length; i++) {
        const currentSection = movesArray[i];

        if (currentSection[0].match(/[A-Z,a-z]/)) {
            let moveToAdd = currentSection;
            while (!moveToAdd[moveToAdd.length - 1].match(/[0-9\+#]/)) {
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

console.log(JSON.stringify(convertPGNToFormat(test), null, 2));
