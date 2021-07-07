import styled from "styled-components";
import { Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const StyledRow = styled(Row)`
  display: flex;
  justify-content: space-between;

  border: 1px solid white;
`;

export const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid white;
`;

export const StyledLoading = styled(LoadingOutlined)`
  font-size: 3rem;
  text-align: center;
  color: #33363e;
`;

export const StyledTitle = styled.h3`
  color: #fff;
`;
