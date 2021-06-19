import axios from "axios";
import React from "react";
import { default as _ } from "lodash";
import { CoinTable } from "./Coins.styles";
import CoinOverview from "components/CoinOverview";

export default class Coins extends React.Component {
  state = {
    isLoading: false,
    hasError: false,
    coinList: [],
    perPage: 10,
    page: 1,
    order: "market_cap_desc",
  };

  getCoins = async () => {
    const { perPage, page, order } = this.state;
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(`
      https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.props.currency}&order=${order}&per_page=${perPage}&page=${page}&price_change_percentage=1h%2C24h%2C7d
      `);
      this.setState({ coinList: data, isLoading: false, hasError: false });
    } catch (err) {
      this.setState({ isLoading: false, hasError: err });
    }
  };

  componentDidMount() {
    this.getCoins();
  }

  render() {
    const { isLoading, hasError } = this.state;
    const hasResponse =
      !_.isEmpty(this.state.coinList) && !isLoading && !hasError;
    return (
      hasResponse && (
        <CoinTable>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>1h</th>
              <th>24h</th>
              <th>7d</th>
              <th>24h volume / Market Cap</th>
              <th>Circulating / Total Supply</th>
              <th>Last 7d</th>
            </tr>
          </thead>
          <tbody>
            {this.state.coinList.map((coin) => (
              <CoinOverview coin={coin} currency={this.props.currency} />
            ))}
          </tbody>
        </CoinTable>
      )
    );
  }
}
