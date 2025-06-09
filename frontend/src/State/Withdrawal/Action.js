import api from "@/Config/api";
import {
  ADD_PAYMENT_DETAILS_FAILURE,
  ADD_PAYMENT_DETAILS_REQUEST,
  ADD_PAYMENT_DETAILS_SUCCESS,
  GET_PAYMENT_DETAILS_FAILURE,
  GET_PAYMENT_DETAILS_REQUEST,
  GET_PAYMENT_DETAILS_SUCCESS,
  GET_WITHDRAWAL_HISTORY_FAILURE,
  GET_WITHDRAWAL_HISTORY_REQUEST,
  GET_WITHDRAWAL_HISTORY_SUCCESS,
  GET_WITHDRAWAL_REQUEST_FAILURE,
  GET_WITHDRAWAL_REQUEST_REQUEST,
  GET_WITHDRAWAL_REQUEST_SUCCESS,
  WITHDRAWAL_FAILURE,
  WITHDRAWAL_PROCEED_FAILURE,
  WITHDRAWAL_PROCEED_REQUEST,
  WITHDRAWAL_PROCEED_SUCCESS,
  WITHDRAWAL_REQUEST,
  WITHDRAWAL_SUCCESS
} from "./ActionType";

// Withdraw request
export const withdrawalRequest = ({ amount, jwt }) => async dispatch => {
  dispatch({ type: WITHDRAWAL_REQUEST });

  try {
    const response = await api.post(`/api/withdrawal/${amount}`, null, {
      headers: { Authorization: `Bearer ${jwt}` }  // Fixed 'header' to 'headers'
    });

    console.log("Withdrawal --- ", response.data);

    dispatch({
      type: WITHDRAWAL_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: WITHDRAWAL_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Proceed with withdrawal
export const proceedwithdrawal = ({ id, jwt, accept }) => async dispatch => {
  dispatch({ type: WITHDRAWAL_PROCEED_REQUEST });  // Fixed typo from 'typr' to 'type'

  try {
    const response = await api.patch(`/api/admin/withdrawal/${id}/proceed/${accept}`, null, {
      headers: { Authorization: `Bearer ${jwt}` }  // Fixed 'header' to 'headers'
    });

    console.log("Proceed withdrawal --- ", response.data);

    dispatch({
      type: WITHDRAWAL_PROCEED_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: WITHDRAWAL_PROCEED_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get withdrawal history
export const getWithdrawalHistory = jwt => async dispatch => {
  dispatch({ type: GET_WITHDRAWAL_HISTORY_REQUEST });

  try {
    const response = await api.get("/api/withdrawal", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    console.log("Get Withdrawal history --- ", response.data);

    dispatch({
      type: GET_WITHDRAWAL_HISTORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_WITHDRAWAL_HISTORY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get all withdrawal requests (Admin)
export const getAllWithdrawalRequest = jwt => async dispatch => {
  dispatch({ type: GET_WITHDRAWAL_REQUEST_REQUEST });

  try {
    const response = await api.get("/api/admin/withdrawal", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    console.log("Get withdrawal requests ---- ", response.data);

    dispatch({
      type: GET_WITHDRAWAL_REQUEST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching withdrawal requests:", error);

    dispatch({
      type: GET_WITHDRAWAL_REQUEST_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Add payment details
export const addPaymentDetails = ({ paymentDetails, jwt }) => async dispatch => {
  dispatch({ type: ADD_PAYMENT_DETAILS_REQUEST });

  try {
    const response = await api.post("/api/payment-details", paymentDetails, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    console.log("Add payment details 1 -----", response.data);

    dispatch({
      type: ADD_PAYMENT_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error adding payment details:", error);

    dispatch({
      type: ADD_PAYMENT_DETAILS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get payment details
export const getPaymentDetails = ({ jwt }) => async dispatch => {
  dispatch({ type: GET_PAYMENT_DETAILS_REQUEST });

  try {
    const response = await api.get("/api/payment-details", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    console.log("Get payment details 2 -----", response.data);

    dispatch({
      type: GET_PAYMENT_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching payment details:", error);

    dispatch({
      type: GET_PAYMENT_DETAILS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
