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
import { Currency, GlobalInfo } from "components";

console.clear();

export default function App() {
  const currency = "eur";
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
          <Currency currency={currency} />
        </StyledNav>
        <Container>
          <GlobalInfo currency={currency} />
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
