import { USA_STATES_DATA } from "../../../constants/usa-map-data";
import { useGuessGame } from "../../../context/guess-game-context";
import { S_List, S_ListContainer, S_ListHeader, S_ListItem, S_NoStatesGuessed } from "./styles";

export default function List() {
  const { 
    guessedStates, 
    newGuessIsHighlighted,
    hoverGuessedStateListItem,
    unhoverGuessedStateListItem,
  } = useGuessGame();

  const remainingStates = USA_STATES_DATA.length - guessedStates.length;

  return (
    <S_ListContainer>
      <S_ListHeader>
        <h2>Guessed states</h2>
        <span>{remainingStates} states remaining</span>
      </S_ListHeader>
      {guessedStates.length > 0 ? (
        <S_List>
          {[...guessedStates].map((state, i) => (
            <S_ListItem 
              key={state.id}
              $isHighlighted={i === guessedStates.length - 1 && newGuessIsHighlighted}
              onMouseEnter={() => hoverGuessedStateListItem(state)}
              onMouseLeave={() => unhoverGuessedStateListItem(state)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ease: "easeInOut", duration: 0.2}}
              layout
            >
              <span>{i + 1}. {state.name}</span>
              <img src={state.flag} alt={`${state.name} flag`} />
            </S_ListItem>
          )).reverse()}
        </S_List>
      ) : (
        <S_NoStatesGuessed>
          You haven't guessed any states yet.
        </S_NoStatesGuessed>
      )}
    </S_ListContainer>
  );
}
