import React from "react";
import { connect } from "react-redux";
import { CoinInfo } from "components";

const Coins = (props) => {
  const { currency, coinList } = props;
  return (
    <>
      {coinList.map((coin) => (
        <CoinInfo key={coin.id} coin={coin} currency={currency} />
      ))}
    </>
  );
};

const mapStateToProps = (state) => ({
  currency: state.app.currency,
  coinList: state.home.coinList,
});

export default connect(mapStateToProps)(Coins);
