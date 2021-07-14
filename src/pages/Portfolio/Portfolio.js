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

      const newList = this.state.assetList.map((coin) => {
        if (coin.id === id) {
          coin.priceAtPurchase = priceAtPurchase[currency.toLowerCase()];
          return coin;
        }
        return coin;
      });

      this.setState({ assetList: newList });
    } catch (err) {
      console.log(err);
    }
  };

  handleEdit = (coin) => {
    const newList = this.state.assetList.map((item) => {
      if (item.id === coin.id) {
        // replace old coin with new coin
        console.log(coin)
        return coin;
      }
      console.log("note coin")
      return item;
    });
    this.setState({ assetList: newList });
  };

  handleDelete = (purchasedDate) => {
    const newList = this.state.assetList.filter((item) => item.purchasedDate !== purchasedDate);
    this.setState({ assetList: newList });
  };

  handleSubmit = (coin) => {
    // Get price at purchased date
    this.getPriceAtDate(coin.id, coin.purchaseDate, this.props.currency);
    const newList = [...this.state.assetList, coin];
    console.log(coin)
    this.setState({ assetList: newList });
    window.localStorage.setItem("assetList", JSON.stringify(newList));
  };

  toggleActive = () => {
    this.setState({ isAddActive: !this.state.isAddActive });
  };

  componentDidMount() {
    this.state.assetList.map((coin) =>
      this.getPriceAtDate(coin.id, coin.purchasedDate, this.props.currency)
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevState.assetList) !==
      JSON.stringify(this.state.assetList)
    ) {
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
        {!!assetList.length &&
          assetList.sort((coin1, coin2) => coin2.purchasedAmount - coin1.purchasedAmount).map((coin) => (
            <PortfolioAsset
              key={coin.id}
              coin={coin}
              currency={currency}
              handleEdit={this.handleEdit}
              handleDelete={this.handleDelete}
            />
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
