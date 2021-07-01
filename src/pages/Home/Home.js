import React from "react";
import axios from "axios";
import { isEmpty } from "lodash";
import queryString from "query-string";
import LoadingBar from "react-top-loading-bar";
import { ChartOverview, Coins, TableHeader } from "components";
import {
  ChartCol,
  ChartContainer,
  ChartRow,
  Container,
  StyledCol,
  StyledLoading,
  StyledRow,
  StyledTitle,
} from "./Home.styles";
import { keysToSnakeCase } from "utils";

export default class Home extends React.Component {
  state = {
    isLoading: false,
    hasError: false,
    coinList: [],
    pageConfig: {
      sortBy: "marketCap",
      descending: true, // if true, sort in descending order, if false sort in ascending order
    },
    queryConfig: {
      vsCurrency: this.props.currency,
      perPage: 10,
      page: 1,
    },
  };

  loadingBar = React.createRef();

  getCoins = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      this.loadingBar.current.continuousStart();

      const query = {
        ...keysToSnakeCase(this.state.queryConfig),
        price_change_percentage: "1h,24h,7d",
        sparkline: true,
      };

      console.log(
        queryString.stringifyUrl({
          url: process.env.REACT_APP_COINS_ENDPOINT,
          query: query,
        })
      );

      const { data } = await axios(
        queryString.stringifyUrl({
          url: process.env.REACT_APP_COINS_ENDPOINT,
          query: query,
        })
      );

      keysToSnakeCase(this.state.queryConfig);
      this.setState({
        coinList: data,
        isLoading: false,
        hasError: false,
      });
      this.loadingBar.current.complete();
    } catch (err) {
      this.setState({
        isLoading: false,
        hasError: true,
      });
      this.loadingBar.current.complete();
      console.log(err);
    }
  };

  sortCoins = (item1, item2) => {
    const { sortBy, descending } = this.state.pageConfig;
    if (item1[sortBy] < item2[sortBy]) return descending ? 1 : -1;
    if (item1[sortBy] > item2[sortBy]) return descending ? -1 : 1;
    return 0;
  };

  toggleOrder = (sortBy, descending) => {
    this.setState({
      pageConfig: { ...this.state.pageConfig, sortBy, descending },
    });
    const query = queryString.stringify(this.state.pageConfig);
    this.props.history.push(`/?${query}`);
  };

  componentDidMount() {
    if (this.props.location.search) {
      const parsed = queryString.parse(this.props.location.search, {
        parseBooleans: true,
      });
      this.setState({
        pageConfig: { ...this.state.pageConfig, ...parsed },
      });
      this.getCoins();
    } else {
      const query = queryString.stringify({
        ...this.state.pageConfig,
        currency: this.props.currency,
      });
      this.props.history.push(`/?${query}`);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      const parsed = queryString.parse(this.props.location.search, {
        parseBooleans: true,
      });
      this.setState({
        pageConfig: { ...this.state.pageConfig, ...parsed },
      });
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

    // Use ref for Loading bar component

    return (
      <>
        {isLoading && (
          <ChartRow>
            <ChartCol span={12}>
              <ChartContainer>
                {" "}
                <StyledLoading />{" "}
              </ChartContainer>{" "}
            </ChartCol>{" "}
            <ChartCol span={12}>
              <ChartContainer>
                {" "}
                <StyledLoading />{" "}
              </ChartContainer>{" "}
            </ChartCol>{" "}
          </ChartRow>
        )}{" "}
        <StyledTitle> Market Overview </StyledTitle>{" "}
        <LoadingBar ref={this.loadingBar} />{" "}
        {hasResponse && (
          <ChartOverview
            topCoin={this.state.coinList[0]}
            currency={this.props.currency}
          />
        )}
        <Container>
          <StyledRow>
            <StyledCol span={1}>
              <TableHeader
                text="#"
                sortBy="market_cap_rank"
                toggleOrder={this.toggleOrder}
              />{" "}
            </StyledCol>{" "}
            <StyledCol span={3}>
              <TableHeader
                text="Name"
                sortBy="id"
                toggleOrder={this.toggleOrder}
              />{" "}
            </StyledCol>{" "}
            <StyledCol span={2}>
              <TableHeader
                text="Price"
                sortBy="current_price"
                toggleOrder={this.toggleOrder}
              />{" "}
            </StyledCol>{" "}
            <StyledCol span={2}>
              <TableHeader
                text="1h"
                sortBy="price_change_percentage_1h_in_currency"
                toggleOrder={this.toggleOrder}
              />{" "}
            </StyledCol>{" "}
            <StyledCol span={2}>
              <TableHeader
                text="24h"
                sortBy="price_change_percentage_24h_in_currency"
                toggleOrder={this.toggleOrder}
              />{" "}
            </StyledCol>{" "}
            <StyledCol span={2}>
              <TableHeader
                text="7d"
                sortBy="price_change_percentage_7d_in_currency"
                toggleOrder={this.toggleOrder}
              />{" "}
            </StyledCol>{" "}
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
              />{" "}
            </StyledCol>{" "}
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
              />{" "}
            </StyledCol>{" "}
            <StyledCol span={4}> Last 7 d </StyledCol>{" "}
          </StyledRow>{" "}
          {hasResponse && (
            <Coins
              currency={this.props.currency}
              coinList={this.state.coinList.sort(this.sortCoins)}
            />
          )}{" "}
        </Container>{" "}
      </>
    );
  }
}
