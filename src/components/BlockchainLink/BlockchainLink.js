import React from "react";
import { message, Row } from "antd";
import {
  CoinTitleContainer,
  StyledCopy,
  StyledCoinLink,
  StyledLinkIcon,
} from "styles";

export default class BlockchainList extends React.Component {
  handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    message.success({ content: "Link copied!" });
  };

  render() {
    const { link } = this.props;
    return (
      <>
        <CoinTitleContainer>
          <Row justify="space-between">
            <StyledLinkIcon />
            <StyledCoinLink href={link}>{link}</StyledCoinLink>
            <StyledCopy onClick={() => this.handleCopy(link)} />
          </Row>
        </CoinTitleContainer>
      </>
    );
  }
}
