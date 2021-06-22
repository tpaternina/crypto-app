import React from "react";
import { CoinInfo } from "components";

export default class Coins extends React.Component {
  render() {
    return (
      <>
        {this.props.coinList.map((coin) => (
          <CoinInfo key={coin.id} coin={coin} currency={this.props.currency} />
        ))}
      </>
    );
  }
}
