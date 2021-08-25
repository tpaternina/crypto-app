import styled from "styled-components";
import { mobile, medium } from "./Sizes.styles";


export const MobileClose = styled.button`
  font-size: 2rem;
  background-color: #00000000;
  border: none;
  margin-bottom: 1rem;
  cursor: pointer;

  & > * {
    margin-right: 1rem;
    font-weight: bold;
  }
`;

export const StyledFauxLink = styled.button`
  font-size: 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: #00000000;
  border: none;

  ${mobile} {
    & {
      display: flex;
      flex-direction: column;
      padding: 0;
      color: #fff;
    }
    &::after {
      color: #fff;
      text-decoration: none;
    }
    &:hover,
    &.selected {
      color: #00ff5f;
    }
  }
`;


export const StyledButton = styled.button.attrs(props => ({
  color: props.primary ? "#ffffff" : "#06d554",
  backgroundColor: props.primary ? "#06d554" : "#ffffff",
  margin: props.modal ? "0.75rem auto" : "2rem auto"
}))`
  width: 100%;
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
  border: none;
  padding: 1rem 4.5rem;
  text-transform: capitalize;
  border-radius: 6px;
  

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: ${props => props.backgroundColor + "cc"};
  }

  ${mobile} {
    margin: ${props => props.margin};
  }

  ${medium} {
    margin: 2rem auto;
  }
`;

export const ConverterButton = styled.button`
  color: #fff;
  background-color: #06d554;
  border: none;

  text-transform: capitalize;
  border-radius: 6px;
  padding: 0.75rem;
  margin: 0 auto;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: ${props => props.backgroundColor + "cc"};
  }
`;


export const StyledAnchor = styled.a`
  color: #06d554;
  border-radius: 6px;

  height: 100%;
  width: 9rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: .75rem 1rem;

  &:hover {
    color: #06d554;
  }

  ${mobile} {
    background-color: #2c2d33;
  }

  ${medium} {
    background-color: #191b1f;
  }
`;

