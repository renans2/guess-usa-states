import { useState } from "react";
import { useTheme } from "styled-components";
import type { Tooltip } from "../types/Tooltip";

export default function useGuessedStatesTooltip() {
  const [tooltipObj, setTooltipObj] = useState<Tooltip>({ visible: false, x: 0, y: 0, text: "" });
  const theme = useTheme();
  
  const handleMouseEnter = (e: MouseEvent, text: string, path: HTMLElement) => {
    path.style.fill = theme.colors.greenAccent;
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

  const handleMouseLeave = (path: HTMLElement) => {
    path.style.fill = theme.colors.green;
    setTooltipObj((prev) => ({ ...prev, visible: false }));
  }

  const registerGuessedState = (text: string, path: HTMLElement) => {
    path.addEventListener("mouseenter", (e) => handleMouseEnter(e, text, path));
    path.addEventListener("mousemove", (e) => handleMouseMove(e));
    path.addEventListener("mouseleave", () => handleMouseLeave(path));
  }

  return ({
    tooltipObj,
    registerGuessedState,
  });
}