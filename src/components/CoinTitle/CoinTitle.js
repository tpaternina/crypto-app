import { Row } from "antd";
import { CoinTitleContainer, LogoContainer, StyledCoinName, StyledCoinLink, StyledLinkIcon } from "styles";

export default function CoinTitle(props) {
  const { data } = props;
  return (
    <>
      <CoinTitleContainer top>
        <LogoContainer src={data.image.small} alt={data.name} />
        <StyledCoinName>
          {data.name} ({data.symbol.toUpperCase()})
        </StyledCoinName>
      </CoinTitleContainer>
      <CoinTitleContainer>
        <Row justify="space-between">
          <StyledLinkIcon />
          <StyledCoinLink href={data.links.homepage}>
            {data.links.homepage}
          </StyledCoinLink>
        </Row>
      </CoinTitleContainer>
    </>
  );
}
