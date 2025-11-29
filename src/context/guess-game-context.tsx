import { createContext, useContext, useState } from "react";
import type { State } from "../types/State";
import { USA_STATES_DATA } from "../constants/usa-map-data";
import { matchesState } from "../utils/matchesState";

type GuessGameContextType = {
  input: string;
  checkInput: (input: string) => void;
  remainingStates: number;
  guessedStates: State[];
}

const GuessGameContext = createContext<GuessGameContextType | undefined>(undefined);

export default function GuessGameProvider({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState("");
  const [remainingStates, setRemainingStates] = useState(USA_STATES_DATA.length);
  const [guessedStates, setGuessedStates] = useState<State[]>([]);

  const checkInput = (newInput: string) => {
    setInput(newInput);
    
    const matchedState = USA_STATES_DATA.find((state) => matchesState(state, input));

    if (!matchedState) return;

    const isAlreadyGuessed = guessedStates.find((state) => matchesState(state, input));

    if (isAlreadyGuessed) return;

    setGuessedStates((prev) => [...prev, matchedState]);
    setRemainingStates((prev) => prev - 1);
  };
  
  return (
    <GuessGameContext value={{
      input,
      checkInput,
      guessedStates,
      remainingStates  
    }}>
      {children}
    </GuessGameContext>
  );
}

export const useGuessGame = () => {
  const context = useContext(GuessGameContext);

  if (!context)
    throw new Error("The useGuessGame hook must be used within GuessGameProvider");

  return context;
}
