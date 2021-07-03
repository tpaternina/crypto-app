import React from "react";
import {
  CoinLogo,
  IncreaseArrow,
  StyledCoinName,
  StyledCol,
  StyledPercentage,
  StyledRow,
} from "./CoinInfo.styles";
import { increaseArrow, decreaseArrow } from "assets";
import { Chart, ColorBar, MarketInfo } from "components";

export default class CoinInfo extends React.Component {
  render() {
    const { coin } = this.props;
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
            currency: this.props.currency.toUpperCase(),
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
            logoUrl={coin.image}
            numerator={coin.totalVolume}
            denominator={coin.marketCap}
            currency={this.props.currency}
          />
        </StyledCol>
        <StyledCol span={4}>
          <MarketInfo
            logoUrl={coin.image}
            numerator={coin.circulatingSupply}
            denominator={coin.totalSupply}
            currency={this.props.currency}
          />
        </StyledCol>
        <StyledCol span={4}>
          <Chart increase={increase7d} data={price} />
        </StyledCol>
      </StyledRow>
    );
  }
}
