import Container from "../components/Container";
import { Text, ScrollView, Button } from "react-native";

const CustomTestingScreen = () => {
  const pgnParser = require("pgn-parser");

  const pgn = `
[Event "Alekhine Defence: Modern Variation (4...Bg4)"]
[Site "https://lichess.org/study/4PWwuog5/s0lf0C9J"]
[Result "*"]
[Variant "Standard"]
[ECO "B05"]
[Opening "Alekhine Defense: Modern Variation, Main Line"]
[Annotator "https://lichess.org/@/dd2107"]
[UTCDate "2024.02.28"]
[UTCTime "12:52:37"]

1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 Bg4 5. Be2 e6 6. O-O Be7 (6... Nc6 { Not a good move, but important to know why. } 7. c4 Nb6 8. exd6 cxd6 9. d5 Bxf3 10. Bxf3 exd5 11. a4 dxc4 12. a5 Nd7 13. a6) 7. h3 Bh5 8. c4 Nb6 9. Nc3 O-O 10. Be3 Nc6?? 11. exd6 cxd6 12. d5!! Bxf3 13. Bxf3 Ne5 14. b3 *
`;
  const [game] = pgnParser.parse(pgn);
  const gameMoves = game.moves;

  const pgnSort = (moves) => {
    let sortedMoves = [];
    for (i = 0; i < moves.length; i++) {
      console.log(`MOVE ${i}:`, moves[i])
      console.log("KEYS:", Object.keys(moves[i]))
      // Check if there is a object title called ravs
      if (Object.keys(moves[i]).includes("ravs")) {
        // If there is, recursively call pgnSort on the ravs object
        // Also call pgnSort on the moves object from this point onwards
        let mainLine = pgnSort(moves.slice(i + 1, moves.length))
        let variation = pgnSort(moves[i].ravs[0].moves);
        let newArray = [mainLine, variation];
        sortedMoves.push(newArray);
      } else {
        // If there is no object title called ravs, push the move into the sortedMoves array
        sortedMoves.push([moves[i].move]);
      }
    }
    return sortedMoves
  };

  const onPress = () => {
    console.log("HELP MEEEE")
    console.log("Final", pgnSort(gameMoves));
  };

  return (
    <Container>
      <ScrollView>
        <Button title="Help" onPress={onPress}/>
        <Text>{JSON.stringify(gameMoves)}</Text>
      </ScrollView>
    </Container>
  );
};

export default CustomTestingScreen;
