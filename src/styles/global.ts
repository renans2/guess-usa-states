import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    font-family: "Roboto", sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #root {
    width: 100vw;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
    display: grid;
    grid-template-rows: 70px 1fr;
    overflow-x: hidden;
    overflow-y: auto;
  }

  button:not(:disabled) {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  path {
    transition: fill 200ms;

    &.highlight {
      fill: ${({ theme }) => theme.colors.green} !important;

      &:hover {
        fill: ${({ theme }) => theme.colors.greenAccent} !important;
      }
    }

    &.highlightAccent {
      fill: ${({ theme }) => theme.colors.greenAccent} !important;
    } 
  } 
`;