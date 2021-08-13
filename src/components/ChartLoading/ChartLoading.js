import { Row } from "antd";
import {ChartCol, ChartContainer, StyledLoading, NarrowDiv, WideDiv} from "styled";


export default function ChartLoading(props) {
  return (
    <>
      <WideDiv>
        <Row>
          <ChartCol>
            <ChartContainer>
              <StyledLoading />
            </ChartContainer>
            <ChartContainer>
              <StyledLoading />
            </ChartContainer>
          </ChartCol>
        </Row>
      </WideDiv>
      <NarrowDiv>
        <ChartCol>
          <ChartContainer>
            <StyledLoading />
          </ChartContainer>
        </ChartCol>
      </NarrowDiv>
    </>
  );
}
