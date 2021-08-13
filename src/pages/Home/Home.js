import React from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { fetchAllCoins, toggleOrder } from "store/home/actions";
import { setCurrency } from "store/app/actions";
import {
  ChartLoading,
  ChartOverview,
  Coins,
  LoadingCoins,
  TableHeader,
} from "components";
import { Container, StyledCol, StyledRow, StyledTitle } from "./Home.styles";

class Home extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    if (this.props.location.search) {
      const { sortBy, descending, currency } = queryString.parse(
        this.props.location.search,
        { parseBooleans: true }
      );
      this.props.toggleOrder(sortBy, descending);
      this.props.setCurrency(currency);
    } else {
      const {
        currency,
        home: {
          pageConfig: { sortBy, descending },
        },
      } = this.props;
      const query = queryString.stringify({
        sortBy,
        descending,
        currency,
      });
      this.props.history.push(`/?${query}`);
    }
    this.props.fetchAllCoins();
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.home.pageConfig) !==
        JSON.stringify(this.props.home.pageConfig) ||
      prevProps.currency !== this.props.currency
    ) {
      const {
        currency,
        home: {
          pageConfig: { sortBy, descending },
        },
      } = this.props;
      const query = queryString.stringify({
        sortBy,
        descending,
        currency,
      });
      this.props.history.push(`/?${query}`);
    }
    if (prevProps.currency !== this.props.currency) {
      this.props.fetchAllCoins();
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
      toggleOrder,
      home: { coinList, isLoading },
      hasResponse,
    } = this.props;
    return (
      <>
        <LoadingBar ref={this.loadingBar} />
        {isLoading && <ChartLoading />}
        {hasResponse && <ChartOverview />}
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
              />
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
              />
            </StyledCol>
            <StyledCol span={4}> Last 7 d </StyledCol>
          </StyledRow>
          {isLoading && <LoadingCoins />}
          {hasResponse && <Coins coinList={coinList} />}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  home: state.home,
  currency: state.app.currency,
  hasResponse:
    !state.home.isLoading &&
    !state.home.hasError &&
    !!state.home.coinList.length,
});

const mapDispatchToProps = {
  fetchAllCoins,
  setCurrency,
  toggleOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
