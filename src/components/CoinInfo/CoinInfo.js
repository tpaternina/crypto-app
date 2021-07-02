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

    // Whether the price increased or decreased
    const increase1h = coin.price_change_percentage_1h_in_currency > 0;
    const increase24h = coin.price_change_percentage_24h_in_currency > 0;
    const increase7d = coin.price_change_percentage_7d_in_currency > 0;

    // The 7-day price change
    const { price } = coin.sparkline_in_7d;

    return (
      <StyledRow key={coin}>
        <StyledCol span={1}>{coin.market_cap_rank}</StyledCol>
        <StyledCol span={3}>
          <StyledCoinName>
            <CoinLogo src={coin.image} alt={coin.name} />
            {coin.name} ({coin.symbol.toUpperCase()})
          </StyledCoinName>
        </StyledCol>
        <StyledCol span={2}>
          {coin.current_price.toLocaleString("en-UK", {
            style: "currency",
            currency: this.props.currency.toUpperCase(),
            maximumFractionDigits: 2,
          })}
        </StyledCol>
        <StyledCol span={2}>
          <StyledPercentage increase={increase1h}>
            <IncreaseArrow src={increase1h ? increaseArrow : decreaseArrow} />
            {coin.price_change_percentage_1h_in_currency &&
              Math.abs(coin.price_change_percentage_1h_in_currency.toFixed(2))}
            %
          </StyledPercentage>
        </StyledCol>
        <StyledCol span={2}>
          <StyledPercentage increase={increase24h}>
            <IncreaseArrow src={increase24h ? increaseArrow : decreaseArrow} />
            {coin.price_change_percentage_24h &&
              Math.abs(coin.price_change_percentage_24h.toFixed(2))}
            %
          </StyledPercentage>
        </StyledCol>
        <StyledCol span={2}>
          <StyledPercentage increase={increase7d}>
            <IncreaseArrow src={increase7d ? increaseArrow : decreaseArrow} />
            {coin.price_change_percentage_7d_in_currency &&
              Math.abs(coin.price_change_percentage_7d_in_currency.toFixed(2))}
            %
          </StyledPercentage>
        </StyledCol>
        <StyledCol span={4}>
          <MarketInfo
            logoUrl={coin.image}
            numerator={coin.total_volume}
            denominator={coin.market_cap}
            currency={this.props.currency}
          />
        </StyledCol>
        <StyledCol span={4}>
          <MarketInfo
            logoUrl={coin.image}
            numerator={coin.circulating_supply}
            denominator={coin.total_supply}
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
