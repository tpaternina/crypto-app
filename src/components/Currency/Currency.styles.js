import styled from "styled-components";
import { DollarCircleOutlined } from "@ant-design/icons"

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
`;

export const StyledInput = styled.input`
  background-color: #2c2f36;
  border: none;
  width: min-content;
  margin: 0;
  padding: 0;

`