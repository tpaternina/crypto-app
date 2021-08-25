import React from "react";
import { connect } from "react-redux";
import { Chart, MarketInfo } from "components";
import {
  CoinRowName,
  IncreaseArrow,
  DecreaseArrow,
  IncreaseText,
  StyledRowLink,
  TableRowLogo,
  TableCol,
  TableRow,
} from "styles";

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
      <TableCol xs={3} sm={4} md={3} lg={3} xl={2} xxl={2} rank>
        <StyledRowLink
          key={coin}
          to={`/coins/${coin.id}?currency=${currency}`}
          title={`More about ${coin.name}`}
        >
          {coin.marketCapRank}
        </StyledRowLink>
      </TableCol>
      <TableCol xs={6} sm={4} md={6} lg={4} xl={4} xxl={4}>
        <StyledRowLink
          key={coin}
          to={`/coins/${coin.id}?currency=${currency}`}
          title={`More about ${coin.name}`}
        >
          <CoinRowName>
            <TableRowLogo src={coin.image} alt={coin.name} />
            {coin.name} ({coin.symbol.toUpperCase()})
          </CoinRowName>
        </StyledRowLink>
      </TableCol>
      <TableCol xs={6} sm={4} md={3} lg={3} xl={2} xxl={2}>
        {coin.currentPrice.toLocaleString("en-UK", {
          style: "currency",
          currency: currency.toUpperCase(),
          maximumFractionDigits: 2,
        })}
      </TableCol>
      <TableCol xs={4} sm={4} md={2} lg={2} xl={2} xxl={2}>
        <IncreaseText increase={increase1h}>
          {increase1h ? <IncreaseArrow /> : <DecreaseArrow />}
          {coin.priceChangePercentage1HInCurrency &&
            Math.abs(coin.priceChangePercentage1HInCurrency.toFixed(2))}
          %
        </IncreaseText>
      </TableCol>
      <TableCol xs={5} sm={4} md={2} lg={2} xl={2} xxl={2}>
        <IncreaseText increase={increase24h}>
          {increase24h ? <IncreaseArrow /> : <DecreaseArrow />}
          {coin.priceChangePercentage24HInCurrency &&
            Math.abs(coin.priceChangePercentage24HInCurrency.toFixed(2))}
          %
        </IncreaseText>
      </TableCol>
      <TableCol xs={0} sm={4} md={2} lg={2} xl={2} xxl={2}>
        <IncreaseText increase={increase7d}>
          {increase7d ? <IncreaseArrow /> : <DecreaseArrow />}
          {coin.priceChangePercentage7DInCurrency &&
            Math.abs(coin.priceChangePercentage7DInCurrency.toFixed(2))}
          %
        </IncreaseText>
      </TableCol>
      <TableCol xs={0} sm={0} md={6} lg={4} xl={3} xxl={3}>
        <MarketInfo
          numerator={coin.totalVolume}
          denominator={coin.marketCap}
          currency={currency}
        />
      </TableCol>
      <TableCol xs={0} sm={0} md={0} lg={4} xl={3} xxl={3}>
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
