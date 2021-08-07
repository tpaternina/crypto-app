import React from "react";
import moment from "moment";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { ColorBar } from "components";
import { formatCurrency, formatLongNumber } from "utils";
import {
  ColorBarContainer,
  Container,
  CoinContainer,
  InfoContainer,
  InfoTitle,
  LogoContainer,
  StyledCol,
  StyledRow,
  StyledEditIcon,
  StyledDeleteIcon,
  StyledCoinName,
  StyledInfo,
  StyledLink,
  StyledTitle,
} from "./PortfolioAsset.styles";

export default class PortfolioAsset extends React.Component {
  render() {
    const { coin, currency, showEditAsset, handleDelete } = this.props;
    const {
      id,
      name,
      symbol,
      large,
      key,
      marketData: {
        circulatingSupply,
        currentPrice,
        marketCap,
        maxSupply,
        priceChange24HInCurrency,
        totalVolume,
      },
      priceAtPurchase,
      purchasedAmount,
      purchasedDate,
    } = coin;

    const priceChange = priceChange24HInCurrency[currency.toLowerCase()];
    const increase = priceChange > 0;
    const increaseSincePurchase =
      currentPrice[currency.toLowerCase()] - priceAtPurchase;
    const volumePercentage = Math.round(
      (100 * totalVolume[currency.toLowerCase()]) /
        marketCap[currency.toLowerCase()]
    );

    return (
      <>
        <StyledRow justify="space-between" margin="0 0 2rem 0">
          <StyledCol height="190px" span={4}>
            <CoinContainer>
              <StyledLink to={`/coins/${id}?currency=${currency}`}>
                <LogoContainer width="45%" src={large} />
                <StyledCoinName>
                  {name} ({symbol.toUpperCase()})
                </StyledCoinName>
              </StyledLink>
            </CoinContainer>
          </StyledCol>
          <StyledCol height="190px" span={19}>
            <StyledRow margin={0}>
              <StyledCol span={24} height="100%">
                <StyledTitle>Market Price</StyledTitle>
                <Container>
                  <InfoContainer>
                    <InfoTitle>Current price</InfoTitle>
                    <StyledInfo color="#06d554">
                      {formatCurrency(
                        currentPrice[currency.toLowerCase()],
                        currency
                      )}
                    </StyledInfo>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>Price change 24h</InfoTitle>
                    <StyledInfo color={increase ? "#06d554" : "#fe1040"}>
                      {increase ? <CaretUpOutlined /> : <CaretDownOutlined />}{" "}
                      {formatCurrency(priceChange, currency)}
                    </StyledInfo>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>Vol. vs. Market Cap</InfoTitle>
                    <StyledInfo color="#06d554">{volumePercentage}%</StyledInfo>
                    <ColorBarContainer>
                      <ColorBar
                        numerator={volumePercentage}
                        denominator={100}
                        numeratorColor="#fff"
                        denominatorColor="#06d554"
                      />
                    </ColorBarContainer>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>Circ. vs. Max. supply:</InfoTitle>
                    <StyledInfo color="#fff">
                      {formatLongNumber(circulatingSupply, symbol)}
                    </StyledInfo>
                    <ColorBarContainer>
                      <ColorBar
                        numerator={circulatingSupply}
                        denominator={maxSupply}
                        numeratorColor="#fff"
                        denominatorColor="#06d554"
                      />
                    </ColorBarContainer>
                    <StyledInfo color="#06d554">
                      {formatLongNumber(maxSupply, symbol)}
                    </StyledInfo>
                  </InfoContainer>
                </Container>
              </StyledCol>
            </StyledRow>
            <StyledRow>
              <StyledCol span={24}>
                <StyledTitle>
                  Your coin{" "}
                  <StyledEditIcon
                    onClick={() => showEditAsset(coin)}
                    title="Edit coin"
                    role="button"
                  />
                  <StyledDeleteIcon
                    onClick={() => handleDelete(key)}
                    title="Delete coin"
                    role="button"
                  />
                </StyledTitle>
                <Container>
                  <InfoContainer>
                    <InfoTitle>Coin amount</InfoTitle>
                    <StyledInfo color="#06d554">{purchasedAmount}</StyledInfo>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>Amount value</InfoTitle>
                    <StyledInfo color="#06d554">
                      {formatCurrency(
                        purchasedAmount * currentPrice[currency.toLowerCase()],
                        currency
                      )}
                    </StyledInfo>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>Amount price change since purchase</InfoTitle>
                    <StyledInfo
                      color={increaseSincePurchase > 0 ? "#06d554" : "#fe1040"}
                    >
                      {increaseSincePurchase > 0 ? (
                        <CaretUpOutlined />
                      ) : (
                        <CaretDownOutlined />
                      )}{" "}
                      {formatCurrency(increaseSincePurchase, currency)}
                    </StyledInfo>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>Purchase date</InfoTitle>
                    <StyledInfo color="#06d554">
                      {moment(purchasedDate).format("DD/MM/YYYY")}
                    </StyledInfo>
                  </InfoContainer>
                </Container>
              </StyledCol>
            </StyledRow>
          </StyledCol>
        </StyledRow>
      </>
    );
  }
}
