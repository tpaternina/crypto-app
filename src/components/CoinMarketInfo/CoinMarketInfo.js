import { isEmpty } from "lodash";
import { MarketInfo } from "components";
import { formatCurrency } from "utils";
import { plusSign } from "assets";
import {
  CoinContainer,
  CoinInfoContainer,
  CoinMarketInfoTitle,
  StyledPlus,
  StyledPercentage,
} from "styled";

export default function CoinMarketInfo(props) {
  const { currency, data } = props;
  return (
    <CoinContainer>
      <CoinInfoContainer direction="column" align="flex-start">
        <CoinInfoContainer direction="row" align="center" margin="0.35rem 0">
          <StyledPlus src={plusSign} twoToneColor="#2172e5" />
          <CoinMarketInfoTitle>Market Cap: </CoinMarketInfoTitle>
          {formatCurrency(data.marketData.marketCap[currency], currency)}
          <StyledPercentage>
            {data.marketData.marketCapChangePercentage24H ? (
              `${data.marketData.marketCapChangePercentage24H.toFixed(2)}%`
            ) : (
              <small>unavailable</small>
            )}
          </StyledPercentage>
        </CoinInfoContainer>
        {!isEmpty(data.marketData.fullyDilutedValuation) && (
          <CoinInfoContainer direction="row" align="center" margin="0.35rem 0">
            <StyledPlus src={plusSign} twoToneColor="#2172e5" />
            <CoinMarketInfoTitle>Fully diluted valuation: </CoinMarketInfoTitle>
            {formatCurrency(
              data.marketData.fullyDilutedValuation[currency],
              currency
            )}
          </CoinInfoContainer>
        )}
        <CoinInfoContainer direction="row" align="center" margin="0.35rem 0">
          <StyledPlus src={plusSign} twoToneColor="#2172e5" />
          <CoinMarketInfoTitle>Volume 24h: </CoinMarketInfoTitle>
          {formatCurrency(data.marketData.totalVolume[currency], currency)}
        </CoinInfoContainer>
        <CoinInfoContainer direction="row" align="center" margin="0.35rem 0">
          <StyledPlus src={plusSign} twoToneColor="#2172e5" />
          <CoinMarketInfoTitle>Volume / Market: </CoinMarketInfoTitle>
          {data.marketData.marketCap[currency]
            ? (
                data.marketData.totalVolume[currency] /
                data.marketData.marketCap[currency]
              ).toFixed(5)
            : "∞"}
        </CoinInfoContainer>
      </CoinInfoContainer>
      <CoinInfoContainer direction="column" align="flex-start">
        {data.marketData.totalVolume[data.symbol] && (
          <CoinInfoContainer direction="row" align="center" margin="0.35rem 0">
            <StyledPlus src={plusSign} twoToneColor="#2172e5" />
            <CoinMarketInfoTitle>Total volume: </CoinMarketInfoTitle>
            {`${data.marketData.totalVolume[data.symbol].toLocaleString(
              "en-UK"
            )} ${data.symbol.toUpperCase()}`}
          </CoinInfoContainer>
        )}
        {typeof data.marketData.circulatingSupply === "number" ? (
          <CoinInfoContainer direction="row" align="center" margin="0.35rem 0">
            <StyledPlus src={plusSign} twoToneColor="#2172e5" />
            <CoinMarketInfoTitle>Circulating supply: </CoinMarketInfoTitle>
            {`${data.marketData.circulatingSupply.toLocaleString(
              "en-UK"
            )} ${data.symbol.toUpperCase()}`}
          </CoinInfoContainer>
        ) : (
          <></>
        )}
        <CoinInfoContainer direction="row" align="center" margin="0.35rem 0">
          <StyledPlus src={plusSign} twoToneColor="#2172e5" />
          <CoinMarketInfoTitle>Max supply: </CoinMarketInfoTitle>
          {data.marketData.totalSupply
            ? `${data.marketData.totalSupply.toLocaleString(
                "en-UK"
              )} ${data.symbol.toUpperCase()}`
            : "∞"}
        </CoinInfoContainer>
        {data.marketData.marketCap[currency] && (
          <MarketInfo
            percentage={true}
            width="65%"
            numerator={data.marketData.totalVolume[currency]}
            denominator={data.marketData.marketCap[currency]}
          />
        )}
      </CoinInfoContainer>
    </CoinContainer>
  );
}
