import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RetweetOutlined } from "@ant-design/icons";
import {
  ConverterButton,
  CurrencyTag,
  StyledInputNumber,
  PortfolioCol,
} from "styled";

function Converter(props) {
  const { currency, coin } = props;

  const symbol = coin.symbol.toUpperCase();

  const [price, setPrice] = useState(coin.marketData.currentPrice[currency.toLowerCase()]);

  const [from, setFrom] = useState(symbol);
  const [fromVal, setFromVal] = useState(1);
  const [to, setTo] = useState(currency);
  const [toVal, setToVal] = useState(price);

  const convertTo = (val) => {
    setFromVal(val);
    setToVal((val * price).toFixed(2));
  };

  const convertFrom = (val) => {
    setToVal(val);
    setFromVal((val / price).toFixed(2));
  };

  useEffect(
    () => setPrice(1 / price), 
    // eslint-disable-next-line
    [from, to]
  );

  return (
    <>
      <PortfolioCol
        span={8}
      >
        <StyledInputNumber
          type="number"
          min={0}
          onChange={(val) => (val ? convertTo(val) : convertTo(1))}
          value={fromVal}
          padding="0 0 0 3.5rem"
          initialValue={fromVal}
        />
        <CurrencyTag>{from}</CurrencyTag>
      </PortfolioCol>
      <PortfolioCol span={3}>
        <ConverterButton
          onClick={() => {
            let temp = from;
            setFrom(to);
            setTo(temp);
            convertTo(fromVal);
          }}
        >
          <RetweetOutlined />
        </ConverterButton>
      </PortfolioCol>
      <PortfolioCol
        span={8}
      >
        <StyledInputNumber
          type="number"
          min={0}
          onChange={(val) => (val ? convertFrom(val) : convertFrom(1))}
          value={toVal}
          padding="0 0 0 3.5rem"
        />
        <CurrencyTag>{to}</CurrencyTag>
      </PortfolioCol>
    </>
  );
}

const mapStateToProps = (state) => ({
  currency: state.app.currency,
  coin: state.coin.data,
});

export default connect(mapStateToProps)(Converter);
