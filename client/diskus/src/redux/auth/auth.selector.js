import { AuthActionTypes } from './auth.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  message: ''
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };
    case AuthActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null
      };
    case AuthActionTypes.EMAIL_SIGN_UP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };
    case AuthActionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null
      };
    case AuthActionTypes.UPDATE_ME_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };
    case AuthActionTypes.DELETE_ME_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null
      };
    case AuthActionTypes.UPDATE_ME_FAILURE:
    case AuthActionTypes.DELETE_ME_FAILURE:
    case AuthActionTypes.EMAIL_SIGN_UP_FAILURE:
    case AuthActionTypes.FORGOT_PASSWORD_FAILURE:
    case AuthActionTypes.SIGN_IN_FAILURE:
    case AuthActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
