import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { Radio, Row } from "antd";
import { isEmpty } from "lodash";
import LoadingBar from "react-top-loading-bar";
import { fetchPrices, setTimeRange } from "store/home/actions";
import { getCoinInfo } from "store/coin/actions";
import { setCurrency } from "store/app/actions";
import {
  BlockchainLink,
  ChartPriceOverview,
  CoinDescription,
  CoinMarketInfo,
  CoinPriceInfo,
  CoinTitle,
  Converter,
  Currency,
  LoadingSingleCoin,
} from "components";
import {
  CoinCol,
  CoinRow,
  CoinChartDiv,
  NarrowDiv,
  TopDiv,
  WideDiv,
  StyledLoading,
  StyledTitle,
} from "styles";

function Coin(props) {
  const loadingBar = React.createRef();

  const [hasResponse, setResponse] = useState(false);
  const [increase, setIncrease] = useState(false);
  const [linkNumber, setLinkNumber] = useState(0);

  const {
    coin: { data, isLoading, hasError },
    currency,
    prices,
    isOverviewLoading,
    timeRange,
    setTimeRange,
  } = props;

  useEffect(() => {
    if (props.location.search) {
      const { currency } = queryString.parse(props.location.search);
      props.setCurrency(currency);
    } else {
      const { currency } = props;
      const query = queryString.stringify({
        currency,
      });
      props.history.push(`?${query}`);
    }
    props.getCoinInfo(props.match.params.id);
    props.fetchPrices(currency, props.match.params.id);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isEmpty(data)) {
      setIncrease(data.marketData.priceChangePercentage24H > 0);
    }
  }, [data]);

  useEffect(() => {
    if (!isEmpty(data)) {
      setLinkNumber(
        data.links.blockchainSite.reduce(
          (acc, item) => (item ? (acc += 1) : acc),
          0
        )
      );
    }
  }, [data]);

  useEffect(() => {
    const query = queryString.stringify({
      currency,
    });
    props.history.push(`?${query}`);
    // eslint-disable-next-line
  }, [currency]);

  useEffect(() => {
    props.fetchPrices(currency, props.match.params.id);
    // eslint-disable-next-line
  }, [timeRange]);

  useEffect(() => {
    if (isLoading) {
      loadingBar.current.continuousStart();
    } else {
      loadingBar.current.complete();
    }
    // eslint-disable-next-line
  }, [isLoading]);

  useEffect(() => {
    props.getCoinInfo(props.match.params.id);
    props.fetchPrices(currency, props.match.params.id);
    // eslint-disable-next-line
  }, [props.match.params.id]);

  useEffect(() => {
    setResponse(!isEmpty(data) && !isLoading && !hasError);
  }, [data, isLoading, hasError]);

  return (
    <>
      <NarrowDiv>
        <TopDiv>
          <StyledTitle>Coin summary</StyledTitle>
          <Currency />
        </TopDiv>
      </NarrowDiv>
      <WideDiv>
        <StyledTitle>Coin summary</StyledTitle>
      </WideDiv>
      <LoadingBar ref={loadingBar} />
      {isLoading && <LoadingSingleCoin />}
      {hasResponse && (
        <>
          <CoinRow justify="center" gutter={16} top="true">
            <CoinCol xs={24} sm={16} md={8} lg={8} xl={6} xxl={6}>
              <CoinTitle data={data} />
            </CoinCol>
            <CoinCol xs={24} sm={16} md={10} lg={10} xl={8} xxl={8}>
              <CoinPriceInfo
                currency={currency}
                data={data}
                increase={increase}
              />
            </CoinCol>
            <CoinCol xs={24} sm={18} md={16} lg={16} xl={10} xxl={10}>
              <CoinMarketInfo currency={currency.toLowerCase()} data={data} />
            </CoinCol>
          </CoinRow>
          <StyledTitle>Description</StyledTitle>
          <CoinRow justify="center">
            <CoinCol xs={24} sm={24} md={18} lg={18} xl={24} xxl={24}>
              <CoinDescription data={data} />
            </CoinCol>
          </CoinRow>
          <CoinRow justify="center" gutter={16}>
            {data.links.blockchainSite
              .filter((link) => link !== "")
              .map((link) => {
                return (
                  <CoinCol
                    key={link}
                    xs={24}
                    sm={24}
                    md={18}
                    lg={18}
                    xl={Math.max(Math.round(24 / linkNumber), 8)}
                    xxl={Math.max(Math.round(24 / linkNumber), 8)}
                  >
                    <BlockchainLink link={link} />
                  </CoinCol>
                );
              })}
          </CoinRow>
          <Row justify="center" align="center">
            <Converter />
          </Row>
          <CoinRow justify="center">
            <CoinCol xs={24} sm={19} md={15} lg={12} xl={10} xxl={8}>
              <Radio.Group onChange={setTimeRange} value={timeRange}>
                <Radio.Button value={1}>1d</Radio.Button>
                <Radio.Button value={7}>1w</Radio.Button>
                <Radio.Button value={30}>1mo</Radio.Button>
                <Radio.Button value={90}>3mo</Radio.Button>
                <Radio.Button value={180}>6mo</Radio.Button>
                <Radio.Button value={365}>1y</Radio.Button>
              </Radio.Group>
            </CoinCol>
          </CoinRow>
          <CoinChartDiv>
            {isOverviewLoading && <StyledLoading />}
            {!isOverviewLoading && (
              <ChartPriceOverview
                prices={prices}
                chartColor="#4e4e4e"
                padding={{ top: 0, right: 0, left: 0, bottom: 84}}
              />
            )}
          </CoinChartDiv>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  currency: state.app.currency,
  coin: state.coin,
  prices: state.home.prices,
  timeRange: state.home.timeRange,
  isOverviewLoading: state.home.isOverviewLoading,
});

const mapDispatchToProps = {
  getCoinInfo,
  setCurrency,
  fetchPrices,
  setTimeRange,
};

export default connect(mapStateToProps, mapDispatchToProps)(Coin);
