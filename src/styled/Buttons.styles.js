import styled from "styled-components";

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

  @media screen and (min-width: 350px) {
    margin: ${props => props.margin};
  }

  @media screen and (min-width: 768px) {
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
  color: #fff;
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

  @media screen and (min-width: 350px) {
    background-color: #2c2d33;
  }

  @media screen and (min-width: 768px) {
    background-color: #191b1f;
  }
`;

