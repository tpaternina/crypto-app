import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import parse from "html-react-parser";
import { isEmpty } from "lodash";
import LoadingBar from "react-top-loading-bar";
import { layers } from "assets";
import { getCoinInfo } from "store/coin/actions";
import { setCurrency } from "store/app/actions";
import {
  BlockchainLink,
  CoinMarketInfo,
  CoinPriceInfo,
  CoinTitle,
} from "components";
import {
  StyledCol,
  StyledContainer,
  StyledDescription,
  StyledLayerIcon,
  StyledRow,
  StyledTitle,
} from "./Coin.styles";

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
      <StyledTitle>Coin summary</StyledTitle>
      <LoadingBar ref={loadingBar} />
      {hasResponse && (
        <>
          <StyledRow>
            <StyledCol span={6}>
              <CoinTitle data={data} />
            </StyledCol>
            <StyledCol span={7}>
              <CoinPriceInfo
                currency={currency}
                data={data}
                increase={increase}
              />
            </StyledCol>
            <StyledCol span={10}>
              <CoinMarketInfo currency={currency.toLowerCase()} data={data} />
            </StyledCol>
          </StyledRow>
          <StyledTitle>Description</StyledTitle>
          <StyledRow>
            <StyledCol span={24}>
              <StyledContainer>
                <StyledLayerIcon src={layers} />
                <StyledDescription>
                  {data.description["en"] ? (
                    parse(data.description["en"])
                  ) : (
                    <small>Description unavailable</small>
                  )}
                </StyledDescription>
              </StyledContainer>
            </StyledCol>
          </StyledRow>
          <StyledRow>
            {data.links.blockchainSite
              .filter((link) => link !== "")
              .map((link) => (
                <StyledCol key={link} span={24 / linkNumber - 1}>
                  <BlockchainLink link={link} />
                </StyledCol>
              ))}
          </StyledRow>
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
