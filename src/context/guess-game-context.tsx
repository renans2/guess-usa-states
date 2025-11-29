import React, { createContext, useContext, useRef, useState } from "react";
import type { State } from "../types/State";
import { USA_STATES_DATA } from "../constants/usa-map-data";
import { matchesState } from "../utils/matchesState";
import styled, { useTheme } from "styled-components";

type GuessGameContextType = {
  input: string;
  checkInput: (input: string) => void;
  remainingStates: number;
  guessedStates: State[];
  newListItemIsHighlighted: boolean;
  svgRef: React.RefObject<SVGElement | null>;
  switchGuessedStateHighlight: (state: State, highlight: boolean) => void;
}

const S_Tooltip = styled.div`
  position: fixed;
  pointer-events: none;
  background: #333;
  color: #fff;
  padding: 6px 10px;
  border-radius: 4px;
  white-space: nowrap;
  transform: translate(-50%, -30px);
  font-size: 12px;
  z-index: 999;
  transition: opacity 0.15s ease;
`;

const GuessGameContext = createContext<GuessGameContextType | undefined>(undefined);

export default function GuessGameProvider({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState("");
  const [remainingStates, setRemainingStates] = useState(USA_STATES_DATA.length);
  const [guessedStates, setGuessedStates] = useState<State[]>([]);
  const [newListItemIsHighlighted, setNewListItemIsHighlighted] = useState(false);
  const svgRef = useRef<SVGElement>(null);
  const theme = useTheme();
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: "" });

  const checkInput = (newInput: string) => {
    setInput(newInput);
    const matchedState = USA_STATES_DATA.find((state) => matchesState(state, newInput));

    if (!matchedState) return;

    const isAlreadyGuessed = guessedStates.find((state) => matchesState(state, newInput));

    if (isAlreadyGuessed) return;

    setGuessedStates((prev) => [...prev, matchedState]);
    setRemainingStates((prev) => prev - 1);
    highlightNewGuessedItem(matchedState);
    setInput("");
  };

  const switchGuessedStateHighlight = (state: State, highlight: boolean) => {
    if (!svgRef.current) return;

    const path = svgRef.current.querySelector(`#${state.id}`) as HTMLElement;
    path.style.fill = theme.colors[highlight ? "greenAccent" : "green"];
  }

  const highlightNewGuessedItem = (state: State) => {
    setNewListItemIsHighlighted(true);
    setTimeout(() => setNewListItemIsHighlighted(false), 2000);

    if (!svgRef.current) return;

    const path = svgRef.current.querySelector(`#${state.id}`) as HTMLElement;
    path.style.fill = theme.colors.greenAccent;
    setTimeout(() => path.style.fill = theme.colors.green, 2000);
    path.addEventListener("mouseenter", (e: any) => {
      path.style.fill = theme.colors.greenAccent;
      setTooltip({
        visible: true,
        x: e.pageX,
        y: e.pageY,
        text: state.name
      });
    });
    path.addEventListener("mousemove", (e: any) => {
      setTooltip((prev) => ({
        ...prev,
        x: e.pageX,
        y: e.pageY
      }));
    });
    path.addEventListener("mouseleave", () => {
      path.style.fill = theme.colors.green;
      setTooltip((prev) => ({ ...prev, visible: false }));
    });
  }
  
  return (
    <GuessGameContext value={{
      input,
      checkInput,
      guessedStates,
      remainingStates,
      newListItemIsHighlighted,
      svgRef,
      switchGuessedStateHighlight,
    }}>
      {children}
      {tooltip.visible && (
        <S_Tooltip style={{ top: tooltip.y, left: tooltip.x }}>
          {tooltip.text}
        </S_Tooltip>
      )}
    </GuessGameContext>
  );
}

export const useGuessGame = () => {
  const context = useContext(GuessGameContext);

  if (!context)
    throw new Error("The useGuessGame hook must be used within GuessGameProvider");

  return context;
}
