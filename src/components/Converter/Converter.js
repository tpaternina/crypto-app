import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Col, InputNumber } from "antd";
import { formatCurrency } from "utils";


function Converter(props) {

  const { currency, coin } = props;
  const [from, setFrom] = useState(currency);
  const [fromVal, setFromVal] = useState(1);
  const [to, setTo] = useState(coin.symbol.toUpperCase());
  const [toVal, setToVal] = useState(coin.price);

  return (
    <>
    <Col span={8}>
    <InputNumber formatter={(val) => formatCurrency(val, from)} onChange={setFromVal} defaultValue={formatCurrency(fromVal, from)} />
    </Col>
    </>
    )

}

const mapStateToProps = (state) => ({
  currency: state.app.currency,
  coin: state.coin.data,
})

export default connect(mapStateToProps)(Converter);