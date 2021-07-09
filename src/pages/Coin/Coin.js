import React from "react";
import axios from "axios";
import parse from "html-react-parser";
import { isEmpty } from "lodash";
import LoadingBar from "react-top-loading-bar";
import { layers } from "assets";
import { keysToCamelCase } from "utils";
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

export default class Coin extends React.Component {
  state = {
    data: {},
    isLoading: false,
    hasError: false,
  };

  loadingBar = React.createRef();

  getCoinInfo = async () => {
    try {
      this.setState({ isLoading: true });
      let { data } = await axios(
        `${process.env.REACT_APP_SINGLE_COIN_ENDPOINT}/${this.props.match.params.id}`
      );
      data = keysToCamelCase(data);

      this.setState({ isLoading: false, hasError: false, data });
    } catch (err) {
      console.log(err);
      this.setState({ isLoading: false, hasError: err });
    }
  };

  componentDidMount() {
    this.getCoinInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isLoading !== this.state.isLoading && this.state.isLoading) {
      this.loadingBar.current.continuousStart();
    }

    if (prevState.isLoading !== this.state.isLoading && !this.state.isLoading) {
      this.loadingBar.current.complete();
    }

    if (prevProps.match.params.id !== this.props.match.params.id) {

      this.getCoinInfo();
    }
  }

  render() {
    const { data, isLoading, hasError } = this.state;
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
              <StyledCol span={8}>
                <CoinPriceInfo
                  currency={currency}
                  data={data}
                  increase={increase}
                />
              </StyledCol>
              <StyledCol span={8}>
                <CoinMarketInfo currency={currency} data={data} />
              </StyledCol>
            </StyledRow>
            <StyledTitle>Description</StyledTitle>
            <StyledRow>
              <StyledCol span={24}>
                <StyledContainer>
                  <StyledLayerIcon src={layers} />
                  <StyledDescription>
                    {data.description["en"] ? parse(data.description["en"]) : <small>Description unavailable</small>}
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
