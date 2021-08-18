import styled from "styled-components";
import { Col, Row } from "antd";

/* HIGH-LEVEL CONTAINERS */

export const AppContainer = styled.div`
  color: #ffffff;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 350px) {
    & {
      background-color: #171821;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      background-color: #1f2128;
    }
  }
`;

export const Container = styled.div`
  color: #ffffff;
  width: 100%;
  max-width: 1200px;

  @media screen and (min-width: 350px) {
    & {
      background-color: #171821;
      padding: 1rem 1rem;
      padding-top: 0;
      margin-bottom: 83.5px;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      background-color: #1f2128;
      padding: 2rem 3rem;
      padding-top: 0;
      margin-bottom: 0;
    }
  }
`;

export const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;

  & > li:last-of-type {
    margin: 0;
  }
`;

/* RESPONSIVE NAVBAR */

export const WideNavContainer = styled.nav`
  width: 100%;
  background-color: #191b1f;

  @media screen and (min-width: 350px) {
    & {
      display: none;
    }
  }

  @media screen and (min-width: 576px) {
    & {
      display: block;
    }
  }
`;

export const WideNav = styled.div`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;

  @media screen and (min-width: 350px) {
    & {
      display: none;
    }
  }

  @media screen and (min-width: 576px) {
    & {
      display: flex;
      padding: 1rem;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      display: flex;
      padding: 1rem 3rem;
    }
  }

  ul {
    display: flex;
  }

  li {
    list-style: none;
    margin-right: 1rem;
  }
`;

export const NarrowNav = styled.nav`
  position: fixed;
  z-index: 1000;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  background-color: #2c2d33;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (min-width: 350px) {
    & {
      display: flex;
    }
  }

  @media screen and (min-width: 576px) {
    & {
      display: none;
    }
  }
`;

/* RESPONSIVE PAGE TITLES */

export const WideDiv = styled.div`
  @media screen and (min-width: 350px) {
    & {
      display: none;
    }
  }

  @media screen and (min-width: 576px) {
    & {
      display: block;
    }
  }
`;

export const NarrowDiv = styled.div`
  width: 100%;
  padding: 0 1rem;
  position: absolute;
  top: 60px;
  left: 0;
  @media screen and (min-width: 350px) {
    & {
      display: block;
    }
  }

  @media screen and (min-width: 576px) {
    & {
      display: none;
    }
  }
`;

export const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

/* GLOBAL INFO BAR */

export const BarContainer = styled.div`
  width: 35px;
  margin-left: 0.25rem;
`;

export const InfoContainer = styled.div`
  justify-content: space-around;
  align-items: center;
  align-content: center;

  @media screen and (min-width: 350px) {
    display: ${({responsive}) => responsive ? "none" : "flex"}
  }

  @media screen and (min-width: 768px) {
    display: flex;
  }
`;

export const GlobalInfoContainer = styled.div`
  margin: 0 auto;
  margin-bottom: 1.5rem;
  padding: 0 2.5rem;

  height: 2.5rem;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;

  line-height: 1;
  font-size: 0.7rem;

  background-color: #191b1f;
  

  @media screen and (min-width: 350px) {
    & {
      background-color: #2c2f36;
      border-radius: 0;
      width: 100%;

      position: absolute;
      top: 0;
      left: 0;
      z-index: 900;
    }
  }
  @media screen and (min-width: 576px) {
    & {
      position: initial;
      background-color: #191b1f;
      border-radius: 0 0 6px 6px;
      width: 430px;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      position: initial;
      background-color: #191b1f;
      border-radius: 0 0 6px 6px;
      width: 610px;
    }
  }
`;


/* OVERVIEW CHART ELEMENTS */

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
  @media screen and (min-width: 576px) {
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

/* COIN TABLE ELEMENTS */

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

export const HeaderCol = styled(Col).attrs((props) => ({
  align: props.rank ? "center" : "flex-start",
}))`
  padding: 1.5rem 0.75rem 0 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align};

  @media screen and (min-width: 350px) {
    display: ${(props) => (props.xs === 0 ? "none" : "flex")};
  }

  @media screen and (min-width: 576px) {
    display: ${(props) => (props.sm === 0 ? "none" : "flex")};
  }

  @media screen and (min-width: 768px) {
    display: ${(props) => (props.md === 0 ? "none" : "flex")};
  }

  @media screen and (min-width: 992px) {
    display: ${(props) => (props.lg === 0 ? "none" : "flex")};
  }

  @media screen and (min-width: 1200px) {
    display: ${(props) => (props.xl === 0 ? "none" : "flex")};
  }

  @media screen and (min-width: 1600px) {
    display: flex;
  }
`;

export const HeaderRow = styled(Row)`
  font-weight: 900;
`;

export const TableCol = styled(Col).attrs((props) => ({
  align: props.rank ? "center" : "flex-start",
}))`
  box-sizing: border-box;
  padding: 1.5rem 0.75rem;
  justify-content: ${(props) => props.align};
  align-items: flex-end;
  width: fit-content;

  @media screen and (min-width: 350px) {
    display: ${(props) => (props.xs === 0 ? "none" : "flex")};
  }

  @media screen and (min-width: 576px) {
    display: ${(props) => (props.sm === 0 ? "none" : "flex")};
  }

  @media screen and (min-width: 768px) {
    display: ${(props) => (props.md === 0 ? "none" : "flex")};
  }

  @media screen and (min-width: 992px) {
    display: ${(props) => (props.lg === 0 ? "none" : "flex")};
  }

  @media screen and (min-width: 1200px) {
    display: ${(props) => (props.xl === 0 ? "none" : "flex")};
  }

  @media screen and (min-width: 1600px) {
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

/* SINGLE COIN INFO */

export const CoinCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1.25rem 0;
`;

export const CoinRow = styled(Row).attrs((props) => ({
  margin: props.top ? "125px" : 0,
}))`
  @media screen and (min-width: 350px) {
    flex-direction: column;
    margin-top: ${(props) => props.margin};
  }

  @media screen and (min-width: 576px) {
    flex-direction: row;
    margin-top: 0;
  }
`;

export const CoinTitleContainer = styled.div`
  text-align: center;
  font-size: 0.9rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0;
  padding: 1rem 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  border-radius: 6px;
  border-collapse: collapse;

  @media screen and (min-width: 350px) {
    background-color: ${(props) =>
      props.top ? "rgba(0, 0, 0, 0)" : "#2c2d33"};
    margin-bottom: 0;
  }

  @media screen and (min-width: 768px) {
    background-color: #191b1f;
    margin-bottom: ${(props) => (props.top ? "0.75rem" : "0")};
  }
`;

export const CoinContainer = styled.div`
  font-size: 0.9rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0;
  padding: 1rem 3.5rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  border-radius: 6px;
  @media screen and (min-width: 350px) {
    background-color: #2c2d33;
  }

  @media screen and (min-width: 768px) {
    background-color: #191b1f;
  }
`;

export const LogoContainer = styled.img`
  border-radius: 6px;
  padding: 1.25rem;
  box-sizing: border-box;
  margin: 2rem auto 0 auto;

  @media screen and (min-width: 350px) {
    background-color: #2c2d33;
  }

  @media screen and (min-width: 768px) {
    background-color: #1f2128;
  }
`;

export const CoinInfoContainer = styled.div`
  margin: ${props => props.margin};
  width: 100%;
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: flex-start;
  align-items: ${props => props.align};
`;