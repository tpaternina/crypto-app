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
    assetList: [],
    editCoin: {},
    openAddAsset: false,
    destroyAddAsset: true,
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

  handleClose = (e) => {
    // prevent empty field error
    e.preventDefault();

    this.hideAddAsset();
    this.setState({ editCoin: {} });
  };

  handleEdit = (coin) => {
    const newList = this.state.assetList.map((item, index) => {
      if (item.key === coin.key) {
        // replace old coin with new coin
        return coin;
      }
      return item;
    });
    this.setState({ assetList: newList });
    this.hideAddAsset();
  };

  handleDelete = (key) => {
    const newList = this.state.assetList.filter((item) => item.key !== key);
    this.setState({ assetList: newList });
  };

  handleSubmit = (coin) => {
    // Get price at purchased date
    this.getPriceAtDate(coin.id, coin.purchaseDate, this.props.currency);

    const newList = [...this.state.assetList, coin];
    this.setState({ assetList: newList });
    this.hideAddAsset();
  };

  showEdit = (coin) => {
    this.setState({ editCoin: coin });
  };

  showAddAsset = (coin) => {
    this.setState({ destroyAddAsset: false });
    setTimeout(() => this.setState({ openAddAsset: true }), 250);
  };

  hideAddAsset = () => {
    this.setState({ openAddAsset: false });
    setTimeout(() => this.setState({ destroyAddAsset: true }), 250);
  };

  componentDidMount() {
    this.setState({
      assetList: JSON.parse(window.localStorage.getItem("assetList")),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Get price at purchase date if asset list elements change
    if (
      JSON.stringify(prevState.assetList) !==
      JSON.stringify(this.state.assetList)
    ) {
      this.state.assetList.map((coin) =>
        this.getPriceAtDate(coin.id, coin.purchasedDate, this.props.currency)
      );
    }

    // Save asset list to local storage if it changed
    if (
      JSON.stringify(prevState.assetList) !==
      JSON.stringify(this.state.assetList)
    ) {
      window.localStorage.setItem(
        "assetList",
        JSON.stringify(this.state.assetList)
      );
    }

    // Show AddAsset component in edit mode
    if (
      !isEmpty(this.state.editCoin) &&
      JSON.stringify(prevState.editCoin) !== JSON.stringify(this.state.editCoin)
    ) {
      console.log("showing asset!");
      this.showAddAsset();
    }
  }

  render() {
    const { assetList, openAddAsset, destroyAddAsset, editCoin } = this.state;
    const { currency } = this.props;
    return (
      <>
        <Row justify="center">
          <StyledCol span={6}>
            <StyledButton onClick={() => this.showAddAsset()}>
              Add Asset
            </StyledButton>
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
          assetList
            .sort((coin1, coin2) => coin2.purchasedDate - coin1.purchasedDate)
            .map((coin) => (
              <PortfolioAsset
                key={coin.key}
                coin={coin}
                currency={currency}
                showEdit={this.showEdit}
                handleDelete={this.handleDelete}
              />
            ))}
        <AddAsset
          coin={editCoin}
          destroyAddAsset={destroyAddAsset}
          openAddAsset={openAddAsset}
          handleClose={this.handleClose}
          handleEdit={this.handleEdit}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}
