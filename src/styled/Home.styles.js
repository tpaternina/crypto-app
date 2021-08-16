import styled from "styled-components";
import { Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const WideDivChart = styled.div`
  @media screen and (min-width: 350px) {
    & {
      display: none;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      display: block;
    }
  }
`;

export const NarrowDivChart = styled.div`
  width: 100%;
  @media screen and (min-width: 350px) {
    & {
      display: block;
      margin-top: 125px;
    }
  }
  @media screen and (min-width: 570px) {
    & {
      display: block;
      margin-top: 50px;
    }
  }
  @media screen and (min-width: 768px) {
    & {
      display: none;
    }
  }
`;

export const ChartCol = styled(Col)`
  &:first-of-type {
    padding-right: 2.5%;
  }

  &:last-of-type {
    padding-left: 2.5%;
  }
`;

export const ChartContainer = styled.div`
  text-align: center;
  font-size: 0.9rem;

  width: 100%;
  margin: 0;
  position: relative;
  border-radius: 6px;
  border-collapse: collapse;

  @media screen and (min-width: 350px) {
    & {
      background-color: #2c2f36;
      margin: 0;
    }
  }
  @media screen and (min-width: 768px) {
    & {
      background-color: #191b1f;
      color: #2c2f36;
    }
  }
`;

export const ChartDiv = styled.div`
  width: 100%;

  @media screen and (min-width: 350px) {
    & {
      padding: 25px 15px 0px 5px;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      padding: 35px 25px 5px 15px;
    }
  }
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

  @media screen and (max-width: 768px) {
    & {
      font-size: 0.75rem;
    }
  }
`;

export const StyledLoading = styled(LoadingOutlined)`
  font-size: 3rem;
  text-align: center;

  @media screen and (min-width: 350px) {
    & {
      margin-top: 20%;
      margin-bottom: 20%;
      color: #fff;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      margin-top: 20%;
      margin-bottom: 20%;
      color: #33363e;
    }
  }
`;

export const StyledPrice = styled.h1`
  color: #fff;
  font-weight: bold;
  margin: 0.5rem 0;
  @media screen and (max-width: 936px) {
    & {
      font-size: 1rem;
    }
  }
`;
