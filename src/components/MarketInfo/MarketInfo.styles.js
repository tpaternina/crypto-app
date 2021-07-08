import styled from "styled-components";

export const InvisibleLogo = styled.img`
  width: 0;
`;

export const MarketInfoRow = styled.div.attrs((props) => ({
  bottom: props.bottom,
}))`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${(props) => (props.bottom ? "margin-top: .5rem" : "margin-top: 0;")}
`;

export const StyledInfo = styled.div.attrs((props) => ({
  width: props.width,
}))`
  width: ${(props) => props.width};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MarketDiv = styled.div.attrs((props) => ({
  color: props.color,
}))`
  color: ${(props) => props.color};
`;
