import { S_HeaderContainer } from "./styles";

export default function Header() {
  return (
    <S_HeaderContainer>
      <h1>
        Guess 
        <img src="./usa-flag-emoji.png" alt="usa flag" /> 
        States
      </h1>
      <a 
        href="https://github.com/renans2/guess-usa-states" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </S_HeaderContainer>
  );
}
