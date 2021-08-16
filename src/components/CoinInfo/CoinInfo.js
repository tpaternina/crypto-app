import React from "react";
import { connect } from "react-redux";
import {
  CoinLogo,
  IncreaseArrow,
  StyledCoinName,
  StyledCol,
  StyledLink,
  StyledPercentage,
  StyledRow,
} from "./CoinInfo.styles";
import { increaseArrow, decreaseArrow } from "assets";
import { Chart, MarketInfo } from "components";

function CoinInfo(props) {

  const { coin, currency } = props;
  const {
    priceChangePercentage1HInCurrency,
    priceChangePercentage24HInCurrency,
    priceChangePercentage7DInCurrency,
  } = coin;

  // Whether the price increased or decreased
  const increase1h = priceChangePercentage1HInCurrency > 0;
  const increase24h = priceChangePercentage24HInCurrency > 0;
  const increase7d = priceChangePercentage7DInCurrency > 0;

  // The 7-day price change
  const { price } = coin.sparklineIn7D;

  return (
    <StyledLink
      to={`/coins/${coin.id}?currency=${currency}`}
      title={`More about ${coin.name}`}
    >
      <StyledRow key={coin}>
        <StyledCol span={1}>{coin.marketCapRank}</StyledCol>
        <StyledCol span={3}>
          <StyledCoinName>
            <CoinLogo src={coin.image} alt={coin.name} />
            {coin.name} ({coin.symbol.toUpperCase()})
          </StyledCoinName>
        </StyledCol>
        <StyledCol span={2}>
          {coin.currentPrice.toLocaleString("en-UK", {
            style: "currency",
            currency: currency.toUpperCase(),
            maximumFractionDigits: 2,
          })}
        </StyledCol>
        <StyledCol span={2}>
          <StyledPercentage increase={increase1h}>
            <IncreaseArrow src={increase1h ? increaseArrow : decreaseArrow} />
            {coin.priceChangePercentage1HInCurrency &&
              Math.abs(coin.priceChangePercentage1HInCurrency.toFixed(2))}
            %
          </StyledPercentage>
        </StyledCol>
        <StyledCol span={2}>
          <StyledPercentage increase={increase24h}>
            <IncreaseArrow src={increase24h ? increaseArrow : decreaseArrow} />
            {coin.priceChangePercentage24HInCurrency &&
              Math.abs(coin.priceChangePercentage24HInCurrency.toFixed(2))}
            %
          </StyledPercentage>
        </StyledCol>
        <StyledCol span={2}>
          <StyledPercentage increase={increase7d}>
            <IncreaseArrow src={increase7d ? increaseArrow : decreaseArrow} />
            {coin.priceChangePercentage7DInCurrency &&
              Math.abs(coin.priceChangePercentage7DInCurrency.toFixed(2))}
            %
          </StyledPercentage>
        </StyledCol>
        <StyledCol span={4}>
          <MarketInfo
            numerator={coin.totalVolume}
            denominator={coin.marketCap}
            currency={currency}
          />
        </StyledCol>
        <StyledCol span={4}>
          <MarketInfo
            numerator={coin.circulatingSupply}
            denominator={coin.totalSupply}
            currency={currency}
          />
        </StyledCol>
        <StyledCol span={4}>
          <Chart increase={increase7d} data={price} />
        </StyledCol>
      </StyledRow>
    </StyledLink>
  );
}

const mapStateToProps = (state) => ({
  currency: state.app.currency,
});

export default connect(mapStateToProps)(CoinInfo);
