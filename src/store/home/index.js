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
  timeRange: 30,
  openSearch: false,
  destroySearch: true,
};

export const FETCH_ALL_COINS_SUCCESS = "FETCH_ALL_COINS_SUCCESS";
export const FETCH_ALL_COINS_PENDING = "FETCH_ALL_COINS_PENDING";
export const FETCH_ALL_COINS_ERROR = "FETCH_ALL_COINS_ERROR";

export const FETCH_PRICES_PENDING = "FETCH_PRICES_PENDING";
export const FETCH_PRICES_SUCCESS = "FETCH_PRICES_SUCCESS";
export const FETCH_PRICES_ERROR = "FETCH_PRICES_ERROR";

export const SET_TIME_RANGE = "SET_TIME_RANGE";

export const TOGGLE_ORDER = "TOGGLE_ORDER";

export const SEARCH_PAGE_OPEN = "SEARCH_PAGE_OPEN";
export const SEARCH_PAGE_UNOPEN = "SEARCH_PAGE_UNOPEN";
export const SEARCH_PAGE_DESTROY = "SEARCH_PAGE_DESTROY";
export const SEARCH_PAGE_UNDESTROY = "SEARCH_PAGE_UNDESTROY";

const homeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
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
        prices: [],
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
        prices: [],
      };
    case SET_TIME_RANGE:
      return {
        ...state,
        timeRange: payload.timeRange,
      }
    case TOGGLE_ORDER:
      const { sortBy, descending } = payload;
      return {
        ...state,
        pageConfig: {
          sortBy,
          descending,
        },
      };
    case SEARCH_PAGE_UNDESTROY:
      return {
        ...state,
        destroySearch: false,
      };
    case SEARCH_PAGE_OPEN: 
      return {
        ...state,
        openSearch: true,
      };
    case SEARCH_PAGE_UNOPEN: 
      return {
        ...state,
        openSearch: false,
      };
    case SEARCH_PAGE_DESTROY:
      return {
        ...state,
        destroySearch: true,
      };
    default:
      return state;
  }
};

export default homeReducer;
