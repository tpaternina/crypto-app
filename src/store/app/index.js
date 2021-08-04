const initialState = {
  currency: "EUR",
  currencyList: [], // to redux
  hasError: false, // to redux
  isListLoading: false,
};

export const CHANGE_CURRENCY = "CHANGE_CURRENCY";
export const FETCH_CURRENCY_LIST_PENDING = "FETCH_CURRENCY_LIST_PENDING";
export const FETCH_CURRENCY_LIST_SUCCESS = "FETCH_CURRENCY_LIST_SUCCESS";
export const FETCH_CURRENCY_LIST_ERROR = "FETCH_CURRENCY_LIST_ERROR";


const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_CURRENCY:
      return {
        ...state,
        currency: payload.currency,
      };
    case FETCH_CURRENCY_LIST_PENDING:
      return {
        ...state,
        isListLoading: true,
      };
    case FETCH_CURRENCY_LIST_SUCCESS:
      return {
        ...state,
        currencyList: payload.data,
        isListLoading: false,
        hasError: false,
      };
    case FETCH_CURRENCY_LIST_ERROR:
      return {
        ...state,
        isListLoading: false,
        hasError: payload.err,
      };
    default:
      return state;
  }
};

export default appReducer;
