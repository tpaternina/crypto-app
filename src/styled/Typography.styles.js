import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { Typography } from "antd";

const { Paragraph } = Typography;

export const StyledTitle = styled.h3`
  color: #fff;
  text-transform: capitalize;
  @media screen and (min-width: 350px) {
    & {
      font-size: 2rem;
      margin: 0;
    }
  }
  @media screen and (min-width: 576px) {
    & {
      font-size: initial;
      margin: 3rem 0 1.5rem 0;
    }
  }
`;

export const NavText = styled.div`
  color: #fff;
  font-size: 0.75rem;
`;

export const StyledLink = styled(NavLink)`
  text-decoration: none;
  border-radius: 6px;
  font-size: 1rem;
  height: 100%;
  display: flex;
  align-items: center;

  @media screen and (min-width: 350px) {
    & {
      display: flex;
      flex-direction: column;
      padding: 0;
      color: #fff;
    }
    &::after {
      color: #fff;
      text-decoration: none;
      background-color: none;
    }
    &:hover,
    &.selected {
      background-color: none;
      color: #00ff5f;
    }
  }

  @media screen and (min-width: 570px) {
    & {
      flex-direction: row;
      padding: 0.5rem 1.5rem;
      color: #fff;
    }
    &::after {
      text-decoration: none;
      background-color: none;
      color: #fff;
    }
    &:hover,
    &.selected {
      background-color: #2c2f36;
      color: #fff;
    }
  }
`;

/* GLOBAL BAR */
export const StyledNumber = styled.span`
  display: flex;
  font-weight: 900;
`;

export const GlobalText = styled.span`
  margin-right: 0.25rem;
`;

/* CHART PRICE */
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

/* HOME PAGE */

export const StyledRowLink = styled(Link)`
  color: #fff;
  &:hover {
    color: #fff;
  }
  &:visited {
    color: #fff;
  }
`;

export const CoinRowName = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

/* PRICE INCREASE */
export const IncreaseText = styled.span.attrs((props) => ({
  increase: props.increase,
  size: props.size,
  margin: props.margin,
}))`
  min-width: 65px;
  color: ${(props) => (props.increase ? "#00fc2a" : "#fe1040")};
  font-size: ${(props) => props.size};
  margin: ${(props) => props.margin};
`;

/* SINGLE COIN PAGE */
export const StyledCoinName = styled.h2`
  color: #fff;

  @media screen and (min-width: 350px) {
    margin: 1rem auto 1rem auto;
  }

  @media screen and (min-width: 768px) {
    margin: 1.5rem auto 2rem auto;
  }
`;

export const StyledCoinLink = styled.a`
  color: #fff;
  font-size: 0.85rem;
  text-decoration: none;
  &::after {
    color: #fff;
    text-decoration: none;
  }
  &:hover,
  &:active {
    color: #00fc2a;
  }
`;

export const CoinPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;

  margin-bottom: 0.5rem;
`;

export const StyledDescription = styled(Paragraph)`
  &.ant-typography.ant-typography-ellipsis {
    color: #fff;
    line-height: 1.35rem;
    text-align: left;
    margin-bottom: 1.5rem;
  }
  & > .ant-typography-expand {
    color: #00fc2a;
  }
`;

export const CoinAllTimeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  & > div:last-of-type {
    margin-top: 0.35rem;
  }
`;

export const CoinMarketInfoTitle = styled.span`
  margin-right: 0.5rem;
  font-weight: bold;
  text-transform: capitalize;
`;

export const StyledPercentage = styled.span`
  margin-left: 0.5rem;
  font-weight: bold;
`;

/* PORTFOLIO PAGE */

export const PlaceholderText = styled.div`
  font-size: ${props => props.size};
  font-weight: bold;
  color: #40454f;
`;

export const AssetCoinName = styled.h4`
  color: #fff;
  text-align: center;
`;

export const AssetSectionTitle = styled.h3`
  color: #fff;
  font-weight: bold;

  @media screen and (min-width: 350px) {
    font-size: 2rem;
  }

  @media screen and (min-width: 576px) {
    font-size: 1.25rem;
  }
`;