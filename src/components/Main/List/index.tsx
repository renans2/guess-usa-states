import { USA_STATES_DATA } from "../../../constants/usa-map-data";
import { useGuessGame } from "../../../context/guess-game-context";
import { S_List, S_ListContainer, S_ListHeader, S_ListItem } from "./styles";

export default function List() {
  const { 
    guessedStates, 
    newListItemIsHighlighted,
    highlightGuessedState,
    downplayGuessedState,
  } = useGuessGame();

  const remainingStates = USA_STATES_DATA.length - guessedStates.length

  return (
    <S_ListContainer>
      <S_ListHeader>
        <h2>Guessed states</h2>
        <span>{remainingStates} states remaining</span>
      </S_ListHeader>
      <S_List reversed>
        {[...guessedStates].reverse().map((state, i) => (
          <S_ListItem 
            key={state.id}
            $isHighlighted={i === 0 && newListItemIsHighlighted}
            onMouseEnter={() => highlightGuessedState(state)}
            onMouseLeave={() => downplayGuessedState(state)}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeInOut", duration: 0.3}}
            layout
          >
            {state.name}
          </S_ListItem>
        ))}
      </S_List>
    </S_ListContainer>
  );
}
