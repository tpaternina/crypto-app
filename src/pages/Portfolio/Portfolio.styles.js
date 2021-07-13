import styled from "styled-components";
import { Col } from "antd"
import { InboxOutlined } from "@ant-design/icons";

export const EmptyListIcon = styled(InboxOutlined)`
  color: #40454f;
  font-size: 6rem;
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
`

export const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const PlaceholderText = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #40454f;
`

export const StyledTitle = styled.h3`
  color: #fff;
  text-transform: capitalize;
  margin-bottom: 2rem;
`