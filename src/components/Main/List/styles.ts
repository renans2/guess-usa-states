import styled from "styled-components";
import { S_Surface } from "../../../ui/surface";
import { motion } from "motion/react";

export const S_ListContainer = styled(S_Surface)`
  width: 100%;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 100px;
  flex: 1;

  & > button {
    border-radius: ${({ theme }) => theme.borderRadius};
    border: none;
    color: white;
    padding: 8px;
    font-size: 1.2rem;
    font-weight: 400;
    background-color: black;
    transition: transform 100ms ease-in-out;

    &:hover {
      transform: scale(1.02);
    }
  }
`;

export const S_ListHeader = styled.div<{
  $activeStopwatch: boolean;
}>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > h2 {
    color: ${({ theme, $activeStopwatch }) => $activeStopwatch 
      ? "inherit" 
      : theme.colors.fontPlaceholder}
  }
`;

export const S_List = styled.ul`
  list-style-position: inside;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

export const S_ListItem = styled(motion.li)<{
  $isHighlighted: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  padding: 4px 8px;
  transition: background-color 500ms, padding-inline 200ms;
  background-color: ${({ $isHighlighted, theme }) => 
    $isHighlighted ? theme.colors.green : "inherit"};

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #DBDBDB;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    padding-inline: 20px;
  }

  img {
    height: 32px;
    border-radius: 5px;
    border: 2px solid rgba(0, 0, 0, 0.1);
  }
`;

export const S_NoStatesGuessed = styled.span`
  text-align: center;
  color: ${({ theme }) => theme.colors.fontPlaceholder};
  font-style: italic;
`;
