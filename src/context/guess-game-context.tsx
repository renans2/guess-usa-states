import React, { createContext, useContext, useEffect, useRef, useState } from "react";
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
  highlightGuessedState: (state: State) => void;
  downplayGuessedState: (state: State) => void;
}

const GuessGameContext = createContext<GuessGameContextType | undefined>(undefined);

export default function GuessGameProvider({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState("");
  const [guessedStates, setGuessedStates] = useState<State[]>([
    // { id: "AK", name: "Alaska" },
    // { id: "AZ", name: "Arizona" },
    // { id: "AR", name: "Arkansas" },
    // { id: "CA", name: "California" },
    // { id: "CO", name: "Colorado" },
    // { id: "CT", name: "Connecticut" },
    // { id: "DE", name: "Delaware" },
    // { id: "FL", name: "Florida" },
    // { id: "GA", name: "Georgia" },
    // { id: "HI", name: "Hawaii" },
    // { id: "ID", name: "Idaho" },
    // { id: "IL", name: "Illinois" },
    // { id: "IN", name: "Indiana" },
    // { id: "IA", name: "Iowa" },
    // { id: "KS", name: "Kansas" },
    // { id: "KY", name: "Kentucky" },
    // { id: "LA", name: "Louisiana" },
    // { id: "ME", name: "Maine" },
    // { id: "MD", name: "Maryland" },
    // { id: "MA", name: "Massachusetts" },
    // { id: "MI", name: "Michigan" },
    // { id: "MN", name: "Minnesota" },
    // { id: "MS", name: "Mississippi" },
    // { id: "MO", name: "Missouri" },
    // { id: "MT", name: "Montana" },
    // { id: "NE", name: "Nebraska" },
    // { id: "NV", name: "Nevada" },
    // { id: "NH", name: "New Hampshire" },
    // { id: "NJ", name: "New Jersey" },
    // { id: "NM", name: "New Mexico" },
    // { id: "NY", name: "New York" },
    // { id: "NC", name: "North Carolina" },
    // { id: "ND", name: "North Dakota" },
    // { id: "OH", name: "Ohio" },
    // { id: "OK", name: "Oklahoma" },
    // { id: "OR", name: "Oregon" },
    // { id: "PA", name: "Pennsylvania" },
    // { id: "RI", name: "Rhode Island" },
    // { id: "SC", name: "South Carolina" },
    // { id: "SD", name: "South Dakota" },
    // { id: "TN", name: "Tennessee" },
    // { id: "TX", name: "Texas" },
    // { id: "UT", name: "Utah" },
    // { id: "VT", name: "Vermont" },
    // { id: "VA", name: "Virginia" },
    // { id: "WA", name: "Washington" },
    // { id: "WV", name: "West Virginia" },
    // { id: "WI", name: "Wisconsin" },
    // { id: "WY", name: "Wyoming" }
  ]);
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

  const highlightGuessedState = (state: State) => {
    if (!svgRef.current) return;

    const path = svgRef.current.querySelector(`#${state.id}`) as HTMLElement;
    
    if (guessedStates.length === USA_STATES_DATA.length) {
      const paths = svgRef.current.querySelectorAll<HTMLElement>(".state");
      paths.forEach((path) => path.style.fill = theme.colors.green);
      path.style.fill = theme.colors.greenAccent;
    } else {
      path.style.fill = theme.colors.greenAccent;
    }
  }

  const downplayGuessedState = (state: State) => {
    if (!svgRef.current) return;

    const path = svgRef.current.querySelector(`#${state.id}`) as HTMLElement;

    if (guessedStates.length === USA_STATES_DATA.length) {
      const paths = svgRef.current.querySelectorAll<HTMLElement>(".state");
      paths.forEach((path) => path.style.fill = theme.colors.greenAccent);
    } else {
      path.style.fill = theme.colors.green;
    }
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

  useEffect(() => {
    if (!svgRef.current || guessedStates.length !== USA_STATES_DATA.length) return;

    const paths = svgRef.current.querySelectorAll<HTMLElement>(".state");
    paths.forEach((path) => path.style.fill = theme.colors.greenAccent);
  }, [guessedStates]);
  
  return (
    <GuessGameContext value={{
      input,
      checkInput,
      guessedStates,
      newListItemIsHighlighted,
      svgRef,
      highlightGuessedState,
      downplayGuessedState
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
