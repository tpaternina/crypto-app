import styled from "styled-components";

export const MarketInfoRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${(props) => (props.bottom ? "margin-top: .5rem" : "margin-top: 0;")}
`;

export const StyledInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MarketDiv = styled.div`
  color: ${(props) => props.color};
`;
