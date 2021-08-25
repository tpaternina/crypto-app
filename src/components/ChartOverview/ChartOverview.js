import React from "react";
import { connect } from "react-redux";
import { Row } from "antd";
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
} from "styles";
import { formatDate, formatLongNumber } from "utils";
import { fetchPrices } from "store/home/actions";

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
  }

  render() {
    const {
      home: { prices, totalVolumes, coinList, isOverviewLoading },
      hasResponse,
      currency,
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
                    <ChartPriceOverview
                      prices={prices}
                      symbol={topCoin.symbol.toUpperCase()}
                      price={formatLongNumber(prices[last][1], currency, 3)}
                      currency={currency}
                    />
                    <ChartInfo>
                      <StyledChartInfo>
                        {" "}
                        {topCoin.symbol.toUpperCase()}{" "}
                      </StyledChartInfo>
                      <StyledPrice>
                        {formatLongNumber(prices[last][1], currency, 3)}
                      </StyledPrice>
                      <StyledChartInfo>
                        {formatDate(prices[last][0])}
                      </StyledChartInfo>
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
            </WideDivChart>
            <NarrowDivChart>
              <Slider {...slickSettings}>
                <ChartContainer>
                  <ChartPriceOverview prices={prices} currency={currency} />
                  <ChartInfo>
                    <StyledChartInfo>
                      {" "}
                      {topCoin.symbol.toUpperCase()}{" "}
                    </StyledChartInfo>
                    <StyledPrice>
                      {formatLongNumber(prices[last][1], currency, 3)}
                    </StyledPrice>
                    <StyledChartInfo>
                      {" "}
                      {formatDate(prices[last][0])}{" "}
                    </StyledChartInfo>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartOverview);
