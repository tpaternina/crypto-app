import { Row, Col } from "antd";
import { StyledDisconnected, PlaceholderText } from "styles";

export default function ErrorList(props) {
  return (
    <>
      <Row justify="center" align="center">
        <Col>
          <StyledDisconnected color="#fff" />
        </Col>
      </Row>
      <Row justify="center" align="center">
        <Col>
          <PlaceholderText size="1rem">Unable to fetch data :(</PlaceholderText>
        </Col>
      </Row>
    </>
  );
}
