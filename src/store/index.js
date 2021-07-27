import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import app from "./app/appReducer";
import coin from "./coin/coinReducer";
import home from "./home/homeReducer";
import portfolio from "./portfolio/portfolioReducer";

console.log(app)

const reducers = combineReducers({
  app,
  home,
  portfolio,
  coin
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
