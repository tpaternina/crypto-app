import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import queryString from "query-string";
import {
  AppContainer,
  Container,
  StyledLink,
  StyledList,
  StyledNav,
} from "./App.styles";
import { Coin, Home, Portfolio } from "pages";
import { Currency, GlobalInfo, SearchCoin } from "components";
import { setCurrency } from "store/app/appActions";

console.clear();

class App extends React.Component {
  state = {
    currency: "EUR",
  };

  handleCurrency = (newCurrency) => {
    this.setState({ currency: newCurrency });
  };

  componentDidMount() {
    if (window.location.search) {
      const { currency } = queryString.parse(window.location.search);
      this.setState({ currency });
    } else {
      this.setState({ currency: "EUR" });
    }
  }

  render() {
    const { app: {currency}, setCurrency } = this.props;
    return (
      <AppContainer>
        <Router>
          <StyledNav>
            <StyledList>
              <li>
                <StyledLink exact activeClassName="selected" to="/">
                  Coins
                </StyledLink>
              </li>
              <li>
                <StyledLink exact activeClassName="selected" to="/portfolio">
                  Portfolio
                </StyledLink>
              </li>
            </StyledList>
            <StyledList>
              <SearchCoin />
              <Currency
                currency={currency}
                setCurrency={setCurrency}
              />
            </StyledList>
          </StyledNav>
          <Container>
            <GlobalInfo currency={currency} />
            <Switch>
              <Route
                path="/coins/:id"
                component={(props) => <Coin currency={currency} {...props} />}
              />
              <Route
                path="/portfolio"
                component={(props) => (
                  <Portfolio {...props} currency={currency} />
                )}
              />
              <Route
                path="/"
                component={(props) => <Home currency={currency} {...props} />}
              />
            </Switch>
          </Container>
        </Router>
      </AppContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = () => ({
  setCurrency,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
