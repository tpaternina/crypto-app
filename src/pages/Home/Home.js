import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import queryString from "query-string";
import LoadingBar from "react-top-loading-bar";
import { fetchAllCoins } from "store/home/homeActions"
import { ChartOverview, Coins, LoadingCoins, TableHeader } from "components";
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
import { keysToCamelCase, keysToSnakeCase } from "utils";

class Home extends React.Component {
  state = {
    isLoading: false,
    hasError: false,
    coinList: [],
    pageConfig: {
      sortBy: "marketCapRank",
      descending: false, // if true, sort in descending order, if false sort in ascending order
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

      const query = {
        ...keysToSnakeCase(this.state.queryConfig),
        price_change_percentage: "1h,24h,7d",
        sparkline: true,
      };

      let { data } = await axios(
        queryString.stringifyUrl({
          url: process.env.REACT_APP_COINS_ENDPOINT,
          query: query,
        })
      );

      // Convert keys from API to camelCase
      data = data.map(keysToCamelCase);

      this.setState({
        coinList: data,
        isLoading: false,
        hasError: false,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        hasError: true,
      });
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
      this.props.fetchAllCoins();
    } else {
      const query = queryString.stringify({
        ...this.state.pageConfig,
        currency: this.props.currency,
      });
      this.props.history.push(`/?${query}`);
      this.props.fetchAllCoins();
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
    }
    if (
      JSON.stringify(prevState.pageConfig) !==
      JSON.stringify(this.state.pageConfig)
    ) {
      const query = queryString.stringify({
        ...this.state.pageConfig,
        currency: this.props.currency,
      });
      this.props.history.push(`/?${query}`);
    }
    if (prevState.isLoading !== this.state.isLoading && this.state.isLoading) {
      this.loadingBar.current.continuousStart();
    }
    if (prevState.isLoading !== this.state.isLoading && !this.state.isLoading) {
      this.loadingBar.current.complete();
    }
  }

  render() {
    const { coinList, isLoading, hasError } = this.props.home;
    const hasResponse = !isEmpty(coinList) && !isLoading && !hasError;

    return (
      <>
        {isLoading && (
          <ChartRow>
            <ChartCol span={11}>
              <ChartContainer>
                {" "}
                <StyledLoading />{" "}
              </ChartContainer>{" "}
            </ChartCol>{" "}
            <ChartCol span={11}>
              <ChartContainer>
                {" "}
                <StyledLoading />{" "}
              </ChartContainer>{" "}
            </ChartCol>{" "}
          </ChartRow>
        )}
        <LoadingBar ref={this.loadingBar} />{" "}
        {hasResponse && (
          <ChartOverview
            topCoin={this.state.coinList[0]}
            currency={this.props.currency}
          />
        )}
        <StyledTitle> Market Overview </StyledTitle>
        <Container>
          <StyledRow>
            <StyledCol span={1}>
              <TableHeader
                text="#"
                sortBy="marketCapRank"
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
                sortBy="currentPrice"
                toggleOrder={this.toggleOrder}
              />
            </StyledCol>
            <StyledCol span={2}>
              <TableHeader
                text="1h"
                sortBy="priceChangePercentage1HInCurrency"
                toggleOrder={this.toggleOrder}
              />
            </StyledCol>
            <StyledCol span={2}>
              <TableHeader
                text="24h"
                sortBy="priceChangePercentage24HInCurrency"
                toggleOrder={this.toggleOrder}
              />
            </StyledCol>
            <StyledCol span={2}>
              <TableHeader
                text="7d"
                sortBy="priceChangePercentage7DInCurrency"
                toggleOrder={this.toggleOrder}
              />
            </StyledCol>
            <StyledCol span={4}>
              <TableHeader
                text="24h Volume"
                sortBy="totalVolume"
                toggleOrder={this.toggleOrder}
              />{" "}
              /{" "}
              <TableHeader
                text="Market Cap"
                sortBy="marketCap"
                toggleOrder={this.toggleOrder}
              />{" "}
            </StyledCol>
            <StyledCol span={4}>
              <TableHeader
                text="Circulating"
                sortBy="circulatingSupply"
                toggleOrder={this.toggleOrder}
              />{" "}
              /{" "}
              <TableHeader
                text="Total Supply"
                sortBy="totalSupply"
                toggleOrder={this.toggleOrder}
              />{" "}
            </StyledCol>
            <StyledCol span={4}> Last 7 d </StyledCol>
          </StyledRow>
          {isLoading && <LoadingCoins />}
          {hasResponse && (
            <Coins
              currency={this.props.currency}
              coinList={coinList.sort(this.sortCoins)}
            />
          )}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  home: state.home,
});

const mapDispatchToProps = {
  fetchAllCoins
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
