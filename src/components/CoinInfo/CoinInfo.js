import React from "react";
import { usePalette } from "react-palette";
import { formatLongNumber } from "utils";
import {
  CoinLogo,
  IncreaseArrow,
  MarketDiv,
  MarketInfoRow,
  StyledCoinName,
  StyledInfo,
  StyledPercentage,
} from "./CoinInfo.styles";
import { increaseArrow, decreaseArrow } from "assets";
import { ColorBar } from "components";

function MarketInfo(props) {
  const { numerator, denominator, logoUrl, currency } = props;
  const { data } = usePalette(logoUrl.split("/").splice(3).join("/"));

  return (
    <StyledInfo>
      <MarketInfoRow>
        <MarketDiv color={data.vibrant}>
          {formatLongNumber(numerator, currency)}
        </MarketDiv>
        <MarketDiv color={data.lightMuted}>
          {formatLongNumber(denominator, currency)}
        </MarketDiv>
      </MarketInfoRow>
      <MarketInfoRow>
        <ColorBar
          numerator={numerator}
          denominator={denominator}
          numeratorColor={data.vibrant}
          denominatorColor={data.lightMuted}
        />
      </MarketInfoRow>
    </StyledInfo>
  );
}

export default class CoinInfo extends React.Component {
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
          <MarketInfo
            logoUrl={coin.image}
            numerator={coin.total_volume}
            denominator={coin.market_cap}
            currency={this.props.currency}
          />
        </td>
        <td>
        <MarketInfo
            logoUrl={coin.image}
            numerator={coin.circulating_supply}
            denominator={coin.total_supply}
            currency={this.props.currency}
          />
        </td>
        <td>Chart coming soon...</td>
      </tr>
    );
  }
}
