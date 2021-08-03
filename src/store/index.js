import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { merge } from "lodash";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  createReduxLocationActions,
  listenForHistoryChange,
} from "redux-location-state";
import createBrowserHistory from "history/createBrowserHistory";

import app from "./app/appReducer";
import coin from "./coin/coinReducer";
import home from "./home/homeReducer";
import portfolio from "./portfolio/portfolioReducer";

const rootReducer = combineReducers({
  app,
  home,
  portfolio,
  coin,
});

// Local storage
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["portfolio"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Location state
const paramSetup = {
  "/": {
    sortBy: {
      stateKey: "home.pageConfig.sortBy",
      options: { shouldPush: true },
    },
    descending: {
      stateKey: "home.pageConfig.descending",
      type: "bool",
      options: { shouldPush: true },
    },
  },
  global: {
    currency: { stateKey: "app.currency", options: { shouldPush: true } },
  },
};

const mapLocationToState = (state, location) => {
  console.log(location.query);
  switch (location.pathname) {
    case "/":
      return merge(
        {},
        state,
        location.query.home.pageConfig,
        location.query.app.currency
      );
    default:
      return merge({}, state, location.query.app.currency);
  }
};

const history = createBrowserHistory();

const { locationMiddleware, reducersWithLocation } = createReduxLocationActions(
  paramSetup,
  mapLocationToState,
  history,
  persistedReducer
);

// Add middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store and persistor
export const store = composeEnhancers(
  applyMiddleware(thunk, locationMiddleware)
)(createStore)(reducersWithLocation);
export const persistor = persistStore(store);

// State update
listenForHistoryChange(store, history);
