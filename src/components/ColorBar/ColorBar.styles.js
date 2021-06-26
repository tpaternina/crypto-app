import styled from "styled-components";

export const StyledBar = styled.div`
  background-color: ${(props) => props.color};
  height: 0.6rem;
  width: ${(props) => props.width}%;
  border-radius: 5px;
  ${(props) => (props.bottom ? "margin-top: .5rem" : "margin-top: 0;")}
`;
