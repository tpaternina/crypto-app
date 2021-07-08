import styled from "styled-components";
import { Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const StyledRow = styled(Row)`
  display: flex;
  justify-content: space-between;

  margin: 2.25rem 0;
`;



export const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledContainer = styled.div`
  font-size: 0.9rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0;
  padding: 1rem 3.5rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  border-radius: 15px;
  background-color: #191b1f;
`;

export const StyledDescription = styled.div`
  line-height: 1.35rem;
  text-align: left;
  margin-bottom: 1.5rem;
`;


export const StyledLoading = styled(LoadingOutlined)`
  font-size: 3rem;
  text-align: center;
  color: #33363e;
`;

export const StyledLayerIcon = styled.img`
  width: 20px;
  filter: invert(100%);
  margin: 1.5rem auto;
`;

export const StyledTitle = styled.h3`
  color: #fff;
`;
