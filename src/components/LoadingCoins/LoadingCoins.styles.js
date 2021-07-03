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
  from {
    background-position: 150% 50%;
  }
  to {
    background-position: -50% 50%;
  }
`;

export const ContentLoading = styled.div`
  background: linear-gradient(45deg, #1f2128, #1f2128, #33363e, #1f2128, #1f2128);
  background-size: 200% 200%;
  animation: ${gradient} 1s ease infinite;
  width: 100%;
  height: 1rem;
`;