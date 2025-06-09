import {
  SEND_RESET_PASSWORD_REQUEST,
  SEND_RESET_PASSWORD_SUCCESS,
  SEND_RESET_PASSWORD_FAILURE,
  VERIFY_RESET_PASSWORD_REQUEST,
  VERIFY_RESET_PASSWORD_SUCCESS,
  VERIFY_RESET_PASSWORD_FAILURE,
  REGISTER_REQUEST,
  LOGIN_REQUEST,
  GET_USER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  GET_USER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_FAILURE,
  GET_USER_FAILURE,
  UPDATE_PROFILE,
  LOGOUT,
} from "./ActionTypes";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: null,
  resetPasswordSessionId: null, 
  resetPasswordMessage: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case SEND_RESET_PASSWORD_REQUEST:
    case VERIFY_RESET_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, loading: false, error: null, jwt: action.payload };

    case GET_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null };

    case SEND_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPasswordSessionId: action.payload,
      };

    case VERIFY_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPasswordMessage: action.payload,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case SEND_RESET_PASSWORD_FAILURE:
    case VERIFY_RESET_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_PROFILE:
      return { ...state, user: { ...state.user, ...action.payload } };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;