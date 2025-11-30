import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import type { State } from "../types/State";
import { USA_STATES_DATA } from "../constants/usa-map-data";
import { matchesState } from "../utils/matchesState";
import useGuessedStatesTooltip from "../hooks/useGuessedStatesTooltip";
import Tooltip from "../components/Tooltip";

type GuessGameContextType = {
  input: string;
  checkInput: (input: string) => void;
  guessedStates: State[];
  newListItemIsHighlighted: boolean;
  svgRef: React.RefObject<SVGElement | null>;
  highlightGuessedState: (state: State) => void;
  downplayGuessedState: (state: State) => void;
  alreadyGuessed: boolean;
}

const GuessGameContext = createContext<GuessGameContextType | undefined>(undefined);

export default function GuessGameProvider({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState("");
  const [guessedStates, setGuessedStates] = useState<State[]>([]);
  const [newListItemIsHighlighted, setNewListItemIsHighlighted] = useState(false);
  const svgRef = useRef<SVGElement>(null);
  const { tooltipObj, registerGuessedState } = useGuessedStatesTooltip();
  const [alreadyGuessed, setAlreadyGuessed] = useState(false);

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
    setAlreadyGuessed(false);

    setGuessedStates((prev) => [...prev, matchedState]);
    highlightNewGuessedItem(matchedState, guessedStates.length + 1);
    setInput("");
  };

  const highlightGuessedState = (state: State) => {
    if (!svgRef.current) return;

    const path = svgRef.current.querySelector(`#${state.id}`) as HTMLElement;
    
    if (guessedStates.length === USA_STATES_DATA.length) {
      const paths = svgRef.current.querySelectorAll<HTMLElement>(".state");
      paths.forEach((path) => path.classList.remove("highlightAccent"));
    }

    path.classList.add("highlightAccent");
  }

  const downplayGuessedState = (state: State) => {
    if (!svgRef.current) return;

    const path = svgRef.current.querySelector(`#${state.id}`) as HTMLElement;

    if (guessedStates.length === USA_STATES_DATA.length) {
      const paths = svgRef.current.querySelectorAll<HTMLElement>(".state");
      paths.forEach((path) => path.classList.add("highlightAccent"));
    } else {
      path.classList.remove("highlightAccent");
    }
  }

  const highlightNewGuessedItem = (state: State, position: number) => {
    setNewListItemIsHighlighted(true);
    setTimeout(() => setNewListItemIsHighlighted(false), 2000);

    if (!svgRef.current) return;

    const path = svgRef.current.querySelector(`#${state.id}`) as HTMLElement;
    path.classList.add("highlight", "highlightAccent");

    if(guessedStates.length + 1 !== USA_STATES_DATA.length) {
      setTimeout(() => path.classList.remove("highlightAccent"), 2000);
    }

    const text = `${position}. ${state.name}`;
    registerGuessedState(text, path);
  }

  useEffect(() => {
    if (!svgRef.current || guessedStates.length !== USA_STATES_DATA.length) return;

    const paths = svgRef.current.querySelectorAll<HTMLElement>(".state");
    paths.forEach((path) => {
      path.classList.add("highlightAccent");
      path.addEventListener("mouseenter", () => {
        paths.forEach((path) => path.classList.remove("highlightAccent"));
        path.classList.add("highlightAccent");
      });
      path.addEventListener("mouseleave", () => {
        paths.forEach((path) => path.classList.add("highlightAccent"));
      });
    });
  }, [guessedStates]);
  
  return (
    <GuessGameContext value={{
      input,
      checkInput,
      guessedStates,
      newListItemIsHighlighted,
      svgRef,
      highlightGuessedState,
      downplayGuessedState,
      alreadyGuessed
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
