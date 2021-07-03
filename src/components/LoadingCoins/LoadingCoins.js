import { ContentLoading, StyledCol, StyledRow } from "./LoadingCoins.styles";

export default function LoadingCoins() {
  return (
    <>
      {[...Array(5)].map((item) => (
        <StyledRow>
          <StyledCol span={1}>
            <ContentLoading />
          </StyledCol>
          <StyledCol span={3}>
            <ContentLoading />
          </StyledCol>
          <StyledCol span={2}>
            <ContentLoading />
          </StyledCol>
          <StyledCol span={2}>
            <ContentLoading />
          </StyledCol>
          <StyledCol span={2}>
            <ContentLoading />
          </StyledCol>
          <StyledCol span={2}>
            <ContentLoading />
          </StyledCol>
          <StyledCol span={4}>
            <ContentLoading />
          </StyledCol>
          <StyledCol span={4}>
            <ContentLoading />
          </StyledCol>
          <StyledCol span={4}>
            <ContentLoading />
          </StyledCol>
        </StyledRow>
      ))}
    </>
  );
}
