import { USA_STATES_DATA } from "../../constants/usa-map-data";
import { useGuessGame } from "../../context/guess-game-context";
import Input from "./Input";
import List from "./List";
import Map from "./Map";
import { S_Main } from "./styles";
import WinnerMessage from "./WinnerMessage";

export default function Main() {
  const { guessedStates } = useGuessGame();

  const guessedAllStates = guessedStates.length === USA_STATES_DATA.length;

  return (
    <S_Main>
      <Map />
      {guessedAllStates ? (
        <WinnerMessage />
      ) : (
        <Input />
      )}
      <List />
    </S_Main>
  );
}
