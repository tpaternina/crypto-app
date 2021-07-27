import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import parse from "html-react-parser";
import { isEmpty } from "lodash";
import LoadingBar from "react-top-loading-bar";
import { layers } from "assets";
import { keysToCamelCase } from "utils";
import { getCoinInfo } from "store/coin/coinActions";
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
    this.props.getCoinInfo(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Coin);
