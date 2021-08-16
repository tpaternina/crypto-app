import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const AppContainer = styled.div`
  color: #ffffff;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 350px) {
    & {
      background-color: #1f2128;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      background-color: #171821;
    }
  }
`;

export const Container = styled.div`
  color: #ffffff;
  width: 100%;
  max-width: 1200px;

  @media screen and (min-width: 350px) {
    & {
      background-color: #1f2128;
      padding: 1rem 1rem;
      padding-top: 0;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      background-color: #171821;
      padding: 2rem 3rem;
      padding-top: 0;
    }
  }
`;

export const StyledLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
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
  padding: 0;
  display: flex;
  align-items: center;

  & > li:last-of-type {
    margin: 0;
  }
`

export const StyledNav = styled.nav`
  width: 100%;
  padding: 1rem 5.5rem;
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
