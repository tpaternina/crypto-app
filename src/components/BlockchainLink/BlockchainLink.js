import React from "react";
import { message, Col, Row } from "antd";
import {
  CoinTitleContainer,
  CoinWideDiv,
  StyledCopy,
  StyledCoinLink,
  StyledLinkIcon,
  StyledLongLink,
} from "styles";

export default class BlockchainList extends React.Component {
  handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    message.success({ content: "Link copied!" });
  };

  render() {
    const { link } = this.props;
    return (
      <CoinTitleContainer>
        <CoinWideDiv>
          <Row justify="space-between" align="center" gutter={16}>
            <Col span={2}>
              <StyledLinkIcon />
            </Col>
            <Col span={20}>
              <StyledCoinLink href={link}>
                <StyledLongLink
                  ellipsis={{
                    symbol: "...",
                  }}
                >
                  {link}
                </StyledLongLink>
              </StyledCoinLink>
            </Col>
            <Col span={2}>
              <StyledCopy onClick={() => this.handleCopy(link)} />
            </Col>
          </Row>
        </CoinWideDiv>
      </CoinTitleContainer>
    );
  }
}
