import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppContainer, Container, StyledLink, StyledList, StyledNav } from "./App.styles";
import { Home, Portfolio } from "pages";
import { Currency } from "components";

console.clear();

export default function App() {
  const currency = "eur";
  return (
    <AppContainer>
      <Router>
        <StyledNav>
          <StyledList style={{margin: 0}}>
            <li>
              <StyledLink to="/">Coins</StyledLink>
            </li>
            <li>
              <StyledLink to="/portfolio">Portfolio</StyledLink>
            </li>
          </StyledList>
          <Currency currency={currency} />
        </StyledNav>
        <Container>
          <Switch>
            <Route path="/portfolio">
              <Portfolio />
            </Route>
            <Route path="/" component={(props) => <Home currency={currency} {...props} />} />
          </Switch>
        </Container>
      </Router>
    </AppContainer>
  );
}
