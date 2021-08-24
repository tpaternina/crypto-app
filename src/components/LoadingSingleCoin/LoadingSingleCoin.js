import { RetweetOutlined } from "@ant-design/icons";
import {
  CoinRow,
  CoinCol,
  PortfolioCol,
  CoinChartDiv,
  CoinContainer,
  CoinTitleContainer,
  ContentLoading,
  StyledLoading,
  StyledTitle,
  ConverterButton,
} from "styled";

export default function LoadingSingleCoin(props) {
  return (
    <>
      <CoinRow justify="center" gutter={16} top>
        <CoinCol xs={24} sm={16} md={8} lg={8} xl={6} xxl={6}>
          <CoinTitleContainer padding="40% 2rem" top>
            <StyledLoading top="35%" left="45%"/>
          </CoinTitleContainer>
          <CoinTitleContainer padding="1rem">
            <ContentLoading color="#404040" />
          </CoinTitleContainer>
        </CoinCol>
        <CoinCol xs={24} sm={16} md={10} lg={10} xl={8} xxl={8}>
          <CoinContainer>
            <StyledLoading />
          </CoinContainer>
        </CoinCol>
        <CoinCol xs={24} sm={18} md={16} lg={16} xl={10} xxl={10}>
          <CoinContainer padding="20%">
            <StyledLoading />
          </CoinContainer>
        </CoinCol>
      </CoinRow>
      <StyledTitle>Description</StyledTitle>
      <CoinRow justify="center">
        <CoinCol xs={24} sm={24} md={18} lg={18} xl={24} xxl={24}>
          <CoinContainer padding="30%">
            <StyledLoading />
          </CoinContainer>
        </CoinCol>
      </CoinRow>
      <CoinRow justify="center">
        <PortfolioCol span={8}>
          <ContentLoading color="#404040" />
        </PortfolioCol>
        <PortfolioCol span={3}>
          <ConverterButton onClick={() => console.log("Page is loading!")}>
            <RetweetOutlined />
          </ConverterButton>
        </PortfolioCol>
        <PortfolioCol span={8}>
          <ContentLoading color="#404040" />
        </PortfolioCol>
      </CoinRow>
      <CoinRow justify="center">
        <CoinCol xs={24} sm={19} md={15} lg={12} xl={10} xxl={8}>
            <ContentLoading color="#404040" />
        </CoinCol>
      </CoinRow>
      <CoinChartDiv>
        <StyledLoading />
      </CoinChartDiv>
    </>
  );
}
