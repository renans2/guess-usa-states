import { ThemeProvider } from "styled-components"
import { GlobalStyles } from "./styles/global"
import { theme } from "./styles/theme"
import Header from "./components/Header"
import GuessGameProvider from "./context/guess-game-context"
import Main from "./components/Main"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <GuessGameProvider>
        <Header />
        <Main />
      </GuessGameProvider>
    </ThemeProvider>
  )
}

export default App
