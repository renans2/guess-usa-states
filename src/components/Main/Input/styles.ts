import styled, { css } from "styled-components";
import { S_Surface } from "../../../ui/surface";

export const S_Input = styled(S_Surface).attrs({ as: "input" })<{
  $alreadyGuessed: boolean;
}>`
  padding: 8px 14px;
  font-size: 1.3rem;
  border: none;
  box-shadow: none;

  &:focus {
    outline: ${({ theme, $alreadyGuessed }) => 
      `3px solid ${$alreadyGuessed ? theme.colors.redPrimary : "gray"}`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.fontPlaceholder};
  }
`;

export const S_InputContainer = styled(S_Surface)<{
  $alreadyGuessed: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  ${({ $alreadyGuessed }) => $alreadyGuessed ? css`
    padding-right: 10px;

    & > * {
      width: 50%;
    }
  ` : css`
    input {
      width: 100%;
    }
  `};
`;

export const S_AlreadyGuessed = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.redPrimary};
  padding: 5px;
  border-radius: 10px;
`;
