import React from "react";
import { ColorBar } from "components";
import {
  BarContainer,
  IncreaseArrow,
  DecreaseArrow,
  GlobalInfoContainer,
  StyledContainer,
  StyledNumber,
} from "./GlobalInfo.styles";

export default class GlobalInfo extends React.Component {
  render() {
    const increase = true;
    return (
      <StyledContainer>
        <div title="Active coins">
          Coins <StyledNumber>7884</StyledNumber>
        </div>
        <div title="Total exchanges">
          Exchange <StyledNumber>622</StyledNumber>
        </div>
        
        <div title="Market Capitalization">
          <StyledNumber>• €1.69T</StyledNumber>{" "}
          {increase ? (
            <IncreaseArrow color="#00ff5f" />
          ) : (
            <DecreaseArrow color="#fe1040" />
          )}
        </div>
        <GlobalInfoContainer title="Total volume in the last 24h">
          <StyledNumber>• €124.45B</StyledNumber>{" "}
          <BarContainer>
            <ColorBar
              numerator={20}
              denominator={100}
              numeratorColor="#fff"
              denominatorColor="#2172e5"
            />
          </BarContainer>
        </GlobalInfoContainer>
        <GlobalInfoContainer title="Market Cap Dominance">
          <StyledNumber>• 44%</StyledNumber>{" "}
          <BarContainer>
            <ColorBar
              numerator={44}
              denominator={100}
              numeratorColor="#fff"
              denominatorColor="#2172e5"
            />
          </BarContainer>
        </GlobalInfoContainer>
        <GlobalInfoContainer title="Market Cap Dominance">
          <StyledNumber>• 21%</StyledNumber>{" "}
          <BarContainer>
            <ColorBar
              numerator={21}
              denominator={100}
              numeratorColor="#fff"
              denominatorColor="#2172e5"
            />
          </BarContainer>
        </GlobalInfoContainer>
      </StyledContainer>
    );
  }
}
