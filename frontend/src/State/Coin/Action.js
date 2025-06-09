
import api from "@/Config/api";
import {
  FETCH_COIN_LIST_REQUEST,
  FETCH_COIN_LIST_SUCCESS,
  FETCH_COIN_LIST_FAILURE,
  FETCH_TOP_50_COIN_REQUEST,
  FETCH_TOP_50_COIN_SUCCESS,
  FETCH_TOP_50_COIN_FAILURE,
  FETCH_MARKET_CHART_REQUEST,
  FETCH_MARKET_CHART_SUCCESS,
  FETCH_MARKET_CHART_FAILURE,
  FETCH_COIN_BY_ID_REQUEST,
  FETCH_COIN_BY_ID_SUCCESS,
  FETCH_COIN_BY_ID_FAILURE,
  FETCH_COIN_DETAILS_REQUEST,
  FETCH_COIN_DETAILS_SUCCESS,
  FETCH_COIN_DETAILS_FAILURE,
  SEARCH_COIN_REQUEST,
  SEARCH_COIN_SUCCESS,
  SEARCH_COIN_FAILURE,
} from "./ActionType";

// Fetch Coin List
export const getCoinList = (page) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_LIST_REQUEST });


  try {
    const { data } = await api.get(`/coins?page=${page}`);
    console.log("Coin list response:", data);
    dispatch({ type: FETCH_COIN_LIST_SUCCESS, payload: data });
  } catch (error) {

    dispatch({ type: FETCH_COIN_LIST_FAILURE, payload: error.message });
    console.log(error);
  }
};

// Fetch Top 50 Coins
export const getTop50CoinList = () => async (dispatch) => {
  dispatch({ type: FETCH_TOP_50_COIN_REQUEST });


  try {
    const response = await api.get(`/coins/top-2`);

    dispatch({ type: FETCH_TOP_50_COIN_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error fetching top 50 coins:", error);
    dispatch({ type: FETCH_TOP_50_COIN_FAILURE, payload: error.message });
  }
};

// Fetch Market Chart Data (Requires JWT Token)
export const fetchMarketChart = ({ coinId, days, jwt }) => async (dispatch) => {
  dispatch({ type: FETCH_MARKET_CHART_REQUEST });

  try {
    const validDays = days && typeof days === "number" ? days : 7;
    const response = await api.get(`/coins/${coinId}/chart?days=${validDays}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    dispatch({ type: FETCH_MARKET_CHART_SUCCESS, payload: response.data });
  } catch (error) {
    console.error(`Error fetching market chart for ${coinId}:`, error);
    dispatch({ type: FETCH_MARKET_CHART_FAILURE, payload: error.message });
  }
};

// Fetch Coin by ID
export const fetchCoinById = (coinId) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_BY_ID_REQUEST });


  try {
    const response = await api.get(`/coins/${coinId}`);
    dispatch({ type: FETCH_COIN_BY_ID_SUCCESS, payload: response.data });

  } catch (error) {
    console.log(`Error:`, error);
    dispatch({ type: FETCH_COIN_BY_ID_FAILURE, payload: error.messag });
  }
};

// Fetch Coin Details (Requires JWT Token)
export const fetchCoinDetails = ({ coinId, jwt }) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_DETAILS_REQUEST });

  try {
    const response = await api.get(`/coins/details/${coinId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    dispatch({ type: FETCH_COIN_DETAILS_SUCCESS, payload: response.data });
    console.log("Coin Detail by fetch -- :", response.data);

  } catch (error) {
    console.error("error", error);
    dispatch({
      type: FETCH_COIN_DETAILS_FAILURE,
      payload: error.message
    });
  }
};


// Search Coin
export const searchCoin = (keyword) => async (dispatch) => {
  dispatch({ type: SEARCH_COIN_REQUEST });

  try {
    const response = await api.get(`/coins/search?q=${keyword}`);

    dispatch({ type: SEARCH_COIN_SUCCESS, payload: response.data });
    console.log("Search coin : -- ", response.data);
  } catch (error) {
    console.log(response.error)
    dispatch({ type: SEARCH_COIN_FAILURE, payload: error.message });
  }
};
