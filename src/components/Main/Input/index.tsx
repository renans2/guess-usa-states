import { S_Input } from "./styles";
import { useGuessGame } from "../../../context/guess-game-context";

export default function Input() {
  const { input, checkInput } = useGuessGame();

  return (
    <S_Input 
      value={input} 
      onChange={(e) => checkInput(e.target.value)}
      placeholder="guess here..."
    />
  );
}
