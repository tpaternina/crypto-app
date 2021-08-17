import React from "react";
import { connect } from "react-redux";
import {
  CoinLogo,
  IncreaseArrow,
  StyledCoinName,
  StyledLink,
  StyledPercentage,
} from "./CoinInfo.styles";
import { increaseArrow, decreaseArrow } from "assets";
import { Chart, MarketInfo } from "components";
import { TableCol, TableRow } from "styled";

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
    <TableRow>
      <TableCol rank={true} xs={4} sm={4} md={3} lg={3} xl={2} xxl={2}>
        <StyledLink
          key={coin}
          to={`/coins/${coin.id}?currency=${currency}`}
          title={`More about ${coin.name}`}
        >
          {coin.marketCapRank}
        </StyledLink>
      </TableCol>
      <TableCol xs={6} sm={4} md={4} lg={4} xl={4} xxl={4}>
        <StyledLink
          key={coin}
          to={`/coins/${coin.id}?currency=${currency}`}
          title={`More about ${coin.name}`}
        >
          <StyledCoinName>
            <CoinLogo src={coin.image} alt={coin.name} />
            {coin.name} ({coin.symbol.toUpperCase()})
          </StyledCoinName>
        </StyledLink>
      </TableCol>
      <TableCol xs={6} sm={4} md={3} lg={3} xl={2} xxl={2}>
        {coin.currentPrice.toLocaleString("en-UK", {
          style: "currency",
          currency: currency.toUpperCase(),
          maximumFractionDigits: 2,
        })}
      </TableCol>
      <TableCol xs={4} sm={4} md={2} lg={2} xl={2} xxl={2}>
        <StyledPercentage increase={increase1h}>
          <IncreaseArrow src={increase1h ? increaseArrow : decreaseArrow} />
          {coin.priceChangePercentage1HInCurrency &&
            Math.abs(coin.priceChangePercentage1HInCurrency.toFixed(2))}
          %
        </StyledPercentage>
      </TableCol>
      <TableCol xs={4} sm={4} md={2} lg={2} xl={2} xxl={2}>
        <StyledPercentage increase={increase24h}>
          <IncreaseArrow src={increase24h ? increaseArrow : decreaseArrow} />
          {coin.priceChangePercentage24HInCurrency &&
            Math.abs(coin.priceChangePercentage24HInCurrency.toFixed(2))}
          %
        </StyledPercentage>
      </TableCol>
      <TableCol xs={0} sm={4} md={2} lg={2} xl={2} xxl={2}>
        <StyledPercentage increase={increase7d}>
          <IncreaseArrow src={increase7d ? increaseArrow : decreaseArrow} />
          {coin.priceChangePercentage7DInCurrency &&
            Math.abs(coin.priceChangePercentage7DInCurrency.toFixed(2))}
          %
        </StyledPercentage>
      </TableCol>
      <TableCol xs={0} sm={0} md={4} lg={4} xl={3} xxl={3}>
        <MarketInfo
          numerator={coin.totalVolume}
          denominator={coin.marketCap}
          currency={currency}
        />
      </TableCol>
      <TableCol xs={0} sm={0} md={4} lg={4} xl={3} xxl={3}>
        <MarketInfo
          numerator={coin.circulatingSupply}
          denominator={coin.totalSupply}
          currency={currency}
        />
      </TableCol>
      <TableCol xs={0} sm={0} md={0} lg={0} xl={4} xxl={4}>
        <Chart increase={increase7d} data={price} />
      </TableCol>
    </TableRow>
  );
}

const mapStateToProps = (state) => ({
  currency: state.app.currency,
});

export default connect(mapStateToProps)(CoinInfo);
