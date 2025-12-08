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
    font-family: "Rye", serif;
    font-weight: 400;
  }

  h1 {
    font-size: 2rem;
    display: flex;
    align-items: center;
    gap: 5px
  }

  a {
    font-size: 1.3rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    height: 40px;
  }
`;