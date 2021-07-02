import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  AppContainer,
  Container,
  StyledLink,
  StyledList,
  StyledNav,
} from "./App.styles";
import { Home, Portfolio } from "pages";
import { Currency } from "components";

console.clear();

export default class App extends React.Component {
  state = {
    currency: "EUR",
  };

  handleCurrency = (newCurrency) => {
    this.setState({ currency: newCurrency });
  };

  render() {
    const { currency } = this.state;
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
            <Currency currency={currency} handleCurrency={this.handleCurrency} />
          </StyledNav>
          <Container>
            <Switch>
              <Route path="/portfolio">
                <Portfolio />
              </Route>
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
