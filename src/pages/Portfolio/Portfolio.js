import React from "react";
import { Col, Row } from "antd";
import { AddAsset, PortfolioAsset } from "components";
import { StyledButton, StyledTitle } from "./Portfolio.styles";

export default class Portfolio extends React.Component {
  state = {
    assetList: [],
    isActive: false,
  };

  handleSubmit = (coin) => {
    this.setState({ assetList: [...this.state.assetList, coin] });
  };

  toggleActive = () => {
    this.setState({ isActive: !this.state.isActive });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.assetList !== this.state.assetList) {
      console.log(this.state.assetList);
    }
  }

  render() {
    const { assetList, isActive } = this.state;
    const { currency } = this.props;
    return (
      <>
        <Row justify="center">
          <Col span={6}>
            <StyledButton onClick={this.toggleActive}>Add Asset</StyledButton>
          </Col>
        </Row>
        <StyledTitle>Your statistics</StyledTitle>
        {isActive && (
          <AddAsset
            currency={currency}
            toggleActive={this.toggleActive}
            handleSubmit={this.handleSubmit}
          />
        )}
        {assetList.map((coin) => (
          <PortfolioAsset coin={coin} />
        ))}
      </>
    );
  }
}
