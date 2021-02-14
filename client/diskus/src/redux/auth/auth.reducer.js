import { AuthActionTypes } from './auth.types';

const INITIAL_STATE = {
  currentUser: null,
  selectedUser: null,
  error: null,
  message: '',
  isLoading: false
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN_START:
    case AuthActionTypes.EMAIL_SIGN_UP_START:
    case AuthActionTypes.UPDATE_ME_START:
    case AuthActionTypes.RESET_PASSWORD_START:
    case AuthActionTypes.FORGOT_PASSWORD_START:
    case AuthActionTypes.DELETE_ME_START:
      return {
        ...state,
        isLoading: true
      };
    case AuthActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        isLoading: false
      };
    case AuthActionTypes.GET_ME_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };
    case AuthActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        isLoading: false
      };
    case AuthActionTypes.EMAIL_SIGN_UP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        isLoading: false
      };
    case AuthActionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
        isLoading: false
      };
    case AuthActionTypes.UPDATE_ME_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        isLoading: false
      };
    case AuthActionTypes.DELETE_ME_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        isLoading: false
      };
    case AuthActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        selectedUser: action.payload,
        error: null
      };
    case AuthActionTypes.REMOVE_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
        isLoading: false
      };
    case AuthActionTypes.CLEAN_ERROR_USER:
      return {
        ...state,
        error: null
      };
    case AuthActionTypes.CLEAN_MESSAGE_USER:
      return {
        ...state,
        message: null
      };
    case AuthActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false
      };
    case AuthActionTypes.RESET_PASSWORD_FAILURE:
    case AuthActionTypes.UPDATE_ME_FAILURE:
    case AuthActionTypes.DELETE_ME_FAILURE:
    case AuthActionTypes.EMAIL_SIGN_UP_FAILURE:
    case AuthActionTypes.FORGOT_PASSWORD_FAILURE:
    case AuthActionTypes.SIGN_IN_FAILURE:
    case AuthActionTypes.SIGN_OUT_FAILURE:
    case AuthActionTypes.GET_ME_FAILURE:
    case AuthActionTypes.GET_USER_FAILURE:
    case AuthActionTypes.FOLLOW_USER_FAILURE:
    case AuthActionTypes.UNFOLLOW_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};

export default authReducer;
