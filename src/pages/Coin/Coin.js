import React from "react";
import axios from "axios";
import { isEmpty } from "lodash";
import LoadingBar from "react-top-loading-bar";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { usePalette } from "react-palette";
import { formatCurrency, formatLongDate, keysToCamelCase } from "utils";
import { layers } from "assets";
import {
  LogoContainer,
  StyledAllTimeContainer,
  StyledAllTimeInfo,
  StyledCol,
  StyledContainer,
  StyledRow,
  StyledLayerIcon,
  StyledLink,
  StyledLinkIcon,
  StyledLoading,
  StyledPrice,
  StyledIncrease,
  StyledName,
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
                <StyledContainer>
                  <LogoContainer src={data.image.small} alt={data.name} />
                  <StyledName>
                    {data.name} ({data.symbol.toUpperCase()})
                  </StyledName>
                </StyledContainer>
                <StyledContainer>
                  <StyledRow>
                    <StyledLinkIcon />
                    <StyledLink href={data.links.homepage}>
                      {data.links.homepage}
                    </StyledLink>
                  </StyledRow>
                </StyledContainer>
              </StyledCol>
              <StyledCol span={8}>
                <StyledContainer>
                  <StyledPrice>
                    {formatCurrency(
                      data.marketData.currentPrice[currency],
                      currency
                    )}
                    <StyledIncrease increase={increase}>
                      {increase ? <CaretUpOutlined /> : <CaretDownOutlined />}
                      {data.marketData.priceChangePercentage24H.toFixed(2)}%
                    </StyledIncrease>
                  </StyledPrice>
                  <p>
                    <strong>Profit: </strong>
                    <StyledIncrease increase={increase}>
                      {formatCurrency(
                        data.marketData.priceChange24HInCurrency[currency],
                        currency
                      )}
                    </StyledIncrease>
                  </p>
                  <StyledLayerIcon src={layers} />
                  <StyledAllTimeContainer>
                    <StyledIncrease increase={true}>
                      <CaretUpOutlined />
                    </StyledIncrease>
                    <StyledAllTimeInfo>
                      <div>
                        <strong>All Time High: </strong>
                        {formatCurrency(
                          data.marketData.ath[currency],
                          currency
                        )}
                      </div>
                      <div>{formatLongDate(data.marketData.athDate[currency])}</div>
                    </StyledAllTimeInfo>
                  </StyledAllTimeContainer>
                  <StyledAllTimeContainer>
                    <StyledIncrease increase={false}>
                      <CaretDownOutlined />
                    </StyledIncrease>
                    <StyledAllTimeInfo>
                      <div>
                        <strong>All Time Low: </strong>
                        {formatCurrency(
                          data.marketData.atl[currency],
                          currency
                        )}
                      </div>
                      <div>{formatLongDate(data.marketData.atlDate[currency])}</div>
                    </StyledAllTimeInfo>
                  </StyledAllTimeContainer>
                </StyledContainer>
              </StyledCol>
              <StyledCol span={10}></StyledCol>
            </StyledRow>
          </>
        )}
      </>
    );
  }
}
