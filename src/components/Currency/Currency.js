import React from "react";
import { DownCircleOutlined } from "@ant-design/icons";
import { StyledCurrency, StyledDollar, StyledInput } from "./Currency.styles";

export default class Currency extends React.Component {
  state = {
    currency: this.props.currency,
    searchTerm: "",
    currencyList: [],
    isActive: false,
  };

  handleClick = (e) => {
    console.log("click!");
    this.setState({ isActive: !this.state.isActive });
    // GET AND DISPLAY LIST OF COINS
  };

  handleChange = (e) => {
    const {
      target: { value },
    } = e;
    this.setState({ searchTerm: value });
  };

  render() {
    return (
      <StyledCurrency>
        <StyledDollar />
        {!this.state.isActive && <span>{this.state.currency}</span>}
        {this.state.isActive && (
          <form>
            <StyledInput value={this.state.currency} />
          </form>
        )}
        <DownCircleOutlined onClick={this.handleClick} />
      </StyledCurrency>
    );
  }
}
