import { Row } from "antd";
import {
  ChartCol,
  ChartContainer,
  StyledLoading,
  NarrowDiv,
  WideDiv,
} from "styled";

export default function ChartLoading(props) {
  return (
    <>
      <WideDiv>
        <Row>
          <ChartCol justify="start" span={12}>
            <ChartContainer>
              <StyledLoading />
            </ChartContainer>
          </ChartCol>
          <ChartCol justify="end" span={12}>
            <ChartContainer>
              <StyledLoading />
            </ChartContainer>
          </ChartCol>
        </Row>
      </WideDiv>
      <NarrowDiv>
        <ChartContainer>
          <StyledLoading />
        </ChartContainer>
      </NarrowDiv>
    </>
  );
}
