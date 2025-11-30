import { S_AlreadyGuessed, S_Input, S_InputContainer } from "./styles";
import { useGuessGame } from "../../../context/guess-game-context";

export default function Input() {
  const { input, checkInput, alreadyGuessed } = useGuessGame();

  return (
    <S_InputContainer $alreadyGuessed={alreadyGuessed}>
      <S_Input 
        value={input} 
        onChange={(e) => checkInput(e.target.value)}
        placeholder="guess here..."
        $alreadyGuessed={alreadyGuessed}
      />
      {alreadyGuessed && (
        <S_AlreadyGuessed>Already guessed!</S_AlreadyGuessed>
      )}
    </S_InputContainer>
  );
}
