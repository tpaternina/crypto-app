import styled from "styled-components";
import { Menu } from "antd";
import { Link } from "react-router-dom";

export const StyledInput = styled.input`
  margin-right: 0.85rem;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  background-color: #2c2f36;
  border: 1px solid #2c2f36;
  width: 12.5rem;

  &:focus {
    outline: none;
  }
`;

export const StyledLink = styled(Link)`
  color: #fff;
`

export const StyledMenu = styled(Menu)`
  background-color: #2c2f36;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  right: 13.15rem;
  top: 3.5rem;
  z-index: 999;
  border: none;
  width: 12.5rem;
`;

export const StyledItem = styled(Menu.Item)`

  &.ant-menu-item, &.ant-menu-item-only-child {
    margin: 0;
    padding: 0 1rem;
  }
  border: solid 0 #fff;
  border-radius: 10px;
  color: #fff;

  &::hover {
    background-color: #0b9b43;
    color: #fff;
  }
`;