import React, { createContext, useContext, useRef, useState } from "react";
import type { State } from "../types/State";
import { USA_STATES_DATA } from "../constants/usa-map-data";
import { matchesState } from "../utils/matchesState";
import { useTheme } from "styled-components";
import useGuessedStatesTooltip from "../hooks/useGuessedStatesTooltip";
import Tooltip from "../components/Tooltip";

type GuessGameContextType = {
  input: string;
  checkInput: (input: string) => void;
  guessedStates: State[];
  newListItemIsHighlighted: boolean;
  svgRef: React.RefObject<SVGElement | null>;
  switchGuessedStateHighlight: (state: State, highlight: boolean) => void;
}

const GuessGameContext = createContext<GuessGameContextType | undefined>(undefined);

export default function GuessGameProvider({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState("");
  const [guessedStates, setGuessedStates] = useState<State[]>([]);
  const [newListItemIsHighlighted, setNewListItemIsHighlighted] = useState(false);
  const svgRef = useRef<SVGElement>(null);
  const theme = useTheme();
  const { tooltipObj, registerGuessedState } = useGuessedStatesTooltip();

  const checkInput = (newInput: string) => {
    setInput(newInput);
    const matchedState = USA_STATES_DATA.find((state) => matchesState(state, newInput));

    if (!matchedState) return;

    const isAlreadyGuessed = guessedStates.find((state) => matchesState(state, newInput));

    if (isAlreadyGuessed) return;

    setGuessedStates((prev) => [...prev, matchedState]);
    highlightNewGuessedItem(matchedState, guessedStates.length + 1);
    setInput("");
  };

  const switchGuessedStateHighlight = (state: State, highlight: boolean) => {
    if (!svgRef.current) return;

    const path = svgRef.current.querySelector(`#${state.id}`) as HTMLElement;
    path.style.fill = theme.colors[highlight ? "greenAccent" : "green"];
  }

  const highlightNewGuessedItem = (state: State, position: number) => {
    setNewListItemIsHighlighted(true);
    setTimeout(() => setNewListItemIsHighlighted(false), 2000);

    if (!svgRef.current) return;

    const path = svgRef.current.querySelector(`#${state.id}`) as HTMLElement;
    const text = `${position}. ${state.name}`;
    registerGuessedState(text, path);
    path.style.fill = theme.colors.greenAccent;
    setTimeout(() => path.style.fill = theme.colors.green, 2000);
    
  }
  
  return (
    <GuessGameContext value={{
      input,
      checkInput,
      guessedStates,
      newListItemIsHighlighted,
      svgRef,
      switchGuessedStateHighlight,
    }}>
      {children}
      <Tooltip tooltipObj={tooltipObj} />
    </GuessGameContext>
  );
}

export const useGuessGame = () => {
  const context = useContext(GuessGameContext);

  if (!context)
    throw new Error("The useGuessGame hook must be used within GuessGameProvider");

  return context;
}
