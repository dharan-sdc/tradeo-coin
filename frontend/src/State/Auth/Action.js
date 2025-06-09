import axios from "axios";
import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, LOGIN_REQUEST, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, UPDATE_PROFILE } from "./ActionTypes";
import {
  SEND_RESET_PASSWORD_REQUEST,
  SEND_RESET_PASSWORD_SUCCESS,
  SEND_RESET_PASSWORD_FAILURE,
  VERIFY_RESET_PASSWORD_REQUEST,
  VERIFY_RESET_PASSWORD_SUCCESS,
  VERIFY_RESET_PASSWORD_FAILURE,
} from "./ActionTypes";
import api from "@/Config/api";
export const register = (UserData) => async (dispatch) => {

  dispatch({ type: REGISTER_REQUEST })

  try {
    const response = await api.post(`/auth/signup`, UserData);
    const user = response.data;
    console.log(user);

    dispatch({ type: REGISTER_SUCCESS, payload: user.jwt })
    localStorage.setItem("jwt", user.jwt);

  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message })
    console.log(error);
  }
}

export const login = (UserData) => async (dispatch) => {

  dispatch({ type: LOGIN_REQUEST })

  try {
    const response = await api.post(`/auth/signin`, UserData.data);
    const user = response.data;
    console.log(user);

    dispatch({ type: LOGIN_SUCCESS, payload: user.jwt })
    localStorage.setItem("jwt", user.jwt);
    UserData.navigate("/")
  } catch (error) {
    let errorMsg = "An error occurred"; 

    if (error.response) {
      errorMsg = error.response.data?.message || "Server error occurred";
    } else if (error.request) {
      // Request was made but no response received
      errorMsg = "No response from server. Please check your internet connection.";
    } else {
      errorMsg = error.message;
    }

    dispatch({ type: LOGIN_FAILURE, payload: errorMsg });
    console.error("Login Error:", errorMsg);
  }
}

export const getUser = (jwt) => async (dispatch) => {

  dispatch({ type: GET_USER_REQUEST })

  try {
    const response = await api.get(`/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    const user = response.data;
    console.log(user);

    dispatch({ type: GET_USER_SUCCESS, payload: user })

  } catch (e) {
    dispatch({ type: GET_USER_FAILURE, payload: e.message })
    console.log(e);
  }
}
export const updateProfile = (profileData) => ({
  type: UPDATE_PROFILE,
  payload: profileData
})
export const logout = () => (dispatch) => {
  console.log("Logging out..."); 
  localStorage.clear();
  dispatch({ type: LOGOUT });
};

export const sendResetPasswordOtp = (email) => async (dispatch) => {
  dispatch({ type: SEND_RESET_PASSWORD_REQUEST });


  try {
    const response = await api.post(`/auth/users/reset-password/send-otp`, {
      sendTo: email,
      verificationType: "EMAIL", 
    });
    localStorage.removeItem("otp");

    const sessionId = response.data.session; 
    console.log(sessionId)
    dispatch({ type: SEND_RESET_PASSWORD_SUCCESS, payload: sessionId });
    console.log(response.data)
  } catch (error) {
    let errorMsg = "An error occurred";
    if (error.response) {
      errorMsg = error.response.data?.message || "Server error occurred";
    } else if (error.request) {
      errorMsg = "No response from server. Please check your internet connection.";
    } else {
      errorMsg = error.message;
    }
    dispatch({ type: SEND_RESET_PASSWORD_FAILURE, payload: errorMsg });
    console.error("Send Reset Password OTP Error:", errorMsg);
  }
};
export const verifyResetPasswordOtp = (otp, newPassword) => async (dispatch) => {
  dispatch({ type: VERIFY_RESET_PASSWORD_REQUEST });

  const sessionId = localStorage.getItem("resetSession");
  const token = localStorage.getItem("jwt");

  if (!sessionId) {
    console.error("Session ID is missing. Requesting OTP again.");
    dispatch({ type: VERIFY_RESET_PASSWORD_FAILURE, payload: "Session expired. Request a new OTP." });
    return;
  }

  try {
    const response = await api.patch(
      `/api/users/reset-password/verify-otp`,
      { id: sessionId, otp, password: newPassword },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", 
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: VERIFY_RESET_PASSWORD_SUCCESS, payload: response.data.message });

    // Clear session data after success
    localStorage.removeItem("resetSession");
  } catch (error) {
    let errorMsg = "An error occurred";
    if (error.response) {
      errorMsg = error.response.data?.message || "Server error occurred";
    } else if (error.request) {
      errorMsg = "No response from server. Please check your internet connection.";
    } else {
      errorMsg = error.message;
    }
    dispatch({ type: VERIFY_RESET_PASSWORD_FAILURE, payload: errorMsg });
    console.error("Verify Reset Password OTP Error:", errorMsg);
  }
};
