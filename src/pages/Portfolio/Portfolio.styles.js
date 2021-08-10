import styled from "styled-components";
import { Col, Row, Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";

export const EmptyListIcon = styled(InboxOutlined)`
  color: #40454f;
  font-size: 6rem;
`;

export const StyledAnchor = styled.a`
  color: #fff;
  border-radius: 6px;
  background-color: #191b1f;

  height: 100%;
  width: 9rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-right: 1rem;
  padding-left: 1rem;

  &:hover {
    color: #06d554;
  }
`

export const StyledButton = styled.button`
  color: #fff;
  background-color: #06d554;
  padding: 1rem 4.5rem;
  text-transform: capitalize;
  border: 1px solid #06d554;
  border-radius: 6px;
  margin: 2rem auto;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: #049f3f;
    border: 1px solid #049f3f;
  }
`;

export const StyledRow = styled(Row)`
  margin-bottom: 2rem;
`

export const StyledCol = styled(Col).attrs((props) => ({
  align: props.align || "center",
  justify: props.justify || "center",
}))`
  display: flex;
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
`;

export const PlaceholderText = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #40454f;
`;

export const StyledSelect = styled(Select)`
  width: 14rem;
  text-align: left;
  box-sizing: border-box;

  color: #fff;

  & > .ant-select-selector.ant-select-selector {
    border-radius: 6px;
    border: 1px solid #191b1f;
    background-color: #191b1f;
    
  }

  & > .ant-select-arrow {
    color: #06d554;
  }
`;

export const StyledTitle = styled.h3`
  color: #fff;
  text-transform: capitalize;
  margin: 0;
`;
