import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import app from "./app";
import coin from "./coin";
import home from "./home";
import portfolio from "./portfolio";

// Local storage (save asset list only)
const portfolioPersistConfig = {
  key: "portfolio",
  storage,
  whitelist: ["assetList"],
};

const rootReducer = combineReducers({
  app,
  home,
  portfolio: persistReducer(portfolioPersistConfig, portfolio),
  coin,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["app", "portfolio", "home", "coin"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Add middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store and persistor
export const store = composeEnhancers(
  applyMiddleware(thunk)
)(createStore)(persistedReducer);
export const persistor = persistStore(store);
