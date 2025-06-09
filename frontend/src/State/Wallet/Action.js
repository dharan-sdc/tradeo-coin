import api from "@/Config/api";
import * as types from "./ActionType"


export const getUserWallet = (jwt) => async (dispatch) => {
  dispatch({ type: types.GET_USER_WALLET_REQUEST });


  try {
    const response = await api.get("/api/wallet", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({
      type: types.GET_USER_WALLET_SUCCESS,
      payload: response.data,
    });

    console.log("UserWallet : ", response.data)

  } catch (error) {
    console.log("Wallet getUserWallet : ", error);
    dispatch({
      type: types.GET_USER_WALLET_FAILURE,
      error: error.message,
    });

  }
};

export const getWalletTransaction = ({ jwt }) => async (dispatch) => {
  dispatch({ type: types.GET_WALLET_TRANSACTION_REQUEST })
  try {
    const response = await api.get("/api/transactions", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({
      type: types.GET_WALLET_TRANSACTION_SUCCESS,
      payload: response.data,
    });
    console.log("getWalletTransaction -> transaction : ", response.data);
  } catch (error) {
    console.log("Error getWalletTransaction -> transaction :", error)
    dispatch({
      type: types.GET_WALLET_TRANSACTION_FAILURE,
      error: error.message,
    });
  }
}

export const depositeMoney = ({ jwt, orderId, paymentId, navigate }) => async (dispatch) => {
  dispatch({ type: types.DEPOSIT_MONEY_REQUEST });

  console.log("orderId and PaymentId : --", orderId, paymentId)
  try {
    const response = await api.put(`/api/wallet/deposit`, null, {
      params: {
        order_id: orderId,
        payment_id: paymentId,
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    })
    dispatch({
      type: types.DEPOSIT_MONEY_SUCCESS,
      payload: response.data,
    });
    navigate("/wallet")
    console.log("depositeMoney : ", response.data)
  } catch (error) {
    console.log("Error depositeMoney : ", error);
    dispatch({
      type: types.DEPOSIT_MONEY_FAILURE,
      error: error.message,
    })
  }
}

export const paymentHandler = ({ jwt, amount, paymentMethod }) => async (dispatch) => {
  dispatch({ type: types.DEPOSIT_MONEY_REQUEST })

  try {
    const res = await api.post(
      `/api/payment/${paymentMethod}/amount/${amount}`,
      null, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    );
    window.location.href = res.data.payment_url;

  } catch (error) {
    console.log("Error paymentHandler : ", error);
    dispatch({
      type: types.DEPOSIT_MONEY_FAILURE,
      error: error.message,
    })
  }
}

export const transferMoney = ({ jwt, walletId, reqData }) => async (dispatch) => {
  dispatch({ type: types.TRANSFER_MONEY_REQUEST });
  try {
    const response = await api.put(
      `/api/wallet/${walletId}/transfer`,
      reqData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch({
      type: types.TRANSFER_MONEY_SUCCESS,
      payload: response.data,
    })
    console.log("transfer money Sent -- ", response.data)
  } catch (error) {
    dispatch({
      type: types.TRANSFER_MONEY_FAILURE,
      error: error.message,
    })
  }
}
