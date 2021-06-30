import axios from "axios";
import React from "react";
import queryString from "query-string";
import { isEmpty } from "lodash";
import { ChartPriceOverview } from "components";
import { formatDate, formatLongNumber } from "utils";
import {
  ChartCol,
  ChartContainer,
  ChartInfo,
  ChartRow,
  StyledInfo,
  StyledLoading,
  StyledPrice,
} from "./ChartOverview.styles";
import ChartVolumeOverview from "components/ChartVolumeOverview";

export default class ChartOverview extends React.Component {
  state = {
    prices: [],
    total_volumes: [],
    isLoading: false,
    hasError: false,
  };

  getPrices = async () => {
    try {
      const { topCoin, currency } = this.props;
      this.setState({
        isLoading: true,
      });
      const query = queryString.stringifyUrl({
        url: `${process.env.REACT_APP_COIN_HISTORY_ENDPOINT}/${topCoin.id}/market_chart`,
        query: {
          vs_currency: currency,
          days: 30,
          interval: "daily",
        },
      });
      const {
        data: { prices, total_volumes },
      } = await axios(query);
      this.setState({
        prices,
        total_volumes,
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
    this.getPrices();
  }

  render() {
    const { prices, total_volumes, isLoading, hasError } = this.state;
    const { topCoin, currency } = this.props;
    const hasResponse =
      !isEmpty(prices) && !isEmpty(total_volumes) && !isLoading && !hasError;
    return (
      <>
        {" "}
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
        {hasResponse && (
          <ChartRow>
            <ChartCol span={12}>
              <ChartContainer>
                <ChartInfo>
                  <StyledInfo> {topCoin.symbol.toUpperCase()} </StyledInfo>{" "}
                  <StyledPrice>
                    {" "}
                    {formatLongNumber(prices[29][1], currency, 3)}{" "}
                  </StyledPrice>{" "}
                  <StyledInfo> {formatDate(prices[29][0])} </StyledInfo>{" "}
                </ChartInfo>{" "}
                <ChartPriceOverview prices={prices} currency={currency} />{" "}
              </ChartContainer>{" "}
            </ChartCol>{" "}
            <ChartCol span={12}>
              <ChartContainer>
                <ChartInfo>
                  <StyledInfo> Volume 24 h </StyledInfo>{" "}
                  <StyledPrice>
                    {" "}
                    {formatLongNumber(total_volumes[29][1], currency, 3)}{" "}
                  </StyledPrice>{" "}
                  <StyledInfo> {formatDate(total_volumes[29][0])} </StyledInfo>{" "}
                </ChartInfo>{" "}
                <ChartVolumeOverview
                  total_volumes={total_volumes}
                  currency={currency}
                />{" "}
              </ChartContainer>{" "}
            </ChartCol>{" "}
          </ChartRow>
        )}{" "}
      </>
    );
  }
}
