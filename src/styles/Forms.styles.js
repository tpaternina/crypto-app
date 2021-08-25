import styled from "styled-components";
import { DatePicker, InputNumber, Form, Select } from "antd";
import { mobile, tablet, medium } from "./Sizes.styles";

export const StyledSelect = styled(Select)`
  text-align: left;
  box-sizing: border-box;

  color: #fff;

  & > .ant-select-arrow {
    color: #06d554;
  }

  ${mobile} {
    width: 10rem;
    & > .ant-select-selector.ant-select-selector {
      border-radius: 6px;
      border: 1px solid #2c2d33;
      background-color: #2c2d33;
    }
  }

  ${medium} {
    width: 14rem;
    & > .ant-select-selector.ant-select-selector {
      border-radius: 6px;
      border: 1px solid #191b1f;
      background-color: #191b1f;
    }
  }
`;

/* ADD ASSET MODAL */
export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1rem 0;

  display: ${(props) => (props.destroyAddAsset ? "none" : "flex")};
  justify-content: center;
  z-index: 999;
  opacity: ${(props) => (props.openAddAsset ? "1" : "0")};
  transition: all 0.25s linear;

  ${mobile} {
    background-color: #191b1fdd;
    align-items: flex-start;
  }

  ${tablet} {
    background-color: #191b1f77;
    align-items: center;
  }
`;

export const StyledForm = styled(Form)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const StyledItem = styled(Form.Item)`
  width: 100%;

  ${mobile} {
    margin-bottom: 1rem;
  }

  ${tablet} {
    margin-bottom: default;
  }
`;

export const ModalSelect = styled(Select)`
  width: 100%;
  text-align: left;

  color: #fff;

  .ant-select-selector.ant-select-selector {
    border-radius: 6px;
    border: 1px solid #191b1f;
    background-color: #191b1f;
  }

  & > .ant-select-arrow {
    color: #06d554;
  }
`;

export const StyledInputNumber = styled(InputNumber)`
  width: 100%;
  border-radius: 6px;
  border: 1px solid #191b1f;
  background-color: #191b1f;
  color: #fff;
  padding: ${props => props.padding};
  ${mobile} {
    background-color: ${props => props.converter ? "#2c2d33" : "#191b1f"};
  }

  ${medium} {
    background-color: #191b1f;
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  border-radius: 6px;
  border: 1px solid #191b1f;
  background-color: #191b1f;

  .ant-picker-input > input {
    color: #fff;
  }

  & > div > .ant-picker-suffix .anticon-calendar {
    color: #06d554;
  }
`;