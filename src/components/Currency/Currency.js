import React from "react";
import { connect } from "react-redux";
import { getCurrencies, setCurrency } from "store/app/appActions";
import {
  StyledArrow,
  StyledCurrency,
  StyledDollar,
  StyledItem,
  StyledMenu,
  StyledInput,
} from "./Currency.styles";

class Currency extends React.Component {
  state = {
    isActive: false,
    searchTerm: "",
  };

  currencyInput = React.createRef();
  currencyWrapper = React.createRef();

  toggleActive = () => {
    this.setState({ searchTerm: "", isActive: !this.state.isActive });
  };

  handleSelect = ({ key }) => {
    this.setState({ isActive: false, searchTerm: "" });
    this.props.setCurrency(key.toUpperCase());
  };

  handleClickOutside = ({ target }) => {
    if (
      this.currencyWrapper &&
      !this.currencyWrapper.current.contains(target)
    ) {
      this.setState({ isActive: false, searchTerm: "" });
    }
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ searchTerm: value.toUpperCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.setCurrency(this.state.searchTerm);
    this.setState({ isActive: false, searchTerm: "" });
  };

  componentDidMount() {
    this.props.getCurrencies();

    // Add event listener for click outside event
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    // Remove event listener for click outside event
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isActive && prevState.isActive !== this.state.isActive) {
      this.currencyInput.current.focus();
    }
  }

  render() {
    const { isActive, searchTerm } = this.state;
    const {
      app: { currencyList },
      currency,
    } = this.props;
    return (
      <div ref={this.currencyWrapper}>
        <StyledCurrency onClick={this.toggleActive}>
          <StyledDollar />
          {!isActive && <span>{currency}</span>}
          {isActive && (
            <form onSubmit={this.handleSubmit}>
              <StyledInput
                ref={this.currencyInput}
                onChange={this.handleChange}
                value={searchTerm}
                placeholder="Search..."
              />
            </form>
          )}
          <StyledArrow />
        </StyledCurrency>
        {isActive && (
          <StyledMenu onClick={this.handleSelect}>
            {!!currencyList.length &&
              currencyList
                .filter((item) => item.toUpperCase().includes(searchTerm))
                .slice(0, 5)
                .map((item) => (
                  <StyledItem key={item}>{item.toUpperCase()}</StyledItem>
                ))}
          </StyledMenu>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  app: state.app,
  currency: state.app.currency,
});

const mapDispatchToProps = {
  getCurrencies,
  setCurrency,
};

export default connect(mapStateToProps, mapDispatchToProps)(Currency);
