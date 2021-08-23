import styled from "styled-components";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";

/* HIGH-LEVEL CONTAINERS */

export const AppContainer = styled.div`
  color: #ffffff;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 350px) {
    & {
      background-color: #171821;
    }
  }

  @media screen and (min-width: 576px) {
    & {
      background-color: #1f2128;
    }
  }
`;

export const Container = styled.div`
  color: #ffffff;
  width: 100%;
  max-width: 1200px;
  height: 100%;

  @media screen and (min-width: 350px) {
    & {
      padding: 1rem 1rem;
      padding-top: 0;
      margin-bottom: 83.5px;
    }
  }

  @media screen and (min-width: 576px) {
    & {
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
  align-items: center;
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
    display: ${({ responsive }) => (responsive ? "none" : "flex")};
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

export const ChartContainer = styled.div.attrs(props => ({
  margin: props.timeRange ? "1rem 0 0 0" : "0",
  padding: props.timeRange ? "0.75rem 0.75rem" : "default",
  paddingTop: props.timeRange ? "0.75rem" : "50%",
}))`
  text-align: center;
  font-size: 0.9rem;

  width: 100%;
  margin: ${(props) => props.margin};
  padding: ${props => props.padding};
  padding-top: ${props => props.paddingTop};
  position: relative;
  border-radius: 6px;
  border-collapse: collapse;

  @media screen and (min-width: 350px) {
    & {
      background-color: #2c2f36;
    }
  }
  @media screen and (min-width: 576px) {
    & {
      background-color: #191b1f;
      color: #2c2f36;
    }
  }
`;

export const ChartDiv = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
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

export const StyledChartInfo = styled.p`
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
  @media screen and (min-width: 350px) {
    background-color: none;
  }
  @media screen and (min-width: 576px) {
    background-color: #191b1f;
  }
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

export const TableRowLogo = styled.img`
  width: 20px;
  margin-right: 0.75rem;
`;

export const MarketInfoRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledInfo = styled.div.attrs((props) => ({
  width: props.width,
}))`
  width: ${(props) => props.width};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MarketDiv = styled.div.attrs(props => ({
  color: props.color,
}))`
  color: ${(props) => props.color};
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

export const LogoContainer = styled.img.attrs((props) => ({
  width: props.width || "default",
  margin: props.margin || "2rem auto 0 auto",
  backgroundColor: props.modal ? "#1f2128" : "#2c2d33",
}))`
  width: ${(props) => props.width};
  border-radius: 6px;
  padding: 1.25rem;
  box-sizing: border-box;
  margin: ${(props) => props.margin};

  @media screen and (min-width: 350px) {
    background-color: ${(props) => props.backgroundColor};
  }

  @media screen and (min-width: 768px) {
    background-color: #1f2128;
  }
`;

export const CoinInfoContainer = styled.div`
  margin: ${(props) => props.margin};
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: flex-start;
  align-items: ${(props) => props.align};
`;

export const CoinChartDiv = styled.div`
  width: 100%;
  min-height: 200px;
  position: absolute;
  bottom: -1;
  left: 0;
  margin-bottom: 84.5px;
`;

/* PORTFOLIO PAGE */

export const PortfolioRow = styled(Row).attrs((props) => ({
  marginTop: props.top ? "125px" : "initial",
  direction: props.asset ? "column" : "row",
}))`
  @media screen and (min-width: 350px) {
    margin: ${(props) => (props.margin ? props.margin : "0 0 2rem 0")};
    margin-top: ${(props) => props.marginTop};
    flex-direction: ${(props) => props.direction};
    justify-content: center;
    align-items: center;
  }

  @media screen and (min-width: 576px) {
    margin-top: initial;
    margin: ${(props) => (props.margin ? props.margin : "0 0 2rem 0")};
    margin-top: initial;
  }

  @media screen and (min-width: 992px) {
    margin-top: initial;
    margin: ${(props) => (props.margin ? props.margin : "0 0 2rem 0")};
    flex-direction: row;
    justify-content: ${(props) => props.justify};
    align-items: center;
  }
`;

