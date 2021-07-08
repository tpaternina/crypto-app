import React from "react";
import { message } from "antd";
import {
  StyledContainer,
  StyledCopy,
  StyledLink,
  StyledLinkIcon,
} from "./BlockchainLink.styles";

export default class BlockchainList extends React.Component {
  handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    message.success({ content: "Link copied!" });
  };

  render() {
    const { link } = this.props;
    return (
      <>
        <StyledContainer>
          <StyledLinkIcon />
          <StyledLink href={link}>{link}</StyledLink>
          <StyledCopy onClick={() => this.handleCopy(link)} />
        </StyledContainer>
      </>
    );
  }
}
