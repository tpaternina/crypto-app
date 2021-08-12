import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";

export const ChartCol = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid white;
`;

export const ChartContainer = styled.div`
  text-align: center;
  font-size: 0.9rem;

  margin: 0;
  &:last-of-type {
    margin-left: 50px;
  }
  padding: 25% .25rem 0 .25rem;
  width: 50%;
  position: relative;

  border-radius: 6px;
  border-collapse: collapse;
  background-color: #191b1f;
`;

export const ChartInfo = styled.div`
  width: 100%;

  position: absolute;
  top: 10px;
  left: 10px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const StyledInfo = styled.p`
color: #fff;
margin: 0;
`;

export const StyledLoading = styled(LoadingOutlined)`
  font-size: 3rem;
  text-align:center;
  color: #33363e;

  position: absolute;
  top: 45%;
  left: 45%;
`;


export const StyledPrice = styled.h1`
  color: #fff;
  font-weight: bold;
  margin: .5rem 0;
`;