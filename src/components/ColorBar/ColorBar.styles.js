import styled from "styled-components";

export const StyledBar = styled.div.attrs(props => ({
  ...props
}))`
  background-color: ${(props) => props.color};
  height: 0.5rem;
  width: ${(props) => props.width};
  border-radius: 5px;
`;
