import styled from "styled-components";
import { S_Surface } from "../../../ui/surface";

export const S_ListContainer = styled(S_Surface)`
  width: 100%;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
  flex: 1;
`;

export const S_ListHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const S_List = styled.ol`
  list-style-position: inside;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

export const S_ListItem = styled.li`
  font-size: 1.4rem;
  padding: 4px;

  &:not(:last-child) {
    border-bottom: 1px solid #DBDBDB;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;
