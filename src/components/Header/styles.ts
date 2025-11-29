import styled from "styled-components";

export const S_HeaderContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 15px;
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