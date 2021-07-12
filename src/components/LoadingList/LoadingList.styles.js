import styled from "styled-components";
import { Col } from "antd";
import { SyncOutlined } from "@ant-design/icons";

export const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledLoadingIcon = styled(SyncOutlined)`
  font-size: 2.5rem;
  color: #40454f;
`;
