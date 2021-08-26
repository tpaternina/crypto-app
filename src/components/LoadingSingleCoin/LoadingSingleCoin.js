import { Row } from "antd";
import { RetweetOutlined } from "@ant-design/icons";
import {
  CoinRow,
  CoinCol,
  PortfolioCol,
  CoinChartDiv,
  CoinLoadingContainer,
  ContentLoading,
  StyledLoading,
  StyledTitle,
  ConverterButton,
} from "styles";

export default function LoadingSingleCoin(props) {
  return (
    <>
      <CoinRow justify="center" gutter={16} top="true">
        <CoinCol xs={24} sm={16} md={8} lg={8} xl={6} xxl={6}>
          <CoinLoadingContainer height={"233px"} top="true">
            <StyledLoading top="35%" left="45%"/>
          </CoinLoadingContainer>
          <CoinLoadingContainer height={"48px"} padding="1rem">
            <ContentLoading color="#404040" />
          </CoinLoadingContainer>
        </CoinCol>
        <CoinCol xs={24} sm={16} md={10} lg={10} xl={8} xxl={8}>
          <CoinLoadingContainer height={"293px"}>
            <StyledLoading />
          </CoinLoadingContainer>
        </CoinCol>
        <CoinCol xs={24} sm={18} md={16} lg={16} xl={10} xxl={10}>
          <CoinLoadingContainer height={"293px"}>
            <StyledLoading />
          </CoinLoadingContainer>
        </CoinCol>
      </CoinRow>
      <StyledTitle>Description</StyledTitle>
      <CoinRow justify="center">
        <CoinCol xs={24} sm={24} md={18} lg={18} xl={24} xxl={24}>
          <CoinLoadingContainer height={"406px"}>
            <StyledLoading />
          </CoinLoadingContainer>
        </CoinCol>
      </CoinRow>
      <Row justify="center">
        <PortfolioCol xs={10} md={8}>
          <ContentLoading color="#404040" />
        </PortfolioCol>
        <PortfolioCol xs={4} md={3}>
          <ConverterButton onClick={() => console.log("Page is loading!")}>
            <RetweetOutlined />
          </ConverterButton>
        </PortfolioCol>
        <PortfolioCol xs={10} md={8}>
          <ContentLoading color="#404040" />
        </PortfolioCol>
      </Row>
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
