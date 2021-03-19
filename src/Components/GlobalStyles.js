import styled, { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  h1{
    color: ${({ theme }) => theme.text}
  }
  `
  
export const NavBar = styled.div`
  position: sticky;
  width: 100%;
  height: 8vh;
  background-color: ${({ theme }) => theme.body};
  box-shadow: 0px 1px 10px #999;
`

export const cardContainer = styled.div`
overflow: hidden;
margin-top: 3vh;
`

export const Box = styled.div `
box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
position: relative;
background-color: ${({ theme }) => theme.body};
width: 100%;
margin-top: 5vh;

`

export default {
  antd: {
    dark: true, // active dark theme
    compact: true, // active compact theme
  },
}