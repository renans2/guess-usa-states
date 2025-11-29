import React, { createContext, useContext, useRef, useState } from "react";
import type { State } from "../types/State";
import { USA_STATES_DATA } from "../constants/usa-map-data";
import { matchesState } from "../utils/matchesState";
import { useTheme } from "styled-components";

type GuessGameContextType = {
  input: string;
  checkInput: (input: string) => void;
  remainingStates: number;
  guessedStates: State[];
  svgRef: React.RefObject<SVGElement | null>;
  switchGuessedStateHighlight: (state: State, highlight: boolean) => void;
}

const GuessGameContext = createContext<GuessGameContextType | undefined>(undefined);

export default function GuessGameProvider({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState("");
  const [remainingStates, setRemainingStates] = useState(USA_STATES_DATA.length);
  const [guessedStates, setGuessedStates] = useState<State[]>([]);
  const svgRef = useRef<SVGElement>(null);
  const theme = useTheme();

  const checkInput = (newInput: string) => {
    setInput(newInput);
    const matchedState = USA_STATES_DATA.find((state) => matchesState(state, newInput));

    if (!matchedState) return;

    const isAlreadyGuessed = guessedStates.find((state) => matchesState(state, newInput));

    if (isAlreadyGuessed) return;

    setGuessedStates((prev) => [...prev, matchedState]);
    setRemainingStates((prev) => prev - 1);
    setInput("");

    if (!svgRef.current) return;

    const path = svgRef.current.querySelector(`#${matchedState.id}`) as HTMLElement;
    path.style.fill = theme.colors.green;
  };

  const switchGuessedStateHighlight = (state: State, highlight: boolean) => {
    if (!svgRef.current) return;

    const path = svgRef.current.querySelector(`#${state.id}`) as HTMLElement;
    path.style.fill = theme.colors[highlight ? "greenAccent" : "green"];
  }
  
  return (
    <GuessGameContext value={{
      input,
      checkInput,
      guessedStates,
      remainingStates,
      svgRef,
      switchGuessedStateHighlight,
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
