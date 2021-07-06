import {
  LogoContainer,
  StyledContainer,
  StyledName,
  StyledLink,
  StyledLinkIcon,
  StyledRow,
} from "./CoinTitle.styles";

export default function CoinTitle(props) {
  const { data } = props;
  return (
    <>
      <StyledContainer>
        <LogoContainer src={data.image.small} alt={data.name} />
        <StyledName>
          {data.name} ({data.symbol.toUpperCase()})
        </StyledName>
      </StyledContainer>
      <StyledContainer>
        <StyledRow>
          <StyledLinkIcon />
          <StyledLink href={data.links.homepage}>
            {data.links.homepage}
          </StyledLink>
        </StyledRow>
      </StyledContainer>
    </>
  );
}
