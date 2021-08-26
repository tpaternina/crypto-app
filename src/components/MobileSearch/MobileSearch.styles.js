import styled from "styled-components";
import { Select } from "antd";
import { mobile, tablet } from "styles/Sizes.styles";

export const StyledSelect = styled(Select)`
  ${mobile} {
    margin-right: 0.85rem;
    width: 12.5rem;
    text-align: left;

    color: #fff;

    .ant-select-selector.ant-select-selector {
      border-radius: 6px;
      border: 1px solid #2c2f36;
      background-color: #2c2f36;
    }

    & > .ant-select-arrow {
      color: #06d554;
    }
  }

  ${tablet} {
    margin-right: 0.85rem;
    width: 12.5rem;
    text-align: left;

    color: #fff;

    .ant-select-selector.ant-select-selector {
      border-radius: 6px;
      border: 1px solid #2c2f36;
      background-color: #2c2f36;
    }

    & > .ant-select-arrow {
      color: #06d554;
    }
  }
`;
