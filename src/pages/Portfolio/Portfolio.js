import React from "react";
import axios from "axios";
import { Row } from "antd";
import { isEmpty } from "lodash";
import { AddAsset, PortfolioAsset } from "components";
import { formatQueryDate, keysToCamelCase } from "utils";
import {
  EmptyListIcon,
  PlaceholderText,
  StyledButton,
  StyledCol,
  StyledTitle,
} from "./Portfolio.styles";

export default class Portfolio extends React.Component {
  state = {
    assetList: JSON.parse(window.localStorage.getItem("assetList")) || [],
    isAddActive: false,
    isEditActive: false,
  };

  getPriceAtDate = async (id, date, currency) => {
    try {
      let { data } = await axios(
        `${
          process.env.REACT_APP_SINGLE_COIN_ENDPOINT
        }/${id}/history?date=${formatQueryDate(date)}&localization=false`
      );
      data = keysToCamelCase(data);

      const {
        marketData: { currentPrice: priceAtPurchase },
      } = data;

      console.log(priceAtPurchase[currency.toLowerCase()]);

      const newList = this.state.assetList.map((coin) => {
        if (coin.id === id) {
          coin.priceAtPurchase = priceAtPurchase[currency.toLowerCase()];
          console.log({ coinWithPriceAtPur: coin });
          return coin;
        }
        return coin;
      });

      this.setState({ assetList: newList });
    } catch (err) {
      console.log(err);
    }
  };

  handleSubmit = (coin) => {
    // Get price at purchased date
    this.getPriceAtDate(coin.id, coin.purchaseDate, this.props.currency);
    console.log(coin);
    const newList = [...this.state.assetList, coin];
    this.setState({ assetList: newList });
    window.localStorage.setItem("assetList", JSON.stringify(newList));
  };

  toggleActive = () => {
    this.setState({ isAddActive: !this.state.isAddActive });
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevState.assetList.length !== this.state.assetList.length) {
      this.state.assetList.map((coin) =>
        this.getPriceAtDate(coin.id, coin.purchasedDate, this.props.currency)
      );
    }
  }

  render() {
    const { assetList, isAddActive } = this.state;
    const { currency } = this.props;
    return (
      <>
        <Row justify="center">
          <StyledCol span={6}>
            <StyledButton onClick={this.toggleActive}>Add Asset</StyledButton>
          </StyledCol>
        </Row>
        <StyledTitle>Your statistics</StyledTitle>
        {isEmpty(assetList) && (
          <Row justify="center">
            <StyledCol>
              <EmptyListIcon />
              <PlaceholderText>You have no assets yet.</PlaceholderText>
            </StyledCol>
          </Row>
        )}
        {!isEmpty(assetList) &&
          assetList.map((coin) => (
            <PortfolioAsset key={coin.id} coin={coin} currency={currency} />
          ))}
        {isAddActive && (
          <AddAsset
            currency={currency}
            toggleActive={this.toggleActive}
            handleSubmit={this.handleSubmit}
          />
        )}
      </>
    );
  }
}
