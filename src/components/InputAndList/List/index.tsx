import { useGuessGame } from "../../../context/guess-game-context";
import { S_List, S_ListContainer, S_ListHeader, S_ListItem } from "./styles";

export default function List() {
  const { guessedStates, remainingStates } = useGuessGame();

  return (
    <S_ListContainer>
      <S_ListHeader>
        <h2>Guessed states</h2>
        <span>{remainingStates} states remaining</span>
      </S_ListHeader>
      <S_List reversed>
        {[...guessedStates].reverse().map((state) => (
          <S_ListItem key={state.id}>
            {state.name}
          </S_ListItem>
        ))}
      </S_List>
    </S_ListContainer>
  );
}
