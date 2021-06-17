import styled from "styled-components";
import { Link } from "react-router-dom";

export const AppContainer = styled.div`
  background-color: #1f2128;
  color: #ffffff;
  width: 100%;
  height: 100%;

  padding: 1rem 2.5rem;

`;

export const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: .5rem 1.5rem;
  border-radius: 15px;

  &::after {
    text-decoration: none;
  }
  &:hover {
    background-color: #2c2f36;
  }
`

export const StyledNav = styled.nav`
  background-color: #191b1f;

  ul {
    display: flex;
    padding: 1rem 2.5rem;
  }

  li {
    list-style: none;
    margin-right: 1rem;
  }
`

