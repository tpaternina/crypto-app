import {
  FETCH_COIN_INFO_PENDING,
  FETCH_COIN_INFO_SUCCESS,
  FETCH_COIN_INFO_ERROR,
} from "./coinActions";

const initialState = {
  data: {},
  isLoading: false,
  hasError: false,
};

const coinReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_COIN_INFO_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_COIN_INFO_SUCCESS:
      return {
        ...state,
        data: payload.data,
        isLoading: false,
        hasError: false,
      };

    case FETCH_COIN_INFO_ERROR:
      return {
        ...state,
        hasError: payload.err,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default coinReducer;
