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
  StyledCoinName,
  StyledInfo,
  StyledTitle,
} from "./PortfolioAsset.styles";

export default function PortfolioAsset(props) {
  const { coin, currency } = props;

  const {
    coin: {
      name,
      symbol,
      circulatingSupply,
      currentPrice,
      logoUrl,
      marketCap,
      maxSupply,
      priceChange24H,
      priceChangePercentage24H,
      totalVolume,
    },
  } = coin;
  const { priceAtPurchase, purchasedAmount, purchasedDate } = coin;

  const increase = priceChangePercentage24H > 0;
  const increaseSincePurchase = currentPrice - priceAtPurchase;
  const volumePercentage = Math.round((100 * totalVolume) / marketCap);

  return (
    <StyledRow justify="space-between" margin="0 0 2rem 0">
      <StyledCol height="175px" span={3}>
        <CoinContainer>
          <LogoContainer width="40%" src={logoUrl} />
          <StyledCoinName>
            {name} ({symbol.toUpperCase()})
          </StyledCoinName>
        </CoinContainer>
      </StyledCol>
      <StyledCol height="175px" span={20}>
        <StyledRow margin={0}>
          <StyledCol span={24} height="100%">
            <StyledTitle>Market Price</StyledTitle>
            <Container>
              <InfoContainer>
                <InfoTitle>Current price</InfoTitle>
                <StyledInfo color="#06d554">
                  {formatCurrency(currentPrice, currency)}
                </StyledInfo>
              </InfoContainer>
              <InfoContainer>
                <InfoTitle>Price change 24h</InfoTitle>
                <StyledInfo increase={increase}>
                  {increase ? <CaretUpOutlined /> : <CaretDownOutlined />}{" "}
                  {formatCurrency(priceChange24H, currency)}
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
                <StyledInfo color="#06d554">
                  {formatLongNumber(circulatingSupply, currency)}
                </StyledInfo>
                <ColorBarContainer>
                  <ColorBar
                    numerator={circulatingSupply}
                    denominator={maxSupply}
                    numeratorColor="#fff"
                    denominatorColor="#06d554"
                  />
                </ColorBarContainer>
              </InfoContainer>
            </Container>
          </StyledCol>
        </StyledRow>
        <StyledRow>
          <StyledCol span={24}>
            <StyledTitle>Your coin</StyledTitle>
            <Container>
              <InfoContainer>
                <InfoTitle>Coin amount</InfoTitle>
                <StyledInfo color="#06d554">{purchasedAmount}</StyledInfo>
              </InfoContainer>
              <InfoContainer>
                <InfoTitle>Amount value</InfoTitle>
                <StyledInfo increase={increase}>
                  {formatCurrency(purchasedAmount * currentPrice, currency)}
                </StyledInfo>
              </InfoContainer>
              <InfoContainer>
                <InfoTitle>Amount price change since purchase</InfoTitle>
                <StyledInfo increase={increaseSincePurchase > 0}>
                  {increaseSincePurchase > 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}{" "}
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
  );
}
