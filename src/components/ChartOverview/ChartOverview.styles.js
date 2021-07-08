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

  border-radius: 15px;
  border-collapse: collapse;
  background-color: #191b1f;
  
  & > .chart-info {
    position: absolute;
    top: 0;
  }

  & > .chart { 
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    
  }
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
  color: #33363e;
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
