import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import LoadingBar from "react-top-loading-bar";
import { getCoinInfo } from "store/coin/actions";
import { setCurrency } from "store/app/actions";
import {
  BlockchainLink,
  CoinDescription,
  CoinMarketInfo,
  CoinPriceInfo,
  CoinTitle,
  Currency,
} from "components";
import {
  CoinCol,
  CoinRow,
  NarrowDiv,
  TopDiv,
  WideDiv,
  StyledTitle,
} from "styled";

function Coin(props) {
  const loadingBar = React.createRef();

  const [hasResponse, setResponse] = useState(false);
  const [increase, setIncrease] = useState(false);
  const [linkNumber, setLinkNumber] = useState(0);

  const {
    coin: { data, isLoading, hasError },
    currency,
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
    if (isLoading) {
      loadingBar.current.continuousStart();
    } else {
      loadingBar.current.complete();
    }
    // eslint-disable-next-line
  }, [isLoading]);

  useEffect(() => {
    props.getCoinInfo(props.match.params.id);
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
      {hasResponse && (
        <>
          <CoinRow justify="center" gutter={16} top={true}>
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
              .map((link) => (
                <CoinCol key={link} xs={24} sm={24} md={18} lg={18} xl={24 / linkNumber} xxl={24 / linkNumber}>
                  <BlockchainLink link={link} />
                </CoinCol>
              ))}
          </CoinRow>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  currency: state.app.currency,
  coin: state.coin,
});

const mapDispatchToProps = {
  getCoinInfo,
  setCurrency,
};

export default connect(mapStateToProps, mapDispatchToProps)(Coin);
