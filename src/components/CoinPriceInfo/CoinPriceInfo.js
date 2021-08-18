import { isEmpty } from "lodash";
import { layers } from "assets";
import {
  CoinAllTimeInfo,
  CoinInfoContainer,
  CoinContainer,
  CoinPrice,
  IncreaseText,
  IncreaseArrow,
  DecreaseArrow,
  StyledLayerIcon,
} from "styled";
import { formatCurrency, formatLongDate } from "utils";



export default function CoinPriceInfo(props) {
  const { data, increase } = props;
  let { currency } = props;
  currency = currency.toLowerCase();
  return (
    !isEmpty(data) && (
      <CoinContainer>
        <CoinPrice>
          {formatCurrency(data.marketData.currentPrice[currency], currency)}
          <IncreaseText increase={increase} size="1rem" margin="0 0.25rem">
            {increase ? <IncreaseArrow /> : <DecreaseArrow />}
            {data.marketData.priceChangePercentage24H ? (
              `${data.marketData.priceChangePercentage24H.toFixed(2)}%`
            ) : (
              <small>unavailable</small>
            )}
          </IncreaseText>
        </CoinPrice>
        <p>
          <strong>Profit: </strong>
          <IncreaseText increase={increase} size="1rem" margin="0 0.25rem">
            {data.marketData.priceChangePercentage24H ? (
              formatCurrency(
                data.marketData.priceChange24HInCurrency[currency],
                currency
              )
            ) : (
              <small>unavailable</small>
            )}
          </IncreaseText>
        </p>
        <StyledLayerIcon src={layers} />
        <div>
          <CoinInfoContainer margin="1rem 0 0 0" direction="row" align="center">
            <IncreaseArrow />
            <CoinAllTimeInfo>
              <div>
                <strong>All Time High: </strong>
                {formatCurrency(data.marketData.ath[currency], currency)}
              </div>
              <div>{formatLongDate(data.marketData.athDate[currency])}</div>
            </CoinAllTimeInfo>
          </CoinInfoContainer>
          <CoinInfoContainer margin="1rem 0 0 0" direction="row" align="center">
            <DecreaseArrow />
            <CoinAllTimeInfo>
              <div>
                <strong>All Time Low: </strong>
                {formatCurrency(data.marketData.atl[currency], currency)}
              </div>
              <div>{formatLongDate(data.marketData.atlDate[currency])}</div>
            </CoinAllTimeInfo>
          </CoinInfoContainer>
        </div>
      </CoinContainer>
    )
  );
}
