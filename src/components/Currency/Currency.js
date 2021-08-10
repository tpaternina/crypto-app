import React, { useEffect } from "react";
import { connect } from "react-redux";
import { DownCircleOutlined } from "@ant-design/icons";
import { getCurrencies, setCurrency } from "store/app/actions";
import { Container, StyledDollar, StyledSelect } from "./Currency.styles";

const { Option } = StyledSelect;

function Currency(props) {
  const input = React.createRef();

  const { currency, currencyList, getCurrencies, setCurrency } = props;

  const handleSelect = (value) => {
    setCurrency(value.toUpperCase());
    input.current.blur();
  };

  useEffect(() => getCurrencies(), []);

  return (
    <Container>
      <StyledSelect
        ref={input}
        value={currency}
        showSearch
        placeholder="New currency"
        onChange={handleSelect}
        suffixIcon={<DownCircleOutlined />}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {currencyList.map((el) => (
          <Option key={el} value={el}>{el.toUpperCase()}</Option>
        ))}
      </StyledSelect>
      <StyledDollar />
    </Container>
  );
}

const mapStateToProps = (state) => ({
  currencyList: state.app.currencyList,
  currency: state.app.currency,
});

const mapDispatchToProps = {
  getCurrencies,
  setCurrency,
};

export default connect(mapStateToProps, mapDispatchToProps)(Currency);
