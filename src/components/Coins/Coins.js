import React from "react";
import { connect } from "react-redux";
import { CoinInfo } from "components";

const sortCoins = (item1, item2, sortBy, descending) => {
  if (item1[sortBy] < item2[sortBy]) return descending ? 1 : -1;
  if (item1[sortBy] > item2[sortBy]) return descending ? -1 : 1;
  return 0;
};

const Coins = (props) => {
  const { currency, coinList, sortBy, descending } = props;
  return [...coinList]
    .sort((item1, item2) => sortCoins(item1, item2, sortBy, descending))
    .map((coin) => <CoinInfo key={coin.id} coin={coin} currency={currency} />);
};

const mapStateToProps = (state) => ({
  currency: state.app.currency,
  sortBy: state.home.pageConfig.sortBy,
  descending: state.home.pageConfig.descending,
});

export default connect(mapStateToProps)(Coins);
