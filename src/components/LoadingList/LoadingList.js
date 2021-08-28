import { Col, Row } from "antd";
import { StyledLoadingList } from "styles";

export default function LoadingList(props) {
  return (
    <Row justify="center">
      <Col>
        <StyledLoadingList spin />
      </Col>
    </Row>
  );
}
