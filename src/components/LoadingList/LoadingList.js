import { Row } from "antd";
import { StyledCol, StyledLoadingIcon } from "./LoadingList.styles";

export default function LoadingList(props) {
  return (
    <Row justify="center">
      <StyledCol span={4}>
        <StyledLoadingIcon spin />
      </StyledCol>
    </Row>
  );
}
