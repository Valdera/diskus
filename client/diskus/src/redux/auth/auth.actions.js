import { AuthActionTypes } from './auth.types';

export const checkUserSessions = () => ({
  type: AuthActionTypes.CHECK_USER_SESSIONS
});

export const setCurrentUser = (user) => ({
  type: AuthActionTypes.SET_CURRENT_USER,
  payload: user
});

export const signInStart = (emailAndPassword) => ({
  type: AuthActionTypes.SIGN_IN_START,
  payload: emailAndPassword
});

export const signInSuccess = (user) => ({
  type: AuthActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = (error) => ({
  type: AuthActionTypes.SIGN_IN_FAILURE,
  payload: error
});

export const emailSignUpStart = (userData) => ({
  type: AuthActionTypes.EMAIL_SIGN_UP_START,
  payload: userData
});

export const emailSignUpSuccess = (user) => ({
  type: AuthActionTypes.EMAIL_SIGN_UP_SUCCESS,
  payload: user
});

export const emailSignUpFailure = (error) => ({
  type: AuthActionTypes.EMAIL_SIGN_UP_FAILURE,
  payload: error
});

export const forgotPasswordStart = (email) => ({
  type: AuthActionTypes.FORGOT_PASSWORD_START,
  payload: email
});

export const forgotPasswordSuccess = (message) => ({
  type: AuthActionTypes.FORGOT_PASSWORD_SUCCESS,
  payload: message
});

export const forgotPasswordFailure = (error) => ({
  type: AuthActionTypes.FORGOT_PASSWORD_FAILURE,
  payload: error
});

export const signOutStart = () => ({
  type: AuthActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: AuthActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = (error) => ({
  type: AuthActionTypes.SIGN_OUT_FAILURE,
  payload: error
});

export const updateMeStart = (updatedData) => ({
  type: AuthActionTypes.UPDATE_ME_START,
  payload: updatedData
});

export const updateMeSuccess = (updatedUser) => ({
  type: AuthActionTypes.UPDATE_ME_SUCCESS,
  payload: updatedUser
});

export const updateMeFailure = (error) => ({
  type: AuthActionTypes.UPDATE_ME_FAILURE,
  payload: error
});

export const deleteMeStart = () => ({
  type: AuthActionTypes.DELETE_ME_START
});

export const deleteMeSuccess = () => ({
  type: AuthActionTypes.DELETE_ME_SUCCESS
});

export const deleteMeFailure = () => ({
  type: AuthActionTypes.DELETE_ME_FAILURE
});

export const getMeStart = () => ({
  type: AuthActionTypes.GET_ME_START
});

export const getMeSuccess = (currentUser) => ({
  type: AuthActionTypes.GET_ME_SUCCESS,
  payload: currentUser
});

export const getMeFailure = (error) => ({
  type: AuthActionTypes.GET_ME_FAILURE,
  payload: error
});
