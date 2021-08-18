import React from "react";
import { message } from "antd";
import { CoinContainer, StyledCopy, StyledCoinLink, StyledLinkIcon } from "styled";

export default class BlockchainList extends React.Component {
  handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    message.success({ content: "Link copied!" });
  };

  render() {
    const { link } = this.props;
    return (
      <>
        <CoinContainer>
          <StyledLinkIcon />
          <StyledCoinLink href={link}>{link}</StyledCoinLink>
          <StyledCopy onClick={() => this.handleCopy(link)} />
        </CoinContainer>
      </>
    );
  }
}
