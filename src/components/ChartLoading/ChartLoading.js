import { Row } from "antd";
import {
  ChartCol,
  ChartContainer,
  ContentLoading,
  StyledLoading,
  NarrowDivChart,
  WideDivChart,
} from "styled";

export default function ChartLoading(props) {
  return (
    <>
      <WideDivChart>
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
        <Row justify="center">
          <ChartCol xs={24} sm={18} md={15} lg={12}>
            <ChartContainer timeRange>
              <ContentLoading color="#22252d" />
            </ChartContainer>
          </ChartCol>
        </Row>
      </WideDivChart>
      <NarrowDivChart>
        <ChartContainer>
          <StyledLoading />
        </ChartContainer>
        <Row justify="center">
          <ChartCol xs={24} sm={19}>
            <ChartContainer timeRange>
              <ContentLoading color="#22252d" />
            </ChartContainer>
          </ChartCol>
        </Row>
      </NarrowDivChart>
    </>
  );
}
