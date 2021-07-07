import { isEmpty } from "lodash";
import { MarketInfo } from "components";
import { formatCurrency } from "utils";
import { plusSign } from "assets";
import {
  StyledContainer,
  StyledDiv,
  StyledInfo,
  StyledPercentage,
  StyledPlus,
  StyledSectionTitle,
} from "./CoinMarketInfo.styles";

export default function CoinMarketInfo(props) {
  const { currency, data } = props;
  console.log(data.image.small);
  return (
    <StyledContainer>
      <StyledDiv>
        <StyledInfo>
          <StyledPlus src={plusSign} twoToneColor="#2172e5" />
          <StyledSectionTitle>Market Cap: </StyledSectionTitle>
          {formatCurrency(data.marketData.marketCap[currency], currency)}{" "}
          <StyledPercentage>
            {data.marketData.marketCapChangePercentage24H.toFixed(2)}%
          </StyledPercentage>
        </StyledInfo>
        {!isEmpty(data.marketData.fullyDilutedValuation) && (
          <StyledInfo>
            <StyledPlus src={plusSign} twoToneColor="#2172e5" />
            <StyledSectionTitle>Fully diluted valuation: </StyledSectionTitle>
            {formatCurrency(
              data.marketData.fullyDilutedValuation[currency],
              currency
            )}
          </StyledInfo>
        )}
        <StyledInfo>
          <StyledPlus src={plusSign} twoToneColor="#2172e5" />
          <StyledSectionTitle>Volume 24h: </StyledSectionTitle>
          {formatCurrency(data.marketData.totalVolume[currency], currency)}
        </StyledInfo>
        <StyledInfo>
          <StyledPlus src={plusSign} twoToneColor="#2172e5" />
          <StyledSectionTitle>Volume / Market: </StyledSectionTitle>
          {(
            data.marketData.totalVolume[currency] /
            data.marketData.marketCap[currency]
          ).toFixed(5)}
        </StyledInfo>
      </StyledDiv>
      <StyledDiv>
        {!isEmpty(data.marketData.totalVolume[data.symbol]) && (
          <StyledInfo>
            <StyledPlus src={plusSign} twoToneColor="#2172e5" />
            <StyledSectionTitle>Total volume: </StyledSectionTitle>
            {`${data.marketData.totalVolume[data.symbol].toLocaleString(
              "en-UK"
            )} ${data.symbol.toUpperCase()}`}
          </StyledInfo>
        )}
        {data.marketData.circulatingSupply && (
          <StyledInfo>
            <StyledPlus src={plusSign} twoToneColor="#2172e5" />
            <StyledSectionTitle>Circulating supply: </StyledSectionTitle>
            {`${data.marketData.circulatingSupply.toLocaleString(
              "en-UK"
            )} ${data.symbol.toUpperCase()}`}
          </StyledInfo>
        )}
        <StyledInfo>
          <StyledPlus src={plusSign} twoToneColor="#2172e5" />
          <StyledSectionTitle>Max supply: </StyledSectionTitle>
          {data.marketData.totalSupply
            ? `${data.marketData.totalSupply.toLocaleString(
                "en-UK"
              )} ${data.symbol.toUpperCase()}`
            : "∞"}
        </StyledInfo>
        <MarketInfo
          width="55%"
          percentage={true}
          singleCoin={true}
          numerator={data.marketData.totalVolume[currency]}
          denominator={data.marketData.marketCap[currency]}
          logoUrl={data.image.large}
        />
      </StyledDiv>
    </StyledContainer>
  );
}
