import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { ColorBar } from "components";
import { formatLongNumber, keysToCamelCase } from "utils";
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

function GlobalInfo(props) {
  const { coinList } = props;
  // Top 2 coins in market cap

  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [hasResponse, setResponse] = useState(false);
  const [first, setFirst] = useState({});
  const [second, setSecond] = useState({});
  const [increase, setIncrease] = useState(null);

  async function getInfo() {
    try {
      setLoading(true);
      setError(false);

      // Get global info
      let {
        data: { data },
      } = await axios(`${process.env.REACT_APP_GLOBAL_ENDPOINT}`);
      data = keysToCamelCase(data);
      setData(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line
    getInfo();
  }, []);

  useEffect(() => {
    if (!isEmpty(data)) {
      setIncrease(data.marketCapChangePercentage24HUsd < 0);
    }
  }, [data]);

  useEffect(() => {
    if (!!coinList.length) {
      setFirst(coinList[0]);
      setSecond(coinList[1]);
    }
    // eslint-disable-next-line
  }, [coinList]);

  useEffect(() => {
    setResponse(!isLoading && !hasError && !!coinList.length && !isEmpty(data));
  }, [isLoading, hasError, coinList, data]);

  const currency = props.currency.toLowerCase();

  return (
    <StyledContainer>
      <>
        {isLoading && <ContentLoading />}
        {hasResponse && (
          <>
            <div title="Active coins">
              Coins: <StyledNumber>{data.activeCryptocurrencies}</StyledNumber>
            </div>
            <div title="Total exchanges">
              Exchange: <StyledNumber>{data.markets}</StyledNumber>
            </div>

            <div title="Market Capitalization">
              <StyledNumber>
                • {formatLongNumber(data.totalMarketCap[currency], currency)}
              </StyledNumber>
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
                • {formatLongNumber(data.totalVolume[currency], currency)}
              </StyledNumber>
              <BarContainer>
                <ColorBar
                  numerator={data.totalVolume[currency]}
                  denominator={data.totalMarketCap[currency]}
                  numeratorColor="#fff"
                  denominatorColor="#2172e5"
                />
              </BarContainer>
            </GlobalInfoContainer>
            <GlobalInfoContainer title={`Market Cap Dominance ${first.name}`}>
              <StyledNumber>
                <CoinLogo src={first.image} alt={first.name} />
                {data.marketCapPercentage[first.symbol].toFixed(2)}%
              </StyledNumber>
              <BarContainer>
                <ColorBar
                  numerator={data.marketCapPercentage[first.symbol]}
                  denominator={100}
                  numeratorColor="#fff"
                  denominatorColor="#2172e5"
                />
              </BarContainer>
            </GlobalInfoContainer>
            <GlobalInfoContainer title={`Market Cap Dominance ${second.name}`}>
              <StyledNumber>
                <CoinLogo src={second.image} alt={second.name} />
                {data.marketCapPercentage[second.symbol].toFixed(2)}%
              </StyledNumber>
              <BarContainer>
                <ColorBar
                  numerator={data.marketCapPercentage[second.symbol]}
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

const mapStateToProps = (state) => ({
  currency: state.app.currency,
  coinList: state.home.coinList,
});

export default connect(mapStateToProps)(GlobalInfo);
