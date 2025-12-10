import { useEffect, useRef } from "react";
import { useGuessGame } from "../../../context/guess-game-context";
import { S_List, S_ListContainer, S_ListHeader, S_ListItem, S_NoStatesGuessed } from "./styles";
import { USA_STATES_DATA } from "../../../constants/usa-map-data";

export default function List() {
  const listRef = useRef<HTMLUListElement>(null);
  const { 
    stopwatch: { seconds, minutes },
    guessedStates, 
    newGuessIsHighlighted,
    hoverGuessedStateListItem,
    unhoverGuessedStateListItem,
  } = useGuessGame();

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [guessedStates]);

  const remainingStates = USA_STATES_DATA.length - guessedStates.length;
  const activeStopwatch = 0 < guessedStates.length && guessedStates.length < USA_STATES_DATA.length;

  return (
    <S_ListContainer>
      {remainingStates === 0 && (
        <button onClick={() => window.location.reload()}>Play again!</button>
      )}
      <S_ListHeader $activeStopwatch={activeStopwatch}>
        <h2>
          Time{" "}
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </h2>
        {remainingStates > 0 && (
          <span>{remainingStates} states remaining</span>
        )}
      </S_ListHeader>
      {guessedStates.length > 0 ? (
        <S_List ref={listRef}>
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
