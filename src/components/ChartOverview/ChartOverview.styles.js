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

  border-radius: 15px;
  border-collapse: collapse;
  background-color: #191b1f;
  
`;

export const ChartInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

export const StyledLoading = styled(LoadingOutlined)`
  font-size: 3rem;
  text-align:center;
`

export const StyledInfo = styled.p`
color: #fff;
margin: 0;
`

export const StyledPrice = styled.h1`
  color: #fff;
  font-weight: bold;
  margin: .5rem 0;
` 
