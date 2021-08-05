import React from "react";
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

class Coin extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    if (this.props.location.search) {
      const { currency } = queryString.parse(this.props.location.search);
      this.props.setCurrency(currency);
    } else {
      const { currency } = this.props;
      const query = queryString.stringify({
        currency,
      });
      this.props.history.push(`?${query}`);
    }
    this.props.getCoinInfo(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currency !== this.props.currency) {
      const { currency } = this.props;
      const query = queryString.stringify({
        currency,
      });
      console.log(query);
      this.props.history.push(`?${query}`);
    }
    if (
      prevProps.coin.isLoading !== this.props.coin.isLoading &&
      this.props.coin.isLoading
    ) {
      this.loadingBar.current.continuousStart();
    }

    if (
      prevProps.coin.isLoading !== this.props.coin.isLoading &&
      !this.props.coin.isLoading
    ) {
      this.loadingBar.current.complete();
    }

    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.getCoinInfo(this.props.match.params.id);
    }
  }

  render() {
    const { data, isLoading, hasError } = this.props.coin;
    let { currency } = this.props;
    currency = currency.toLowerCase();
    const hasResponse = !isEmpty(data) && !isLoading && !hasError;
    const increase = hasResponse
      ? data.marketData.priceChangePercentage24H > 0
      : false;

    // Number of non-empty elements in links array
    const linkNumber = hasResponse
      ? data.links.blockchainSite.reduce(
          (acc, item) => (item ? (acc += 1) : acc),
          0
        )
      : 0;
    return (
      <>
        <StyledTitle>Coin summary</StyledTitle>
        <LoadingBar ref={this.loadingBar} />
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
                <CoinMarketInfo currency={currency} data={data} />
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
