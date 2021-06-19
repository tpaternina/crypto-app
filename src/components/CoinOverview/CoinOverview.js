import React from "react";
import { formatLongNumber } from "utils";
import {
  CoinLogo,
  IncreaseArrow,
  MarketInfo,
  MarketInfoRow,
  StyledCoinName,
  StyledPercentage,
} from "./CoinOverview.styles";
import { increaseArrow, decreaseArrow } from "assets";

export default class CoinOverview extends React.Component {
  render() {
    const { coin } = this.props;

    // Whether the price increased or decreased
    const increase1h = coin.price_change_percentage_1h_in_currency > 0;
    const increase24h = coin.price_change_percentage_24h_in_currency > 0;
    const increase7d = coin.price_change_percentage_7d_in_currency > 0;

    return (
      <tr key={coin}>
        <td>{coin.market_cap_rank}</td>
        <td>
          <StyledCoinName>
            <CoinLogo src={coin.image} alt={coin.name} />
            {coin.name} ({coin.symbol.toUpperCase()})
          </StyledCoinName>
        </td>
        <td>
          {coin.current_price.toLocaleString("en-UK", {
            style: "currency",
            currency: this.props.currency.toUpperCase(),
            maximumFractionDigits: 2,
          })}
        </td>
        <td>
          <StyledPercentage increase={increase1h}>
            <IncreaseArrow src={increase1h ? increaseArrow : decreaseArrow} />
            {coin.price_change_percentage_1h_in_currency &&
              Math.abs(coin.price_change_percentage_1h_in_currency.toFixed(2))}
            %
          </StyledPercentage>
        </td>
        <td>
          <StyledPercentage increase={increase24h}>
            <IncreaseArrow src={increase24h ? increaseArrow : decreaseArrow} />
            {coin.price_change_percentage_24h &&
              Math.abs(coin.price_change_percentage_24h.toFixed(2))}
            %
          </StyledPercentage>
        </td>
        <td>
          <StyledPercentage increase={increase7d}>
            <IncreaseArrow src={increase7d ? increaseArrow : decreaseArrow} />
            {coin.price_change_percentage_7d_in_currency &&
              Math.abs(coin.price_change_percentage_7d_in_currency.toFixed(2))}
            %
          </StyledPercentage>
        </td>
        <td>
          <MarketInfo>
            <MarketInfoRow>
              <div>
                {formatLongNumber(coin.total_volume, this.props.currency)}
              </div>
              <div>
                {formatLongNumber(coin.market_cap, this.props.currency)}
              </div>
            </MarketInfoRow>
            <MarketInfoRow>
              <small>fraction bar with pretty colors</small>
            </MarketInfoRow>
          </MarketInfo>
        </td>
        <td>
          <MarketInfo>
            <MarketInfoRow>
              <div>
                {formatLongNumber(coin.circulating_supply, this.props.currency)}
              </div>
              <div>
                {formatLongNumber(coin.total_supply, this.props.currency)}
              </div>
            </MarketInfoRow>
            <MarketInfoRow>
              <small>fraction bar with pretty colors</small>
            </MarketInfoRow>
          </MarketInfo>
        </td>
        <td>Chart coming soon...</td>
      </tr>
    );
  }
}
