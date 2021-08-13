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
  StyledInfo,
  StyledLoading,
  StyledPrice,
  NarrowDiv,
  WideDiv,
} from "styled";
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
    const topCoin = coinList.find((item) => item.marketCapRank === 1);
    return (
      <>
        {isOverviewLoading && <ChartLoading />}
        {hasResponse && (
          <>
            <WideDiv>
              <Row>
                <ChartCol>
                  <ChartContainer>
                    <ChartPriceOverview prices={prices} currency={currency} />
                    <ChartInfo>
                      <StyledInfo> {topCoin.symbol.toUpperCase()} </StyledInfo>
                      <StyledPrice>
                        {formatLongNumber(prices[29][1], currency, 3)}
                      </StyledPrice>
                      <StyledInfo> {formatDate(prices[29][0])} </StyledInfo>
                    </ChartInfo>
                  </ChartContainer>
                  <ChartContainer>
                    <ChartVolumeOverview
                      totalVolumes={totalVolumes}
                      currency={currency}
                    />
                    <ChartInfo>
                      <StyledInfo> Volume 24 h </StyledInfo>
                      <StyledPrice>
                        {formatLongNumber(totalVolumes[29][1], currency, 3)}
                      </StyledPrice>
                      <StyledInfo>
                        {" "}
                        {formatDate(totalVolumes[29][0])}{" "}
                      </StyledInfo>
                    </ChartInfo>
                  </ChartContainer>
                </ChartCol>
              </Row>
            </WideDiv>
            <NarrowDiv>
              <Slider {...slickSettings}>
                <ChartContainer>
                  <ChartPriceOverview prices={prices} currency={currency} />
                  <ChartInfo>
                    <StyledInfo> {topCoin.symbol.toUpperCase()} </StyledInfo>
                    <StyledPrice>
                      {formatLongNumber(prices[29][1], currency, 3)}
                    </StyledPrice>
                    <StyledInfo> {formatDate(prices[29][0])} </StyledInfo>
                  </ChartInfo>
                </ChartContainer>
                <ChartContainer>
                  <ChartVolumeOverview
                    totalVolumes={totalVolumes}
                    currency={currency}
                  />
                  <ChartInfo>
                    <StyledInfo> Volume 24 h </StyledInfo>
                    <StyledPrice>
                      {formatLongNumber(totalVolumes[29][1], currency, 3)}
                    </StyledPrice>
                    <StyledInfo> {formatDate(totalVolumes[29][0])} </StyledInfo>
                  </ChartInfo>
                </ChartContainer>
              </Slider>
            </NarrowDiv>
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
