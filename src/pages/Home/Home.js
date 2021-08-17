import React from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { fetchAllCoins, toggleOrder } from "store/home/actions";
import { setCurrency } from "store/app/actions";
import {
  TableContainer,
  HeaderCol,
  HeaderRow,
  NarrowDiv,
  WideDiv,
  StyledTitle,
  TopDiv,
} from "styled";
import {
  Currency,
  ChartLoading,
  ChartOverview,
  Coins,
  LoadingCoins,
  TableHeader,
} from "components";

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
        <NarrowDiv>
          <TopDiv>
            <StyledTitle> Market Overview </StyledTitle>
            <Currency />
          </TopDiv>
        </NarrowDiv>
        {isLoading && <ChartLoading />}
        {hasResponse && <ChartOverview />}
        <WideDiv>
          <StyledTitle> Market Overview </StyledTitle>
        </WideDiv>
        <TableContainer>
          <HeaderRow>
            <HeaderCol xs={4} sm={4} md={3} lg={3} xl={2} xxl={2} rank={true}>
              <TableHeader
                text="#"
                sortBy="marketCapRank"
                toggleOrder={toggleOrder}
              />
            </HeaderCol>
            <HeaderCol xs={6} sm={4} md={4} lg={4} xl={4} xxl={4}>
              <TableHeader text="Name" sortBy="id" toggleOrder={toggleOrder} />
            </HeaderCol>
            <HeaderCol xs={6} sm={4} md={3} lg={3} xl={2} xxl={2}>
              <TableHeader
                text="Price"
                sortBy="currentPrice"
                toggleOrder={toggleOrder}
              />
            </HeaderCol>
            <HeaderCol xs={4} sm={4} md={2} lg={2} xl={2} xxl={2}>
              <TableHeader
                text="1h"
                sortBy="priceChangePercentage1HInCurrency"
                toggleOrder={toggleOrder}
              />
            </HeaderCol>
            <HeaderCol xs={4} sm={4} md={2} lg={2} xl={2} xxl={2}>
              <TableHeader
                text="24h"
                sortBy="priceChangePercentage24HInCurrency"
                toggleOrder={toggleOrder}
              />
            </HeaderCol>
            <HeaderCol xs={0} sm={4} md={2} lg={2} xl={2} xxl={2}>
              <TableHeader
                text="7d"
                sortBy="priceChangePercentage7DInCurrency"
                toggleOrder={toggleOrder}
              />
            </HeaderCol>
            <HeaderCol xs={0} sm={0} md={4} lg={4} xl={3} xxl={3}>
              <TableHeader
                text="24h Volume"
                sortBy="totalVolume"
                toggleOrder={toggleOrder}
              />
              <TableHeader
                text="Market Cap"
                sortBy="marketCap"
                toggleOrder={toggleOrder}
              />
            </HeaderCol>
            <HeaderCol xs={0} sm={0} md={4} lg={4} xl={3} xxl={3}>
              <TableHeader
                text="Circulating"
                sortBy="circulatingSupply"
                toggleOrder={toggleOrder}
              />
              <TableHeader
                text="Total Supply"
                sortBy="totalSupply"
                toggleOrder={toggleOrder}
              />
            </HeaderCol>
            <HeaderCol xs={0} sm={0} md={0} lg={0} xl={4} xxl={4}> Last 7 d </HeaderCol>
          </HeaderRow>
          {isLoading && <LoadingCoins />}
          {hasResponse && <Coins coinList={coinList} />}
        </TableContainer>
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
