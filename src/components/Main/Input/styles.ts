import styled from "styled-components";
import { S_Surface } from "../../../ui/surface";

export const S_Input = styled(S_Surface).attrs({ as: "input"})`
  width: 100%;
  padding: 10px 14px;
  font-size: 1.5rem;

  &:focus {
    outline: 3px solid gray;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.fontPlaceholder};
  }
`;