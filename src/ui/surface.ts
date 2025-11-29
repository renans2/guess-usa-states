import styled from "styled-components";

export const S_Surface = styled.div`
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.font};
  box-shadow: ${({ theme }) => theme.shadow};
`;