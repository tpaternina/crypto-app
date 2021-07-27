import axios from "axios";
import { keysToCamelCase } from "utils";

export const FETCH_COIN_INFO_PENDING = "FETCH_COIN_INFO_PENDING";
export const FETCH_COIN_INFO_SUCCESS = "FETCH_COIN_INFO_SUCCESS";
export const FETCH_COIN_INFO_ERROR = "FETCH_COIN_INFO_ERROR";

export const getCoinInfo = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_COIN_INFO_PENDING,
    });
    let { data } = await axios(
      `${process.env.REACT_APP_SINGLE_COIN_ENDPOINT}/${id}`
    );
    data = keysToCamelCase(data);

    dispatch({
      type: FETCH_COIN_INFO_SUCCESS,
      payload: { data },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: FETCH_COIN_INFO_ERROR,
      payload: { err },
    });
  }
};
