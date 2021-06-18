import styled from "styled-components";
import { Link } from "react-router-dom";

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
  padding: 2rem 2.5rem;
`;

export const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1.5rem;
  border-radius: 15px;

  &::after {
    text-decoration: none;
  }
  &:hover {
    background-color: #2c2f36;
  }
`;

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
