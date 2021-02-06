import { takeLatest, put, all, call } from 'redux-saga/effects';
import { AuthActionTypes } from './auth.types';
import {
  updateMeSuccess,
  updateMeFailure,
  deleteMeSuccess,
  deleteMeFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  emailSignUpFailure,
  emailSignUpSuccess,
  forgotPasswordSuccess,
  forgotPasswordFailure
} from './auth.actions';

//* WORKERS
function* workerSignUp({ payload }) {
  try {
    // yield put(emailSignUpSuccess(user));
  } catch (err) {
    yield put(emailSignUpFailure(err));
  }
}

function* workerSignOut() {
  try {
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFailure(err));
  }
}

function* workerSignIn({ payload }) {
  try {
    // yield put(signInSuccess(user));
  } catch (err) {
    yield put(signInFailure(err));
  }
}

function* workerForgotPassword({ payload }) {
  try {
    // yield put(forgotPasswordSuccess(message));
  } catch (err) {
    yield put(forgotPasswordFailure(err));
  }
}

function* workerUpdateMe({ payload }) {
  try {
    // yield put(updateMeSuccess(user));
  } catch (err) {
    yield put(updateMeFailure(err));
  }
}

function* workerDeleteMe() {
  try {
    yield put(deleteMeSuccess());
  } catch (err) {
    yield put(deleteMeFailure(err));
  }
}
//* WATCHERS
function* watchSignUpStart() {
  yield takeLatest(AuthActionTypes.EMAIL_SIGN_UP_START, workerSignUp);
}

function* watchSignInStart() {
  yield takeLatest(AuthActionTypes.SIGN_IN_START, workerSignIn);
}

function* watchSignOutStart() {
  yield takeLatest(AuthActionTypes.SIGN_OUT_START, workerSignOut);
}

function* watchForgotPasswordStart() {
  yield takeLatest(AuthActionTypes.FORGOT_PASSWORD_START, workerForgotPassword);
}

function* watchUpdateMeStart() {
  yield takeLatest(AuthActionTypes.UPDATE_ME_START, workerUpdateMe);
}

function* watchDeleteMeStart() {
  yield takeLatest(AuthActionTypes.DELETE_ME_START, workerDeleteMe);
}

export function* authSagas() {
  yield all([
    call(watchSignInStart),
    call(watchSignUpStart),
    call(watchSignOutStart),
    call(watchForgotPasswordStart),
    call(watchUpdateMeStart),
    call(watchDeleteMeStart)
  ]);
}
