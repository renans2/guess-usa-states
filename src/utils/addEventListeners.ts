import { ALL_GUESSED, HIGHLIGHT_ACCENT } from "../constants/css-classes";

export function addEventListenerGuessedAllStates(mapSvg: SVGElement) {
  const paths = mapSvg.querySelectorAll<HTMLElement>(".state");
  
  function removeHightlightAccentAll() {
    paths.forEach((path) => path.classList.remove(HIGHLIGHT_ACCENT));
  }

  function addHightlightAccentAll() {
    paths.forEach((path) => path.classList.add(HIGHLIGHT_ACCENT));
  }

  paths.forEach((path) => {
    path.classList.add(HIGHLIGHT_ACCENT, ALL_GUESSED);
    path.addEventListener("mouseenter", removeHightlightAccentAll);
    path.addEventListener("mouseleave", addHightlightAccentAll);
  });
}
