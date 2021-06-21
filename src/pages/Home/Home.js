import React from "react";
import axios from "axios";
import { default as _ } from "lodash";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Coins } from "components";
import { CoinTable, StyledTitle } from "./Home.styles";

class TableHeader extends React.Component {
  state = {
    descending: true,
  };

  toggleOrder = () => {
    // toggle descending order
    this.setState({ descending: !this.state.descending });
    this.props.toggleOrder(this.props.colName, !this.state.descending);
  };

  render() {
    return (
      <span onClick={this.toggleOrder}>
        {this.props.text}
        {this.state.descending ? <DownOutlined /> : <UpOutlined />}
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
    order: "market_cap",
    descending: -1, // if 1, descending order, if -1, ascending order
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
    if (item1[key] < item2[key]) return -1 * descending;
    if (item1[key] > item2[key]) return 1 * descending;
    return 0;
  };

  toggleOrder = (colName, descending) => {
    const newOrder = colName;
    let newDescending;
    if (newOrder !== this.state.order) {
      // if changed the column, reset descending value
      newDescending = -1;
    } else {
      newDescending = this.state.descending * -1;
    }
    this.setState({ order: newOrder, descending: newDescending });
  };

  componentDidMount() {
    this.getCoins();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.order !== this.state.order) {
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
                  colName="id"
                  toggleOrder={this.toggleOrder}
                />
              </th>
              <th>
                <TableHeader
                  text="Price"
                  colName="current_price"
                  toggleOrder={this.toggleOrder}
                />
              </th>
              <th>
                <TableHeader
                  text="1h"
                  colName="price_change_percentage_1h_in_currency"
                  toggleOrder={this.toggleOrder}
                />
              </th>
              <th>
                <TableHeader
                  text="24h"
                  colName="price_change_percentage_24h_in_currency"
                  toggleOrder={this.toggleOrder}
                />
              </th>
              <th><TableHeader
                  text="7d"
                  colName="price_change_percentage_7d_in_currency"
                  toggleOrder={this.toggleOrder}
                /></th>
              <th>24h volume / Market Cap</th>
              <th>Circulating / Total Supply</th>
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
                  this.state.order,
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
