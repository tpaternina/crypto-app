import styled from "styled-components";
import { Col, DatePicker, Form, InputNumber, Select } from "antd";
import { CloseOutlined, FileImageOutlined } from "@ant-design/icons";

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #191b1f77;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CoinContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background-color: #191b1f;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div.attrs((props) => ({ width: props.width }))`
  width: ${(props) => props.width};
  border-radius: 6px;

  background-color: #2c2f36;
`;

export const LogoContainer = styled.img`
  width: 50%;
  background-color: #1f2128;
  border-radius: 6px;

  padding: 1rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
`;

export const PlaceholderText = styled.h4`
  color: #2c2f36;
`;

export const StyledButton = styled.button.attrs((props) => ({
  primary: props.primary,
}))`
  color: ${(props) => (props.primary ? "#fff" : "#06d554")};
  background-color: ${(props) => (props.primary ? "#06d554" : "#fff")};
  padding: 0.5rem 3.5rem;
  border: 1px solid ${(props) => (props.primary ? "#06d554" : "#fff")};
  border-radius: 6px;
  margin: 2rem auto;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledCoinName = styled.h4`
  color: #fff;
`;

export const StyledCol = styled(Col)`
  text-align: center;
  padding: 1rem;
`;

export const StyledClose = styled(CloseOutlined)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #06d554;
  font-weight: bold;
  font-size: 1.25rem;
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  border-radius: 6px;
  border: 1px solid #191b1f;
  background-color: #191b1f;

  .ant-picker-input > input  {
    color: #fff;
  }

  & > div > .ant-picker-suffix .anticon-calendar {
    color: #06d554;
  }
`

export const StyledFileImageIcon = styled(FileImageOutlined)`
  color: #2c2f36;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

export const StyledForm = styled(Form)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export const StyledInputNumber = styled(InputNumber)`
  width: 100%;
  border-radius: 6px;
  border: 1px solid #191b1f;
  background-color: #191b1f;
  color: #fff;
`;

export const StyledItem = styled(Form.Item)`
  width: 100%;
`

export const StyledSelect = styled(Select)`
  width: 100%;
  text-align: left;

  color: #fff;

  .ant-select-selector.ant-select-selector {
    border-radius: 6px;
    border: 1px solid #191b1f;
    background-color: #191b1f;
  }

  .ant-select-selector.ant-select-selector:hover {
    border: 1px solid #191b1f;
  }

  & > .ant-select-arrow {
    color: #06d554;
  }
`;

export const StyledTitle = styled.h3`
  color: #fff;
  font-weight: bold;
`;
