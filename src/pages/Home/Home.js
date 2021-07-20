import React from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import queryString from "query-string";
import LoadingBar from "react-top-loading-bar";
import {
  fetchAllCoins,
  parseQueryString,
  toggleOrder,
} from "store/home/homeActions";
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

class Home extends React.Component {

  loadingBar = React.createRef();

  sortCoins = (item1, item2) => {
    const { sortBy, descending } = this.props.home.pageConfig;
    if (item1[sortBy] < item2[sortBy]) return descending ? 1 : -1;
    if (item1[sortBy] > item2[sortBy]) return descending ? -1 : 1;
    return 0;
  };

  componentDidMount() {
    if (this.props.location.search) {
      this.props.parseQueryString(this.props.location.search);
    } else {
      const query = queryString.stringify({
        ...this.props.home.pageConfig,
        currency: this.props.currency,
      });
      this.props.history.push(`/?${query}`);
    }
    this.props.fetchAllCoins();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      this.props.parseQueryString(this.props.location.search);
    }
    if (
      JSON.stringify(prevProps.home.pageConfig) !==
      JSON.stringify(this.props.home.pageConfig)
    ) {
      const query = queryString.stringify({
        ...this.props.home.pageConfig,
        currency: this.props.currency,
      });
      this.props.history.push(`/?${query}`);
    }
    if (
      prevProps.home.isLoading !== this.props.home.isLoading &&
      this.props.home.isLoading
    ) {
      this.loadingBar.current.continuousStart();
    }
    if (
      prevProps.home.isLoading !== this.props.home.isLoading &&
      !this.props.home.isLoading
    ) {
      this.loadingBar.current.complete();
    }
  }

  render() {
    const {
      currency,
      toggleOrder,
      home: { coinList, isLoading, hasError },
    } = this.props;
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
          <ChartOverview topCoin={coinList[0]} currency={this.props.currency} />
        )}
        <StyledTitle> Market Overview </StyledTitle>
        <Container>
          <StyledRow>
            <StyledCol span={1}>
              <TableHeader
                text="#"
                sortBy="marketCapRank"
                toggleOrder={toggleOrder}
              />
            </StyledCol>
            <StyledCol span={3}>
              <TableHeader text="Name" sortBy="id" toggleOrder={toggleOrder} />
            </StyledCol>
            <StyledCol span={2}>
              <TableHeader
                text="Price"
                sortBy="currentPrice"
                toggleOrder={toggleOrder}
              />
            </StyledCol>
            <StyledCol span={2}>
              <TableHeader
                text="1h"
                sortBy="priceChangePercentage1HInCurrency"
                toggleOrder={toggleOrder}
              />
            </StyledCol>
            <StyledCol span={2}>
              <TableHeader
                text="24h"
                sortBy="priceChangePercentage24HInCurrency"
                toggleOrder={toggleOrder}
              />
            </StyledCol>
            <StyledCol span={2}>
              <TableHeader
                text="7d"
                sortBy="priceChangePercentage7DInCurrency"
                toggleOrder={toggleOrder}
              />
            </StyledCol>
            <StyledCol span={4}>
              <TableHeader
                text="24h Volume"
                sortBy="totalVolume"
                toggleOrder={toggleOrder}
              />{" "}
              /{" "}
              <TableHeader
                text="Market Cap"
                sortBy="marketCap"
                toggleOrder={toggleOrder}
              />{" "}
            </StyledCol>
            <StyledCol span={4}>
              <TableHeader
                text="Circulating"
                sortBy="circulatingSupply"
                toggleOrder={toggleOrder}
              />{" "}
              /{" "}
              <TableHeader
                text="Total Supply"
                sortBy="totalSupply"
                toggleOrder={toggleOrder}
              />{" "}
            </StyledCol>
            <StyledCol span={4}> Last 7 d </StyledCol>
          </StyledRow>
          {isLoading && <LoadingCoins />}
          {hasResponse && (
            <Coins
              currency={currency}
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
  fetchAllCoins,
  parseQueryString,
  toggleOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
