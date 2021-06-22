import React from "react";
import axios from "axios";
import { default as _ } from "lodash";
import queryString from "query-string";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Coins } from "components";
import { CoinTable, StyledTitle } from "./Home.styles";

class TableHeader extends React.Component {
  // HANDLE CLICKING ON OTHER COMPONENT AND RESETTING DESCENDING ORDER
  state = {
    descending: true,
  };

  toggleOrder = () => {
    // toggle descending order
    this.setState({ descending: !this.state.descending });
    this.props.toggleOrder(this.props.sortBy, !this.state.descending);
  };

  render() {
    return (
      <span onClick={this.toggleOrder}>
        {this.props.text}{" "}
        {this.state.descending ? (
          <DownOutlined style={{ fontSize: "0.75rem", fontWeight: "bold" }} />
        ) : (
          <UpOutlined style={{ fontSize: "0.75rem", fontWeight: "bold" }} />
        )}
      </span>
    );
  }
}
export default class Home extends React.Component {
  state = {
    isLoading: false,
    hasError: false,
    coinList: [],
    perPage: 10,
    page: 1,
    queryOrder: "market_cap_desc",
    sortBy: "market_cap",
    descending: true, // if true, sort in descending order, if false sort in ascending order
  };

  getCoins = async () => {
    const { perPage, page, queryOrder } = this.state;
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(`
      https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.props.currency}&order=${queryOrder}&per_page=${perPage}&page=${page}&price_change_percentage=1h%2C24h%2C7d
      `);
      this.setState({ coinList: data, isLoading: false, hasError: false });
    } catch (err) {
      this.setState({ isLoading: false, hasError: err });
    }
  };

  sortCoins = (item1, item2, key, descending) => {
    if (item1[key] < item2[key]) return descending ? 1 : -1;
    if (item1[key] > item2[key]) return descending ? -1 : 1;
    return 0;
  };

  toggleOrder = (sortBy) => {
    const descending = !this.state.descending;
    this.setState({ sortBy, descending });
    const query = queryString.stringify({ sortBy, descending });
    this.props.history.push(`/?${query}`);
  };

  componentDidMount() {
    if (this.props.location.search) {
      const parsed = queryString.parse(this.props.location.search, {
        parseBooleans: true,
      });
      this.setState(parsed);
      this.getCoins();
    } else {
      const { sortBy, descending } = this.state;
      const query = queryString.stringify({ sortBy, descending });
      this.props.history.push(`/?${query}`);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      this.getCoins();
    }
    if (
      prevState.sortBy !== this.state.sortBy ||
      prevState.descending !== this.state.descending
    ) {
      this.getCoins();
    }
  }

  render() {
    const { coinList, isLoading, hasError } = this.state;
    const hasResponse = !_.isEmpty(coinList) && !isLoading && !hasError;
    return (
      <>
        <StyledTitle>Market Overview</StyledTitle>
        <CoinTable>
          <thead>
            <tr>
              <th>#</th>
              <th>
                <TableHeader
                  text="Name"
                  sortBy="id"
                  toggleOrder={this.toggleOrder}
                />
              </th>
              <th>
                <TableHeader
                  text="Price"
                  sortBy="current_price"
                  toggleOrder={this.toggleOrder}
                />
              </th>
              <th>
                <TableHeader
                  text="1h"
                  sortBy="price_change_percentage_1h_in_currency"
                  toggleOrder={this.toggleOrder}
                />
              </th>
              <th>
                <TableHeader
                  text="24h"
                  sortBy="price_change_percentage_24h_in_currency"
                  toggleOrder={this.toggleOrder}
                />
              </th>
              <th>
                <TableHeader
                  text="7d"
                  sortBy="price_change_percentage_7d_in_currency"
                  toggleOrder={this.toggleOrder}
                />
              </th>
              <th>
                <TableHeader
                  text="24h Volume"
                  sortBy="total_volume"
                  toggleOrder={this.toggleOrder}
                />{" "}
                /{" "}
                <TableHeader
                  text="Market Cap"
                  sortBy="market_cap"
                  toggleOrder={this.toggleOrder}
                />
              </th>
              <th>
                <TableHeader
                  text="Circulating"
                  sortBy="circulating_supply"
                  toggleOrder={this.toggleOrder}
                />{" "}
                /{" "}
                <TableHeader
                  text="Total Supply"
                  sortBy="total_supply"
                  toggleOrder={this.toggleOrder}
                />
              </th>
              <th>Last 7d</th>
            </tr>
          </thead>
          {hasResponse && (
            <Coins
              currency={this.props.currency}
              coinList={this.state.coinList.sort((item1, item2) =>
                this.sortCoins(
                  item1,
                  item2,
                  this.state.sortBy,
                  this.state.descending
                )
              )}
            />
          )}
        </CoinTable>
      </>
    );
  }
}
