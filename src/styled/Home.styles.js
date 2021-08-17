import {default as styled, keyframes} from "styled-components";
import { Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

/* Coin Table */
export const TableContainer = styled.div`
  text-align: left;
  font-size: 0.75rem;

  margin: 1rem 0;
  width: 100%;
  box-sizing: border-box;

  border-radius: 6px;
  border-collapse: collapse;
  background-color: #191b1f;
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

export const ContentLoading = styled.div`
  background: #33363e;
  background-size: 200% 200%;
  animation: ${gradient} 2s ease infinite;
  width: 100%;
  height: 1rem;
`;

export const HeaderCol = styled(Col).attrs((props) => ({
  align: props.rank ? "center" : "flex-start",
}))`
  padding: 1.5rem 0.75rem 0 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align};

  @media screen and (min-width: 350px) {
    display: ${props => props.xs === 0 ? "none" : "flex"}
  }

  @media screen and (min-width: 576px) {
    display: ${props => props.sm === 0 ? "none" : "flex"}
  }

  @media screen and (min-width: 768px) {
    display: ${props => props.md === 0 ? "none" : "flex"}
  }

  @media screen and (min-width: 992px) {
    display: ${props => props.lg === 0 ? "none" : "flex"}
  }

  @media screen and (min-width: 1200px) {
    display: ${props => props.xl === 0 ? "none" : "flex"}
  }

  @media screen and (min-width: 1600px){
    display: flex;
  }
`;

export const HeaderRow = styled(Row)`
  font-weight: 900;
`;

export const TableCol = styled(Col).attrs((props) => ({
  align: props.rank ? "center" : "flex-start",
  display: props.display,
}))`
  box-sizing: border-box;
  padding: 1.5rem 0.75rem;
  justify-content: ${(props) => props.align};
  align-items: flex-end;
  width: fit-content;

  @media screen and (min-width: 350px) {
    display: ${props => props.xs === 0 ? "none" : "flex"}
  }

  @media screen and (min-width: 576px) {
    display: ${props => props.sm === 0 ? "none" : "flex"}
  }

  @media screen and (min-width: 768px) {
    display: ${props => props.md === 0 ? "none" : "flex"}
  }

  @media screen and (min-width: 992px) {
    display: ${props => props.lg === 0 ? "none" : "flex"}
  }

  @media screen and (min-width: 1200px) {
    display: ${props => props.xl === 0 ? "none" : "flex"}
  }

  @media screen and (min-width: 1600px){
    display: flex;
  }
`;

export const TableRow = styled(Row)`
  border-bottom: solid 1px #707070;
  vertical-align: bottom;
  &:last-of-type {
    border: none;
  }
`;

/* Overview Charts */
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
