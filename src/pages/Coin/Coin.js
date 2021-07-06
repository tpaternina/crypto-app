import React from "react";
import axios from "axios";
import { isEmpty } from "lodash";
import LoadingBar from "react-top-loading-bar";
import { usePalette } from "react-palette";
import { keysToCamelCase } from "utils";
import { CoinTitle, PriceInfo } from "components";
import {
  StyledCol,
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
  }

  render() {
    const { data, isLoading, hasError } = this.state;
    let { currency } = this.props;
    currency = currency.toLowerCase();
    const hasResponse = !isEmpty(data) && !isLoading && !hasError;
    const increase = hasResponse
      ? data.marketData.priceChangePercentage24H > 0
      : false;

    //const { data: colors, loading, error } = usePalette(data.image.large) || {}

    return (
      <>
        <StyledTitle>Coin summary</StyledTitle>
        <LoadingBar ref={this.loadingBar} />
        {hasResponse && (
          <>
            <StyledRow>
              <StyledCol span={4}>
                <CoinTitle data={data} />
              </StyledCol>
              <StyledCol span={8}>
                <PriceInfo
                  currency={currency}
                  data={data}
                  increase={increase}
                />
              </StyledCol>
              <StyledCol span={10}></StyledCol>
            </StyledRow>
          </>
        )}
      </>
    );
  }
}
