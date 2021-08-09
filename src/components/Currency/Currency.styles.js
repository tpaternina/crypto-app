import styled from "styled-components";
import { Select } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";

export const StyledSelect = styled(Select)`
  width: 5.5rem;
  box-sizing: border-box;
  text-align: left;

  color: #fff;

  .ant-select-selector.ant-select-selector {
    border-radius: 6px;
    border: 1px solid #191b1f;
    background-color: #2c2f36;
    text-transform: uppercase;
    padding: 0.3rem 0.5rem 0.3rem 1.75rem;
    height: fit-content;
  }

  .ant-select-selector.ant-select-selector:hover {
    border-color: #06d554;
  }

  .ant-select-selector.ant-select-selector:focus {
    border-color: #06d554;
    outline: none;
  }

  & > .ant-select-arrow {
    color: #06d554;
  }
`;

export const Container = styled.div`
  position: relative;
`;

export const StyledDollar = styled(DollarCircleOutlined)`
  position: absolute;
  top: 50%;
  left: 0.65rem;
  transform: translate(0%, -50%);
  margin-right: 0.5rem;
  color: #00ff5f;
`;