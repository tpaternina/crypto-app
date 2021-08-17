import {default as styled, keyframes} from "styled-components";
import { Col, Row} from "antd";

export const Container = styled.div`
  width: 100%;
  background-color: #191b1f;
`

export const StyledCol = styled(Col)`
  box-sizing: border-box;
  padding: 1rem 0.75rem;
  display: flex;
  align-items: flex-end;
  width: fit-content;
`;

export const StyledRow = styled(Row)`

  border-bottom: solid 1px #707070;
  &:last-of-type {
    border: none;
  }
`;

const gradient = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: .25;
  }
  100% {
    opacity: 1;
  }
`;

