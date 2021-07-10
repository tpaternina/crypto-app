import React from "react";
import { Col, Row } from "antd";
import { AddAsset, PortfolioAsset } from "components";
import { StyledButton, StyledTitle } from "./Portfolio.styles";

export default class Portfolio extends React.Component {
  state = {
    assetList: [],
    isActive: false,
  };

  toggleActive = () => {
    this.setState({ isActive: !this.state.isActive });
  };

  render() {
    const { assetList, isActive } = this.state;
    const {currency} = this.props
    return (
      <>
        <Row justify="center">
          <Col span={6}>
            <StyledButton onClick={this.toggleActive}>Add Asset</StyledButton>
          </Col>
        </Row>
        <StyledTitle>Your statistics</StyledTitle>
        {isActive && <AddAsset currency={currency} />}
        {assetList.map((coin) => (
          <PortfolioAsset coin={coin} />
        ))}
      </>
    );
  }
}