export const PortfolioCol = styled(Col).attrs((props) => ({
  align: props.align || "center",
  justify: props.justify || "center",
  direction: props.direction || "row",
}))`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};

  & > h3 {
    margin: 0;
  }
`;

export const SmallColorBarContainer = styled.div`
  margin-left: 0.35rem;

  @media screen and (min-width: 350px) {
    width: 60px;
  }

  @media screen and (min-width: 992px) {
    width: 35px;
  }
`;

export const AssetCol = styled(Col).attrs((props) => ({
  height: props.height,
}))`
  height: ${(props) => props.height};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  @media screen and (min-width: 350px) {
    & > div {
    margin-top: .5rem;
  }

  @media screen and (min-width: 992px) {
    & > div {
    margin-top: 0;
  }  
`;

export const AssetCoinContainer = styled.div.attrs((props) => ({
  backgroundColor: props.modal ? "#191b1f" : "rgba(0, 0, 0, 0)",
  padding: props.modal ? "1.5rem" : "0.5rem",
  margin: props.modal ? "0 0 1rem 0" : "default",
}))`
  height: 100%;
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  border-radius: 6px;
  box-sizing: border-box;
  width: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 350px) {
    background-color: ${(props) => props.backgroundColor};
  }

  @media screen and (min-width: 768px) {
    background-color: #191b1f;
  }

  @media screen and (min-width: 992px) {
    background-color: #191b1f;
  }
`;

export const AssetContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 6px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  @media screen and (min-width: 350px) {
    background-color: rgba(0, 0, 0, 0);
    flex-direction: column;
    padding: 1rem;
  }

  @media screen and (min-width: 768px) {
    background-color: #191b1f;
    flex-direction: row;
    padding: 0.75rem;
  }

  @media screen and (min-width: 992px) {
    background-color: #191b1f;
    flex-direction: row;
    padding: 0.75rem;
  }
`;

export const AssetInfoContainer = styled.div`
  display: flex;

  align-items: center;
  border-radius: 6px;

  @media screen and (min-width: 350px) {
    background-color: #2c2d33;
    font-size: 1rem;
    padding: 1rem;
    width: 100%;
    margin-bottom: 0.5rem;
    justify-content: space-between;
  }

  @media screen and (min-width: 768px) {
    font-size: 0.75rem;
    background-color: rgba(0, 0, 0, 0);
  }

  @media screen and (min-width: 992px) {
    background-color: #rgba(0, 0, 0, 0);
    padding: 0.25rem;
    width: auto;
    margin-bottom: 0;
    justify-content: space-around;
  }
`;

export const AssetInfoTitleContainer = styled.div`
  font-weight: bold;
  max-width: 60%;
`;

export const AssetInfo = styled.span.attrs((props) => ({
  color: props.color,
}))`
  color: ${(props) => props.color};
  margin-left: 0.45rem;
`;

export const PercentageContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const AssetCoinLink = styled(Link)`
  display: inherit;
  flex-direction: inherit;
  justify-content: inherit;
  align-items: inherit;
`;

/* ASSET MODAL */

export const ModalRow = styled(Row)`
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 0;
  }

  @media screen and (min-width: 350px) {
    flex-direction: ${(props) => (props.form ? "column" : "row")};
    align-items: center;
  }

  @media screen and (min-width: 576px) {
    flex-direction: row;
    align-items: default;
  }
`;

export const ModalContainer = styled.div`
  max-width: 500px;
  border-radius: 6px;

  background-color: #2c2f36;
  padding: 2rem;
  box-sizing: content-box;

  @media screen and (min-width: 350px) {
    width: 100%;
    margin: 0 1rem;
  }

  @media screen and (min-width: 768px) {
    width: 57%;
  }
`;
