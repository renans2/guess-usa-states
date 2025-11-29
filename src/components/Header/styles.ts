import styled from "styled-components";

export const S_HeaderContainer = styled.header`
  width: 100%;
  max-width: 900px;
  height: 100%;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  h1, a {
    color: ${({ theme }) => theme.colors.font};
  }

  h1 {
    font-size: 2rem;
  }

  a {
    font-size: 1.5rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;