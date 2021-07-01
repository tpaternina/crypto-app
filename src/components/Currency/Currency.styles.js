import styled from "styled-components";
import { Menu } from "antd";
import { DollarCircleOutlined, DownCircleOutlined } from "@ant-design/icons";

export const StyledCurrency = styled.button`
  background-color: #2c2f36;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  border: none;
  height: fit-content;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
`;

export const StyledDollar = styled(DollarCircleOutlined)`
  margin-right: 0.5rem;
  color: #00ff5f;
`;

export const StyledArrow = styled(DownCircleOutlined)`
  margin-left: 0.5rem;
  color: #00ff5f;
`;

export const StyledInput = styled.input`
  background-color: #2c2f36;
  border: none;
  width: 2.5rem;
  margin: 0;
  padding: 0;
  font-size: 0.75rem;

  &:focus {
    outline: none;
  }
`;

export const StyledDropdownLink = styled.a`
  color: #fff;

  &:hover {
    color: #00ff5f;
  }
`;

export const StyledMenu = styled(Menu)`
  background-color: #2c2f36;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  right: 3rem;
  top: 3.5rem;
  z-index: 999;
  border: none;
`;

export const StyledItem = styled(Menu.Item)`

  &.ant-menu-item, &.ant-menu-item-only-child {
    margin: 0;
    padding: 0 1.75rem;
  }
  border: solid 0 #fff;
  border-radius: 10px;
  color: #fff;

  &::hover {
    background-color: #0b9b43;
    color: #fff;
  }
`;
