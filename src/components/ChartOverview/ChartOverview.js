import React from "react";
import { connect } from "react-redux";
import { Radio, Row } from "antd";
import Slider from "react-slick";
import {
  ChartLoading,
  ChartPriceOverview,
  ChartVolumeOverview,
} from "components";
import {
  ChartCol,
  ChartContainer,
  ChartInfo,
  StyledChartInfo,
  StyledPrice,
  NarrowDivChart,
  WideDivChart,
} from "styled";
import { formatDate, formatLongNumber } from "utils";
import { fetchPrices, setTimeRange } from "store/home/actions";

const slickSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

class ChartOverview extends React.Component {
  componentDidMount() {
    this.props.fetchPrices(this.props.currency);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currency !== this.props.currency) {
      this.props.fetchPrices(this.props.currency);
    }
    if (prevProps.home.timeRange !== this.props.home.timeRange) {
      this.props.fetchPrices(this.props.currency);
    }
  }

  render() {
    const {
      home: { prices, totalVolumes, coinList, isOverviewLoading, timeRange },
      hasResponse,
      currency,
      setTimeRange,
    } = this.props;
    const last = prices.length - 1;
    const topCoin = coinList.find((item) => item.marketCapRank === 1);
    return (
      <>
        {isOverviewLoading && <ChartLoading />}
        {hasResponse && (
          <>
            <WideDivChart>
              <Row justify="space-between">
                <ChartCol justify="start" span={12}>
                  <ChartContainer>
                    <ChartPriceOverview prices={prices} currency={currency} />
                    <ChartInfo>
                      <StyledChartInfo> {topCoin.symbol.toUpperCase()} </StyledChartInfo>
                      <StyledPrice>
                        {formatLongNumber(prices[last][1], currency, 3)}
                      </StyledPrice>
                      <StyledChartInfo> {formatDate(prices[last][0])} </StyledChartInfo>
                    </ChartInfo>
                  </ChartContainer>
                </ChartCol>
                <ChartCol justify="end" span={12}>
                  <ChartContainer>
                    <ChartVolumeOverview
                      totalVolumes={totalVolumes}
                      currency={currency}
                    />
                    <ChartInfo>
                      <StyledChartInfo> Volume 24 h </StyledChartInfo>
                      <StyledPrice>
                        {formatLongNumber(totalVolumes[last][1], currency, 3)}
                      </StyledPrice>
                      <StyledChartInfo>
                        {formatDate(totalVolumes[last][0])}
                      </StyledChartInfo>
                    </ChartInfo>
                  </ChartContainer>
                </ChartCol>
              </Row>
              <Row justify="center">
                <ChartCol xs={24} sm={18} md={15} lg={12}>
                  <ChartContainer timeRange>
                    <Radio.Group onChange={setTimeRange} value={timeRange}>
                      <Radio.Button value={1}>1d</Radio.Button>
                      <Radio.Button value={7}>1w</Radio.Button>
                      <Radio.Button value={30}>1mo</Radio.Button>
                      <Radio.Button value={90}>3mo</Radio.Button>
                      <Radio.Button value={180}>6mo</Radio.Button>
                      <Radio.Button value={365}>1y</Radio.Button>
                    </Radio.Group>
                  </ChartContainer>
                </ChartCol>
              </Row>
            </WideDivChart>
            <NarrowDivChart>
              <Slider {...slickSettings}>
                <ChartContainer>
                  <ChartPriceOverview prices={prices} currency={currency} />
                  <ChartInfo>
                    <StyledChartInfo> {topCoin.symbol.toUpperCase()} </StyledChartInfo>
                    <StyledPrice>
                      {formatLongNumber(prices[last][1], currency, 3)}
                    </StyledPrice>
                    <StyledChartInfo> {formatDate(prices[last][0])} </StyledChartInfo>
                  </ChartInfo>
                </ChartContainer>
                <ChartContainer>
                  <ChartVolumeOverview
                    totalVolumes={totalVolumes}
                    currency={currency}
                  />
                  <ChartInfo>
                    <StyledChartInfo> Volume 24 h </StyledChartInfo>
                    <StyledPrice>
                      {formatLongNumber(totalVolumes[last][1], currency, 3)}
                    </StyledPrice>
                    <StyledChartInfo>
                      {" "}
                      {formatDate(totalVolumes[last][0])}{" "}
                    </StyledChartInfo>
                  </ChartInfo>
                </ChartContainer>
              </Slider>
              <Row justify="center">
                <ChartCol xs={24} sm={19}>
                  <ChartContainer timeRange>
                    <Radio.Group onChange={setTimeRange} value={timeRange}>
                      <Radio.Button value={1}>1d</Radio.Button>
                      <Radio.Button value={7}>1w</Radio.Button>
                      <Radio.Button value={30}>1mo</Radio.Button>
                      <Radio.Button value={90}>3mo</Radio.Button>
                      <Radio.Button value={180}>6mo</Radio.Button>
                      <Radio.Button value={365}>1y</Radio.Button>
                    </Radio.Group>
                  </ChartContainer>
                </ChartCol>
              </Row>
            </NarrowDivChart>
          </>
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
  setTimeRange,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartOverview);
