import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    shadow: string,
    border: string,
    borderRadius: string,
    colors: {
      background: string,
      surface: string,
      surfaceHover: string,
      font: string,
      fontPlaceholder: string,
      green: string,
      greenAccent: string,
      redPrimary: string,
      redSecondary: string,
    }
  }
}