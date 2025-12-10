import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import type { State } from "../types/State";
import { USA_STATES_DATA } from "../constants/usa-map-data";
import { matchesState } from "../utils/matchesState";
import useGuessedStatesTooltip from "../hooks/useGuessedStatesTooltip";
import { addEventListenerGuessedAllStates } from "../utils/addEventListeners";
import type { Tooltip } from "../types/Tooltip";
import { HIGHLIGHT, HIGHLIGHT_ACCENT } from "../constants/css-classes";
import useStopwatch from "../hooks/useStopwatch";
import type { Stopwatch } from "../types/Stopwatch";

const NEW_GUESS_HIGHLIGHT_TIME = 2000;

type GuessGameContextType = {
  input: string;
  checkInput: (input: string) => void;
  guessedStates: State[];
  newGuessIsHighlighted: boolean;
  svgRef: React.RefObject<SVGSVGElement | null>;
  hoverGuessedStateListItem: (state: State) => void;
  unhoverGuessedStateListItem: (state: State) => void;
  alreadyGuessed: boolean;
  tooltipObj: Tooltip;
  stopwatch: Stopwatch;
}

const GuessGameContext = createContext<GuessGameContextType | undefined>(undefined);

export default function GuessGameProvider({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState("");
  const [guessedStates, setGuessedStates] = useState<State[]>([]);
  const [newGuessIsHighlighted, setNewGuessIsHighlighted] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const { tooltipObj, registerStateTooltip } = useGuessedStatesTooltip();
  const [alreadyGuessed, setAlreadyGuessed] = useState(false);
  const { stopwatch, startStopwatch, stopStopwatch } = useStopwatch();
  const highlightRef = useRef<any>(null);
  const pathHighlightRef = useRef<any>(null);

  function guessedAllStates() {
    return guessedStates.length === USA_STATES_DATA.length;
  }

  const checkInput = (newInput: string) => {
    setInput(newInput);
    const matchedState = USA_STATES_DATA.find((state) => matchesState(state, newInput));

    if (!matchedState) {
      setAlreadyGuessed(false);  
      return;
    };

    const isAlreadyGuessed = guessedStates.find((state) => matchesState(state, newInput));

    if (isAlreadyGuessed) {
      setAlreadyGuessed(true);
      return;
    };

    if (guessedStates.length === 0) startStopwatch();

    const statePath = svgRef.current!.querySelector(`#${matchedState.id}`) as HTMLElement;
    setInput("");
    setAlreadyGuessed(false);
    setGuessedStates((prev) => [...prev, matchedState]);
    highlightNewGuess(statePath);

    const position = guessedStates.length + 1;
    const text = `${position}. ${matchedState.name}`;
    registerStateTooltip(text, statePath);
  };

  const highlightNewGuess = (statePath: HTMLElement) => {
    setNewGuessIsHighlighted(true);
    statePath.classList.add(HIGHLIGHT, HIGHLIGHT_ACCENT);

    if (highlightRef.current)
      clearTimeout(highlightRef.current);
    
    highlightRef.current = setTimeout(() => {
      setNewGuessIsHighlighted(false);
      highlightRef.current = null;
    }, NEW_GUESS_HIGHLIGHT_TIME);

    if (guessedStates.length + 1 !== USA_STATES_DATA.length) {
      pathHighlightRef.current = setTimeout(() => {
        statePath.classList.remove(HIGHLIGHT_ACCENT);
        pathHighlightRef.current = null;
      }, NEW_GUESS_HIGHLIGHT_TIME);
    }
  }

  const hoverGuessedStateListItem = (state: State) => {
    const statePath = svgRef.current!.querySelector(`#${state.id}`) as HTMLElement;
    
    if (guessedAllStates()) {
      const paths = svgRef.current!.querySelectorAll<HTMLElement>(".state");
      paths.forEach((path) => path.classList.remove(HIGHLIGHT_ACCENT));
    }

    statePath.classList.add(HIGHLIGHT_ACCENT);
  }

  const unhoverGuessedStateListItem = (state: State) => {
    const statePath = svgRef.current!.querySelector(`#${state.id}`) as HTMLElement;

    if (guessedAllStates()) {
      const paths = svgRef.current!.querySelectorAll<HTMLElement>(".state");
      paths.forEach((path) => path.classList.add(HIGHLIGHT_ACCENT));
    } else {
      statePath.classList.remove(HIGHLIGHT_ACCENT);
    }
  }

  useEffect(() => {
    if (guessedAllStates()) {
      if (pathHighlightRef.current) clearTimeout(pathHighlightRef.current);
      addEventListenerGuessedAllStates(svgRef.current!);
      stopStopwatch();
    }
  }, [guessedStates]);
  
  return (
    <GuessGameContext value={{
      input,
      checkInput,
      guessedStates,
      newGuessIsHighlighted,
      svgRef,
      hoverGuessedStateListItem,
      unhoverGuessedStateListItem,
      alreadyGuessed,
      tooltipObj,
      stopwatch,
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
