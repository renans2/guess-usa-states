export function addEventListenerGuessedAllStates(mapSvg: SVGElement) {
  const paths = mapSvg.querySelectorAll<HTMLElement>(".state");
  
  function removeHightlightAccentAll() {
    paths.forEach((path) => path.classList.remove("highlightAccent"));
  }

  function addHightlightAccentAll() {
    paths.forEach((path) => path.classList.add("highlightAccent"));
  }

  paths.forEach((path) => {
    path.classList.add("highlightAccent");
    path.addEventListener("mouseenter", removeHightlightAccentAll);
    path.addEventListener("mouseleave", addHightlightAccentAll);
  });
}
