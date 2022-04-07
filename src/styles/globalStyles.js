
   
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
*:focus {
  outline: none;
}
html {
  box-sizing: border-box;
  font-size: 62.5%; 
} 
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #fff;
    font-size: 1.4rem;
    font-weight: 400;
    color: #1c1d1f;
    }
  a {
  text-decoration: none;
  color: inherit;
}
`;