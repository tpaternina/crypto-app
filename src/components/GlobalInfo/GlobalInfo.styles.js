import styled from "styled-components";
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";

export const BarContainer = styled.div`
  width: 35px;
  margin-left: .25rem;
`;

export const IncreaseArrow = styled(CaretUpFilled).attrs((props) => ({
  color: props.color,
}))`
  width: 13px;
  margin-right: 5px;
  color: ${(props) => props.color};
`;

export const CoinLogo = styled.img`
  width: 15px;
  
`;

export const DecreaseArrow = styled(CaretDownFilled).attrs((props) => ({
  color: props.color,
}))`
  width: 13px;
  margin-right: 5px;
  color: $(props => props.color);
`;

export const GlobalInfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
`;

export const StyledContainer = styled.div`
  margin: 0 auto;
  margin-bottom: 1.5rem;
  padding: 0 2.5rem;

  height: 2.5rem;
  width: 57%;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;

  line-height: 1;
  font-size: 0.8rem;

  background-color: #191b1f;
  border-radius: 0 0 10px 10px;
`;

export const StyledNumber = styled.span`
  font-weight: 900;
`;
