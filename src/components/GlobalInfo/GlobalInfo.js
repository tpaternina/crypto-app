import React from "react";
import axios from "axios";
import { isEmpty } from "lodash";
import { ColorBar } from "components";
import { formatLongNumber } from "utils";
// import { keysToCamelCase } from "utils";
import {
  BarContainer,
  CoinLogo,
  ContentLoading,
  IncreaseArrow,
  DecreaseArrow,
  GlobalInfoContainer,
  StyledContainer,
  StyledNumber,
} from "./GlobalInfo.styles";

export default class GlobalInfo extends React.Component {
  state = {
    data: {},
    isLoading: false,
    hasError: false,
    icon1: null,
    icon2: null,
    symbol1: null,
    symbol2: null,
    name1: null,
    name2: null,
  };

  getInfo = async () => {
    try {
      this.setState({ isLoading: true });
      const {
        data: { data },
      } = await axios(`${process.env.REACT_APP_GLOBAL_ENDPOINT}`);
      // data = keysToCamelCase(data);

      // Get symbols of the top 2 coins
      const top1 = Object.keys(data.total_market_cap)[0];
      const top2 = Object.keys(data.total_market_cap)[1];

      //  Get API ids
      let { data: list } = await axios(
        `${process.env.REACT_APP_COIN_LIST_ENDPOINT}`
      );

      list = list.filter(
        (item) => item.symbol === top1 || item.symbol === top2
      );

      // Get image URLs
      const {
        data: {
          image: { thumb: icon1 },
        },
      } = await axios(
        `${process.env.REACT_APP_SINGLE_COIN_ENDPOINT}/${list[0].id}`
      );
      const {
        data: {
          image: { thumb: icon2 },
        },
      } = await axios(
        `${process.env.REACT_APP_SINGLE_COIN_ENDPOINT}/${list[1].id}`
      );

      this.setState({
        data,
        name1: list[0].name,
        name2: list[1].name,
        symbol1: list[0].symbol,
        symbol2: list[1].symbol,
        icon1,
        icon2,
        isLoading: false,
        hasError: false,
      });
    } catch (err) {
      console.log(err);
      this.setState({ isLoading: false, hasError: true });
    }
  };

  componentDidMount() {
    this.getInfo();
  }

  render() {
    const increase = true;
    const { currency } = this.props;
    const {
      data,
      isLoading,
      hasError,
      icon1,
      icon2,
      name1,
      name2,
      symbol1,
      symbol2,
    } = this.state;
    const hasResponse = !isEmpty(data) && !isLoading && !hasError;
    const totalMarketCap = hasResponse
      ? Object.values(data.total_market_cap).reduce(
          (acc, val) => (acc += val),
          0
        )
      : 1;
    const totalVolume = hasResponse
      ? Object.values(data.total_volume).reduce((acc, val) => (acc += val), 0)
      : 1;
    return (
      <StyledContainer>
        <>
          {isLoading && <ContentLoading />}
          {hasResponse && (
            <>
              <div title="Active coins">
                Coins:{" "}
                <StyledNumber>{data.active_cryptocurrencies}</StyledNumber>
              </div>
              <div title="Total exchanges">
                Exchange: <StyledNumber>{data.markets}</StyledNumber>
              </div>

              <div title="Market Capitalization">
                <StyledNumber>
                  • {formatLongNumber(totalMarketCap, currency)}
                </StyledNumber>{" "}
                <span title="24-hour change percentage relative to USD">
                  {increase ? (
                    <IncreaseArrow color="#00ff5f" />
                  ) : (
                    <DecreaseArrow color="#fe1040" />
                  )}
                </span>
              </div>
              <GlobalInfoContainer title="Total volume in the last 24h">
                <StyledNumber>
                  • {formatLongNumber(totalVolume, currency)}
                </StyledNumber>{" "}
                <BarContainer>
                  <ColorBar
                    numerator={data.total_volume[symbol1]}
                    denominator={totalVolume}
                    numeratorColor="#fff"
                    denominatorColor="#2172e5"
                  />
                </BarContainer>
              </GlobalInfoContainer>
              <GlobalInfoContainer title={`Market Cap Dominance ${name1}`}>
                <StyledNumber>
                  <CoinLogo src={icon1} alt={name1} />{" "}
                  {data.market_cap_percentage[symbol1].toFixed(2)}%
                </StyledNumber>{" "}
                <BarContainer>
                  <ColorBar
                    numerator={data.market_cap_percentage[symbol1]}
                    denominator={100}
                    numeratorColor="#fff"
                    denominatorColor="#2172e5"
                  />
                </BarContainer>
              </GlobalInfoContainer>
              <GlobalInfoContainer title={`Market Cap Dominance ${name2}`}>
                <StyledNumber>
                  <CoinLogo src={icon2} alt={name2} />{" "}
                  {data.market_cap_percentage[symbol2].toFixed(2)}%
                </StyledNumber>{" "}
                <BarContainer>
                  <ColorBar
                    numerator={data.market_cap_percentage[symbol2]}
                    denominator={100}
                    numeratorColor="#fff"
                    denominatorColor="#2172e5"
                  />
                </BarContainer>
              </GlobalInfoContainer>
            </>
          )}
        </>
      </StyledContainer>
    );
  }
}
