import axios from "axios";
import queryString from "query-string";
import { keysToSnakeCase, keysToCamelCase } from "utils";

const PARSE_QUERY_STRING = "PARSE_QUERY_STRING";

const FETCH_ALL_COINS_SUCCESS = "FETCH_ALL_COINS_SUCCESS";
const FETCH_ALL_COINS_PENDING = "FETCH_ALL_COINS_PENDING";
const FETCH_ALL_COINS_ERROR = "FETCH_ALL_COINS_ERROR";

const TOGGLE_ORDER = "TOGGLE_ORDER";

export const fetchAllCoins = () => async (dispatch, getState) => {
  try {
    const {
      home: { queryConfig },
    } = getState();
    dispatch({
      type: FETCH_ALL_COINS_PENDING,
    });
    const query = {
      ...keysToSnakeCase(queryConfig),
      price_change_percentage: "1h,24h,7d",
      sparkline: true,
    };

    let { data } = await axios(
      queryString.stringifyUrl({
        url: process.env.REACT_APP_COINS_ENDPOINT,
        query: query,
      })
    );

    // Convert keys from API to camelCase
    data = data.map(keysToCamelCase);
    dispatch({
      type: FETCH_ALL_COINS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: FETCH_ALL_COINS_ERROR,
      payload: err,
    });
  }
};

export const parseQueryString = (location) => {
  const parsed = queryString.parse(location, {
    parseBooleans: true,
  });
  return {
    type: PARSE_QUERY_STRING,
    payload: parsed,
  };
};

export const toggleOrder = (sortBy, descending) => {
  return {
    type: TOGGLE_ORDER,
    payload: {
      sortBy,
      descending,
    },
  };
};
