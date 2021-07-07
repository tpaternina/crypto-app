import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const AppContainer = styled.div`
  background-color: #1f2128;
  color: #ffffff;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  background-color: #1f2128;
  color: #ffffff;
  width: 100%;
  height: fit-content;
  padding: 2rem 5.5rem;
  padding-top: 0;
`;

export const StyledLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1.5rem;
  border-radius: 15px;
  font-size: 1rem;

  &::after {
    text-decoration: none;
    background-color: none;
  }
  &:hover, &.selected  {
    background-color: #2c2f36;
    color: #fff;
  }
`;

export const StyledList = styled.ul`
  margin: 0;
`

export const StyledNav = styled.nav`
  width: 100%;
  padding: 1rem 2.5rem;
  background-color: #191b1f;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    display: flex;
  }

  li {
    list-style: none;
    margin-right: 1rem;
  }
`;
