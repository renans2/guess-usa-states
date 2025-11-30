import styled from "styled-components";
import { S_Surface } from "../../../ui/surface";

export const S_WinnerMessageContainer = styled(S_Surface)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: ${({ theme }) => `5px solid ${theme.colors.greenAccent}`};

  h2 {
    font-size: 1.5em;
  }
`;