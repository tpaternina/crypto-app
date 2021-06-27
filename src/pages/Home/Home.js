import React from "react";
import axios from "axios";
import { isEmpty } from "lodash";
import queryString from "query-string";
import { Coins, TableHeader } from "components";
import { Container, StyledCol, StyledRow, StyledTitle } from "./Home.styles";

export default class Home extends React.Component {
  state = {
    isLoading: false,
    hasError: false,
    coinList: [],
    pageConfig: {
      perPage: 10,
      page: 1,
      queryOrder: "market_cap_desc",
      sortBy: "market_cap",
      descending: true, // if true, sort in descending order, if false sort in ascending order
    },
  };

  getCoins = async () => {
    const { perPage, page, queryOrder } = this.state.pageConfig;
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(`
      https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.props.currency}&order=${queryOrder}&per_page=${perPage}&page=${page}&price_change_percentage=1h%2C24h%2C7d&sparkline=true
      `);
      this.setState({ coinList: data, isLoading: false, hasError: false });
    } catch (err) {
      this.setState({ isLoading: false, hasError: err });
    }
  };

  sortCoins = (item1, item2) => {
    const { sortBy, descending } = this.state.pageConfig;
    if (item1[sortBy] < item2[sortBy]) return descending ? 1 : -1;
    if (item1[sortBy] > item2[sortBy]) return descending ? -1 : 1;
    return 0;
  };

  toggleOrder = (sortBy, descending) => {
    this.setState({ pageConfig: { ...this.state.pageConfig, sortBy, descending } });
    const query = queryString.stringify(this.state.pageConfig);
    this.props.history.push(`/?${query}`);
  };

  componentDidMount() {
    if (this.props.location.search) {
      const parsed = queryString.parse(this.props.location.search, {
        parseBooleans: true,
      });
      this.setState({ pageConfig: {...this.state.pageConfig, ...parsed} });
      this.getCoins();
    } else {
      const query = queryString.stringify(this.state.pageConfig);
      this.props.history.push(`/?${query}`);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      const parsed = queryString.parse(this.props.location.search, {
        parseBooleans: true,
      });
      this.setState({ pageConfig: {...this.state.pageConfig, ...parsed} });
      this.getCoins();
    }
    if (
      JSON.stringify(prevState.pageConfig) !==
      JSON.stringify(this.state.pageConfig)
    ) {
      this.getCoins();
    }
  }

  render() {
    const { coinList, isLoading, hasError } = this.state;
    const hasResponse = !isEmpty(coinList) && !isLoading && !hasError;
    return (
      <>
        <StyledTitle>Market Overview</StyledTitle>
        <Container>
          <StyledRow>
            <StyledCol span={1}>
              <TableHeader
                text="#"
                sortBy="market_cap_rank"
                toggleOrder={this.toggleOrder}
              />
            </StyledCol>
            <StyledCol span={3}>
              <TableHeader
                text="Name"
                sortBy="id"
                toggleOrder={this.toggleOrder}
              />
            </StyledCol>
            <StyledCol span={2}>
              <TableHeader
                text="Price"
                sortBy="current_price"
                toggleOrder={this.toggleOrder}
              />
            </StyledCol>
            <StyledCol span={2}>
              <TableHeader
                text="1h"
                sortBy="price_change_percentage_1h_in_currency"
                toggleOrder={this.toggleOrder}
              />
            </StyledCol>
            <StyledCol span={2}>
              <TableHeader
                text="24h"
                sortBy="price_change_percentage_24h_in_currency"
                toggleOrder={this.toggleOrder}
              />
            </StyledCol>
            <StyledCol span={2}>
              <TableHeader
                text="7d"
                sortBy="price_change_percentage_7d_in_currency"
                toggleOrder={this.toggleOrder}
              />
            </StyledCol>
            <StyledCol span={4}>
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
            </StyledCol>
            <StyledCol span={4}>
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
            </StyledCol>
            <StyledCol span={4}>Last 7d</StyledCol>
          </StyledRow>
          {hasResponse && (
            <Coins
              currency={this.props.currency}
              coinList={this.state.coinList.sort(this.sortCoins)}
            />
          )}
        </Container>
      </>
    );
  }
}
