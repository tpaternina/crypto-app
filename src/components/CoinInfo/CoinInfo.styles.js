import styled from "styled-components";
import { Col, Row } from "antd";

export const StyledCol = styled(Col)`
  box-sizing: border-box;
  padding: 1.5rem 0.75rem;
  display: flex;
  align-items: flex-end;
  width: fit-content;
`;

export const StyledRow = styled(Row)`
  border-bottom: solid 1px #fff;
  vertical-align: bottom;
  &:last-of-type {
    border: none;
  }
`;

export const CoinLogo = styled.img`
  width: 20px;
  margin-right: 0.75rem;
`;

export const StyledCoinName = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const StyledPercentage = styled.span.attrs((props) => ({
  color: props.increase ? "#00fc2a" : "#fe1040",
}))`
  min-width: 65px;
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
`;

export const IncreaseArrow = styled.img`
  width: 13px;
  margin-right: 5px;
`;

export const MarketInfoRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MarketDiv = styled.div.attrs(props => ({
  color: props.color,
}))`
  color: ${(props) => props.color};
`;
