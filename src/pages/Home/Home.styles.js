import styled from "styled-components";
import { Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const ChartRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  display: flex;
  justify-content: space-between;
`;

export const ChartCol = styled(Col)`
  padding: 0.75rem;
  display: flex;
  justify-content: center;
`;
export const ChartContainer = styled.div`
  text-align: center;
  font-size: 0.9rem;

  margin: 0;
  padding: 1.5rem;
  width: 90%;
  box-sizing: border-box;

  border-radius: 10px;
  border-collapse: collapse;
  background-color: #191b1f;
  
`;

export const StyledLoading = styled(LoadingOutlined)`
  font-size: 3rem;
`

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

  border-radius: 10px;
  border-collapse: collapse;
  background-color: #191b1f;
`;

