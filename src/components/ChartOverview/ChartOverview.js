import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import { ChartPriceOverview, ChartVolumeOverview } from "components";
import { formatDate, formatLongNumber } from "utils";
import { fetchPrices } from "store/home/homeActions";
import {
  ChartCol,
  ChartContainer,
  ChartInfo,
  ChartRow,
  StyledInfo,
  StyledLoading,
  StyledPrice,
} from "./ChartOverview.styles";

class ChartOverview extends React.Component {

  getPrices = async () => {
    try {
      const { topCoin, currency } = this.props;
      this.setState({
        isLoading: true,
      });
      const query = queryString.stringifyUrl({
        url: `${process.env.REACT_APP_SINGLE_COIN_ENDPOINT}/${topCoin.id}/market_chart`,
        query: {
          vs_currency: currency,
          days: 30,
          interval: "daily",
        },
      });
      const {
        data: { prices, totalVolumes },
      } = await axios(query);
      this.setState({
        prices,
        totalVolumes,
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        hasError: true,
      });
      console.log(err);
    }
  };

  componentDidMount() {
    this.props.fetchPrices(this.props.currency);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currency !== this.props.currency) {
      this.props.fetchPrices(this.props.currency);
    }
  }

  render() {
    const {
      home: { prices, totalVolumes, coinList, isOverviewLoading },
      hasResponse,
      currency,
    } = this.props;
    const topCoin = coinList[0];
    return (
      <>
        {isOverviewLoading && (
          <ChartRow>
            <ChartCol span={11}>
              <ChartContainer>
                <StyledLoading />
              </ChartContainer>
            </ChartCol>
            <ChartCol span={11}>
              <ChartContainer>
                <StyledLoading />
              </ChartContainer>
            </ChartCol>
          </ChartRow>
        )}
        {hasResponse && (
          <ChartRow>
            <ChartCol span={11}>
              <ChartContainer>
                <ChartPriceOverview prices={prices} currency={currency} />
                <ChartInfo className="chart-info">
                  <StyledInfo> {topCoin.symbol.toUpperCase()} </StyledInfo>
                  <StyledPrice>
                    {formatLongNumber(prices[29][1], currency, 3)}
                  </StyledPrice>
                  <StyledInfo> {formatDate(prices[29][0])} </StyledInfo>
                </ChartInfo>
              </ChartContainer>
            </ChartCol>
            <ChartCol span={11}>
              <ChartContainer>
                <ChartVolumeOverview
                  totalVolumes={totalVolumes}
                  currency={currency}
                />
                <ChartInfo className="chart-info">
                  <StyledInfo> Volume 24 h </StyledInfo>
                  <StyledPrice>
                    {formatLongNumber(totalVolumes[29][1], currency, 3)}
                  </StyledPrice>
                  <StyledInfo> {formatDate(totalVolumes[29][0])} </StyledInfo>
                </ChartInfo>
              </ChartContainer>
            </ChartCol>
          </ChartRow>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.app.currency,
  home: state.home,
  hasResponse:
    !state.home.isLoading &&
    !state.home.hasError &&
    !state.home.isOverviewLoading &&
    !state.home.hasOverviewError &&
    !!state.home.coinList.length &&
    !!state.home.prices.length &&
    !!state.home.totalVolumes.length,
});

const mapDispatchToProps = {
  fetchPrices,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartOverview);
