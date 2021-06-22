import styled from "styled-components";
import { Col, Row } from "antd";

export const StyledTitle = styled.h2`
  color: #fff;
`;

export const StyledCol = styled(Col)`
  padding: 1.5rem 0.75rem 0 0.75rem;
`;

export const StyledRow = styled(Row)`
  font-weight: 900;
`;

export const Container = styled.div`
  text-align: left;
  font-size: 0.9rem;

  margin: 1rem 0;
  width: 100%;
  box-sizing: border-box;

  border-radius: 15px;
  border-collapse: collapse;
  background-color: #191b1f;

  thead {
  }

  tbody tr {
    border-bottom: solid 1px #fff;
  }

  tbody tr:last-of-type {
    border: none;
  }

  th {
  }
`;
