import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import app from "./app/appReducer"
import home from "./home/homeReducer";
import portfolio from "./portfolio/portfolioReducer";

const reducers = combineReducers({
  app,
  home,
  portfolio
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
