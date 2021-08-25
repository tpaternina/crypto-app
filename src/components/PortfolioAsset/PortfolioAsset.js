import React from "react";
import moment from "moment";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { ColorBar } from "components";
import { formatCurrency, formatLongNumber } from "utils";
import {
  AssetCol,
  AssetCoinContainer,
  AssetCoinLink,
  AssetCoinName,
  AssetContainer,
  AssetInfo,
  AssetInfoContainer,
  AssetInfoTitleContainer,
  AssetSectionTitle,
  LogoContainer,
  PortfolioRow,
  PercentageContainer,
  SmallColorBarContainer,
  StyledEditIcon,
  StyledDeleteIcon,
  IncreaseArrow,
  DecreaseArrow,
} from "styles";

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
        <PortfolioRow justify="space-between" gutter={16} asset>
          <AssetCol
            height="190px"
            span={4}
            xs={24}
            sm={10}
            md={8}
            lg={5}
            xl={4}
            xxl={4}
          >
            <AssetCoinContainer>
              <AssetCoinLink to={`/coins/${id}?currency=${currency}`}>
                <LogoContainer width="45%" margin="0 0 1rem 0" src={large} />
                <AssetCoinName>
                  {name} ({symbol.toUpperCase()})
                </AssetCoinName>
              </AssetCoinLink>
            </AssetCoinContainer>
          </AssetCol>
          <AssetCol
            height="190px"
            span={19}
            xs={24}
            sm={24}
            md={24}
            lg={19}
            xl={20}
            xxl={20}
          >
            <PortfolioRow margin="0" asset>
              <AssetCol span={24} height="100%">
                <AssetSectionTitle>Market Price</AssetSectionTitle>
                <AssetContainer>
                  <AssetInfoContainer>
                    <AssetInfoTitleContainer>Current price</AssetInfoTitleContainer>
                    <AssetInfo color="#06d554">
                      {formatCurrency(
                        currentPrice[currency.toLowerCase()],
                        currency
                      )}
                    </AssetInfo>
                  </AssetInfoContainer>
                  <AssetInfoContainer>
                    <AssetInfoTitleContainer>Price change 24h</AssetInfoTitleContainer>
                    <AssetInfo color={increase ? "#06d554" : "#fe1040"}>
                      {increase ? <IncreaseArrow /> : <DecreaseArrow />}{" "}
                      {formatCurrency(priceChange, currency)}
                    </AssetInfo>
                  </AssetInfoContainer>
                  <AssetInfoContainer>
                    <AssetInfoTitleContainer>Vol. vs. Market Cap</AssetInfoTitleContainer>
                    <PercentageContainer>
                      <AssetInfo color="#06d554">
                        {volumePercentage}%
                      </AssetInfo>
                      <SmallColorBarContainer>
                        <ColorBar
                          numerator={volumePercentage}
                          denominator={100}
                          numeratorColor="#fff"
                          denominatorColor="#06d554"
                        />
                      </SmallColorBarContainer>
                    </PercentageContainer>
                  </AssetInfoContainer>
                  <AssetInfoContainer>
                    <AssetInfoTitleContainer>Circ. vs. Max. supply</AssetInfoTitleContainer>
                    <AssetInfo color="#fff">
                      {formatLongNumber(circulatingSupply, symbol)}
                    </AssetInfo>
                    <SmallColorBarContainer>
                      <ColorBar
                        numerator={circulatingSupply}
                        denominator={maxSupply}
                        numeratorColor="#fff"
                        denominatorColor="#06d554"
                      />
                    </SmallColorBarContainer>
                    <AssetInfo color="#06d554">
                      {formatLongNumber(maxSupply, symbol)}
                    </AssetInfo>
                  </AssetInfoContainer>
                </AssetContainer>
              </AssetCol>
            </PortfolioRow>
            <PortfolioRow margin="0" asset>
              <AssetCol span={24}>
                <AssetSectionTitle>
                  Your coin{" "}
                  <StyledEditIcon
                    onClick={() => showEditAsset(coin)}
                    title="Edit coin"
                    aria-label="Edit coin"
                    role="button"
                  />
                  <StyledDeleteIcon
                    onClick={() => handleDelete(key)}
                    title="Delete coin"
                    aria-label="Delete coin"
                    role="button"
                  />
                </AssetSectionTitle>
                <AssetContainer>
                  <AssetInfoContainer>
                    <AssetInfoTitleContainer>Coin amount</AssetInfoTitleContainer>
                    <AssetInfo color="#06d554">{purchasedAmount}</AssetInfo>
                  </AssetInfoContainer>
                  <AssetInfoContainer>
                    <AssetInfoTitleContainer>Amount value</AssetInfoTitleContainer>
                    <AssetInfo color="#06d554">
                      {formatCurrency(
                        purchasedAmount * currentPrice[currency.toLowerCase()],
                        currency
                      )}
                    </AssetInfo>
                  </AssetInfoContainer>
                  <AssetInfoContainer>
                    <AssetInfoTitleContainer>Amount price change since purchase</AssetInfoTitleContainer>
                    <AssetInfo
                      color={increaseSincePurchase > 0 ? "#06d554" : "#fe1040"}
                    >
                      {increaseSincePurchase > 0 ? (
                        <CaretUpOutlined />
                      ) : (
                        <CaretDownOutlined />
                      )}{" "}
                      {formatCurrency(increaseSincePurchase, currency)}
                    </AssetInfo>
                  </AssetInfoContainer>
                  <AssetInfoContainer>
                    <AssetInfoTitleContainer>Purchase date</AssetInfoTitleContainer>
                    <AssetInfo color="#06d554">
                      {moment(purchasedDate).format("DD/MM/YYYY")}
                    </AssetInfo>
                  </AssetInfoContainer>
                </AssetContainer>
              </AssetCol>
            </PortfolioRow>
          </AssetCol>
        </PortfolioRow>
      </>
    );
  }
}
