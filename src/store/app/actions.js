import axios from "axios";
import {
  CHANGE_CURRENCY,
  FETCH_CURRENCY_LIST_PENDING,
  FETCH_CURRENCY_LIST_SUCCESS,
  FETCH_CURRENCY_LIST_ERROR,
} from "./index";

export const setCurrency = (currency) => {
  return {
    type: CHANGE_CURRENCY,
    payload: { currency },
  };
};

export const getCurrencies = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_CURRENCY_LIST_PENDING,
    });
    const { data } = await axios(process.env.REACT_APP_VS_COINS_ENDPOINT);

    dispatch({
      type: FETCH_CURRENCY_LIST_SUCCESS,
      payload: { data },
    });
  } catch (err) {
    dispatch({
      type: FETCH_CURRENCY_LIST_ERROR,
      payload: { err },
    });
  }
};
