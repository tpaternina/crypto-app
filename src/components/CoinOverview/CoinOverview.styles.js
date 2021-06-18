import styled from "styled-components";


export const CoinLogo = styled.img`
  width: 20px;
  margin-right: 0.75rem;
`;

export const StyledCoinName = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const StyledPercentage = styled.span`
  min-width: 65px;
  color: ${(props) => (props.increase ? "#00fc2a" : "#fe1040")};
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

export const MarketInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
