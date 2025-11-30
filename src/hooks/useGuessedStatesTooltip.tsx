import { useState } from "react";
import type { Tooltip } from "../types/Tooltip";

export default function useGuessedStatesTooltip() {
  const [tooltipObj, setTooltipObj] = useState<Tooltip>({ visible: false, x: 0, y: 0, text: "" });
  
  const handleMouseEnter = (e: MouseEvent, text: string) => {
    setTooltipObj({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      text
    });
  }

  const handleMouseMove = (e: MouseEvent) => {
    setTooltipObj((prev) => ({
      ...prev,
      x: e.pageX,
      y: e.pageY
    }));
  }

  const handleMouseLeave = () => {
    setTooltipObj((prev) => ({ ...prev, visible: false }));
  }

  const registerGuessedState = (text: string, path: HTMLElement) => {
    path.addEventListener("mouseenter", (e) => handleMouseEnter(e, text));
    path.addEventListener("mousemove", (e) => handleMouseMove(e));
    path.addEventListener("mouseleave", handleMouseLeave);
  }

  return ({
    tooltipObj,
    registerGuessedState,
  });
}