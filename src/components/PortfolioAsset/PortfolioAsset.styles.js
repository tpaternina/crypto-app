import styled from "styled-components";
import { Col, Row } from "antd";

export const ColorBarContainer = styled.div`
  width: 35px;
  margin-left: 0.35rem;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  border-radius: 6px;
  background-color: #191b1f;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CoinContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background-color: #191b1f;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.7rem;
`;

export const InfoTitle = styled.div`
  font-weight: bold;
`;

export const LogoContainer = styled.img.attrs((props) => ({
  width: props.width,
}))`
  width: ${(props) => props.width};
  background-color: #1f2128;
  border-radius: 6px;

  padding: 1rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
  box-sizing: border-box;
`;

export const StyledCol = styled(Col).attrs((props) => ({
  height: props.height,
}))`
  height: ${(props) => props.height};
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
`;

export const StyledRow = styled(Row).attrs((props) => ({
  margin: props.margin,
}))`
  margin: ${(props) => props.margin};
`;

export const StyledCoinName = styled.h4`
  color: #fff;
`;

export const StyledInfo = styled.span.attrs((props) => ({
  color: props.color || props.increase ? "#06d554" : "#fe1040",
}))`
  color: ${(props) => props.color};
  margin-left: 0.45rem;
`;

export const StyledTitle = styled.h3`
  color: #fff;
`;
