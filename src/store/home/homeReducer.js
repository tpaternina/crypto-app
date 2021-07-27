import {
  PARSE_QUERY_STRING,
  FETCH_ALL_COINS_SUCCESS,
  FETCH_ALL_COINS_PENDING,
  FETCH_ALL_COINS_ERROR,
  FETCH_PRICES_PENDING,
  FETCH_PRICES_SUCCESS,
  FETCH_PRICES_ERROR,
  TOGGLE_ORDER,
} from "./homeActions";

const initialState = {
  isLoading: false,
  isOverviewLoading: false,
  hasError: false,
  hasOverviewError: false,
  coinList: [],
  prices: [],
  totalVolumes: [],
  pageConfig: {
    sortBy: "marketCapRank",
    descending: false, // if true, sort in descending order, if false sort in ascending order
  },
  queryConfig: {
    perPage: 10,
    page: 1,
  },
};

const homeReducer = (state = initialState, { type, payload }) => {
  const { pageConfig, queryConfig } = state;

  switch (type) {
    case PARSE_QUERY_STRING:
      const {
        sortBy: parsedSortBy,
        descending: parsedDescending,
        currency,
      } = payload;
      return {
        ...state,
        pageConfig: {
          sortBy: parsedSortBy,
          descending: parsedDescending,
          currency,
        },
        queryConfig: {
          ...queryConfig,
        },
      };
    case FETCH_ALL_COINS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_ALL_COINS_SUCCESS:
      return {
        ...state,
        coinList: payload.data,
        isLoading: false,
        hasError: false,
      };
    case FETCH_ALL_COINS_ERROR:
      return {
        ...state,
        hasError: payload.err,
        isLoading: false,
      };
    case FETCH_PRICES_PENDING:
      return {
        ...state,
        isOverviewLoading: true,
      };
    case FETCH_PRICES_SUCCESS:
      return {
        ...state,
        prices: payload.prices,
        totalVolumes: payload.totalVolumes,
        isOverviewLoading: false,
        hasOverviewError: false,
      };
    case FETCH_PRICES_ERROR:
      return {
        ...state,
        hasOverviewError: payload.err,
      };
    case TOGGLE_ORDER:
      const { sortBy, descending } = payload;
      return {
        ...state,
        pageConfig: {
          ...pageConfig,
          sortBy,
          descending,
        },
      };
    default:
      return state;
  }
};

export default homeReducer;
