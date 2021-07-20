const initialState = {
  isLoading: false,
  hasError: false,
  coinList: [],
  pageConfig: {
    sortBy: "marketCapRank",
    descending: false, // if true, sort in descending order, if false sort in ascending order
  },
  queryConfig: {
    vsCurrency: "eur",
    perPage: 10,
    page: 1,
  },
};

const homeReducer = (state = initialState, { type, payload }) => {
  const { pageConfig, queryConfig } = state;

  switch (type) {
    case "PARSE_QUERY_STRING":
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
        },
        queryConfig: {
          ...queryConfig,
          vsCurrency: currency,
        },
      };
    case "FETCH_ALL_COINS_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ALL_COINS_SUCCESS":
      return {
        ...state,
        coinList: payload,
        isLoading: false,
      };
    case "FETCH_ALL_COINS_ERROR":
      return {
        ...state,
        hasError: payload,
        isLoading: false,
      };
    case "TOGGLE_ORDER":
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
