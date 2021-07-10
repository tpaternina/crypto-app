import styled from "styled-components"; 
import { Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const ChartRow = styled(Row)`
  display: flex;
  justify-content: space-between;
`;

export const ChartCol = styled(Col)`
  display: flex;
  justify-content: center;
`;

export const ChartContainer = styled.div`
  text-align: center;
  font-size: 0.9rem;

  margin: 0;
  padding: 1.5rem;
  width: 100%;
  padding-top: 50%;
  position: relative;
  box-sizing: border-box;

  border-radius: 6px;
  border-collapse: collapse;
  background-color: #191b1f;
`
export const StyledLoading = styled(LoadingOutlined)`
  font-size: 3rem;
  text-align:center;
  color: #33363e;
  position: absolute;
  top: 45%;
  left: 45%;
  
`

export const StyledTitle = styled.h3`
  color: #fff;
  margin: 3rem 0 1.5rem 0;
  text-transform: capitalize;
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

  border-radius: 6px;
  border-collapse: collapse;
  background-color: #191b1f;
`;

