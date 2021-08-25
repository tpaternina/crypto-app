import { Row } from "antd";
import {
  ChartCol,
  ChartContainer,
  StyledLoading,
  NarrowDivChart,
  WideDivChart,
} from "styles";

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
      </WideDivChart>
      <NarrowDivChart>
        <ChartContainer>
          <StyledLoading />
        </ChartContainer>
      </NarrowDivChart>
    </>
  );
}
