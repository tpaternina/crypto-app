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
      background-color: #171821;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      background-color: #1f2128;
    }
  }
`;

export const Container = styled.div`
  color: #ffffff;
  width: 100%;
  max-width: 1200px;

  @media screen and (min-width: 350px) {
    & {
      background-color: #171821;
      padding: 1rem 1rem;
      padding-top: 0;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      background-color: #1f2128;
      padding: 2rem 3rem;
      padding-top: 0;
    }
  }
`;

export const WideNavContainer = styled.nav`
  width: 100%;
  background-color: #191b1f;

  @media screen and (min-width: 350px) {
    & {
      display: none;
    }
  }

  @media screen and (min-width: 570px) {
    & {
      display: block;
    }
  }
`;

export const WideNav = styled.div`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;

  @media screen and (min-width: 350px) {
    & {
      display: none;
    }
  }

  @media screen and (min-width: 570px) {
    & {
      display: flex;
      padding: 1rem;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      display: flex;
      padding: 1rem 3rem;
    }
  }

  ul {
    display: flex;
  }

  li {
    list-style: none;
    margin-right: 1rem;
  }
`;

export const StyledLink = styled(NavLink)`
  text-decoration: none;
  border-radius: 6px;
  font-size: 1rem;

  @media screen and (min-width: 350px) {
    & {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0;
      color: #fff;
    }
    &::after {
      color: #fff;
      text-decoration: none;
      background-color: none;
    }
    &:hover,
    &.selected {
      background-color: none;
      color: #00ff5f;
    }
  }

  @media screen and (min-width: 500px) {
    & {
      display: block;
      padding: 0.5rem 1.5rem;
      color: #fff;
    }
    &::after {
      text-decoration: none;
      background-color: none;
      color: #fff;
    }
    &:hover,
    &.selected {
      background-color: #2c2f36;
      color: #fff;
    }
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
`;

export const NarrowNav = styled.nav`
  position: fixed;
  z-index: 1000;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  background-color: #2c2d33;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (min-width: 350px) {
    & {
      display: flex;
    }
  }

  @media screen and (min-width: 500px) {
    & {
      display: none;
    }
  }
`;

export const NavIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

export const NavText = styled.div`
  color: #fff;
  font-size: 0.75rem;
`;
