import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { isEmpty } from "lodash";
import { layers } from "assets";
import { formatCurrency, formatLongDate } from "utils";
import {
  StyledAllTimeContainer,
  StyledAllTimeInfo,
  StyledContainer,
  StyledIncrease,
  StyledLayerIcon,
  StyledPrice,
} from "./CoinPriceInfo.styles";

export default function CoinPriceInfo(props) {
  const { currency, data, increase } = props;
  console.log(data.marketData.priceChangePercentage24H);
  return (
    !isEmpty(data) && (
      <StyledContainer>
        <StyledPrice>
          {formatCurrency(data.marketData.currentPrice[currency], currency)}
          <StyledIncrease increase={increase}>
            {increase ? <CaretUpOutlined /> : <CaretDownOutlined />}
            {data.marketData.priceChangePercentage24H ? (
              `${data.marketData.priceChangePercentage24H.toFixed(2)}%`
            ) : (
              <small>unavailable</small>
            )}
          </StyledIncrease>
        </StyledPrice>
        <p>
          <strong>Profit: </strong>
          <StyledIncrease increase={increase}>
            {data.marketData.priceChangePercentage24H ? (
              formatCurrency(
                data.marketData.priceChange24HInCurrency[currency],
                currency
              )
            ) : (
              <small>unavailable</small>
            )}
          </StyledIncrease>
        </p>
        <StyledLayerIcon src={layers} />
        <StyledAllTimeContainer>
          <StyledIncrease increase={true}>
            <CaretUpOutlined />
          </StyledIncrease>
          <StyledAllTimeInfo>
            <div>
              <strong>All Time High: </strong>
              {formatCurrency(data.marketData.ath[currency], currency)}
            </div>
            <div>{formatLongDate(data.marketData.athDate[currency])}</div>
          </StyledAllTimeInfo>
        </StyledAllTimeContainer>
        <StyledAllTimeContainer>
          <StyledIncrease increase={false}>
            <CaretDownOutlined />
          </StyledIncrease>
          <StyledAllTimeInfo>
            <div>
              <strong>All Time Low: </strong>
              {formatCurrency(data.marketData.atl[currency], currency)}
            </div>
            <div>{formatLongDate(data.marketData.atlDate[currency])}</div>
          </StyledAllTimeInfo>
        </StyledAllTimeContainer>
      </StyledContainer>
    )
  );
}
