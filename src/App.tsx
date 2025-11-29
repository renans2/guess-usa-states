import { ThemeProvider } from "styled-components"
import { GlobalStyles } from "./styles/global"
import { theme } from "./styles/theme"
import Header from "./components/Header"
import Map from "./components/Map"

function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Map />
    </ThemeProvider>
  )
}

export default App
