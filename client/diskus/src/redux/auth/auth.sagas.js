import { takeLatest, put, all, call } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
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
  forgotPasswordFailure,
  getMeSuccess,
  getMeFailure,
  getUserSuccess,
  getUserFailure
} from './auth.actions';
import {
  signIn,
  signUp,
  forgotPassword,
  deleteMe,
  updateMe,
  getFollowing,
  getDiscussions,
  getMe,
  getUserById
} from '../../api/auth.request';

//* WORKERS
function* workerSignUp({ payload }) {
  try {
    const { user, token } = yield signUp(payload);
    const cookies = new Cookies();
    yield cookies.set('jwt', token, { path: '/' });
    yield put(emailSignUpSuccess(user));
  } catch (err) {
    yield put(emailSignUpFailure(err));
  }
}

function* workerSignOut() {
  try {
    const cookies = new Cookies();
    yield cookies.remove('jwt', { path: '/' });
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFailure(err));
  }
}

function* workerSignIn({ payload }) {
  try {
    const { user, token } = yield signIn(payload);
    const cookies = new Cookies();
    yield cookies.set('jwt', token, { path: '/' });
    user.followingDetail = yield getFollowing(cookies.cookies.jwt);
    user.discussions = yield getDiscussions(cookies.cookies.jwt);
    yield put(signInSuccess(user));
  } catch (err) {
    yield put(signInFailure(err));
  }
}

function* workerForgotPassword({ payload }) {
  try {
    const message = yield forgotPassword(payload);
    yield put(forgotPasswordSuccess(message));
  } catch (err) {
    yield put(forgotPasswordFailure(err));
  }
}

function* workerUpdateMe({ payload }) {
  try {
    const cookies = new Cookies();
    yield cookies.get('jwt', { path: '/' });
    const user = yield updateMe({
      jwt: cookies.cookies.jwt,
      updatedData: payload
    });
    user.followingDetail = yield getFollowing(cookies.cookies.jwt);
    user.discussions = yield getDiscussions(cookies.cookies.jwt);
    yield put(updateMeSuccess(user));
  } catch (err) {
    yield put(updateMeFailure(err));
  }
}

function* workerGetMe() {
  try {
    const cookies = new Cookies();
    yield cookies.get('jwt', { path: '/' });
    const user = yield getMe(cookies.cookies.jwt);
    user.followingDetail = yield getFollowing(cookies.cookies.jwt);
    user.discussions = yield getDiscussions(cookies.cookies.jwt);
    yield put(getMeSuccess(user));
  } catch (err) {
    yield put(getMeFailure(err));
  }
}

function* workerGetUser({ payload }) {
  try {
    const cookies = new Cookies();
    yield cookies.get('jwt', { path: '/' });
    const user = yield getUserById({
      jwt: cookies.cookies.jwt,
      id: payload
    });
    // console.log(user);
    yield put(getUserSuccess(user));
  } catch (err) {
    yield put(getUserFailure(err));
  }
}

function* workerDeleteMe() {
  try {
    const cookies = new Cookies();
    yield cookies.get('jwt', { path: '/' });
    yield deleteMe(cookies.cookies.jwt);
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

function* watchGetMeStart() {
  yield takeLatest(AuthActionTypes.GET_ME_START, workerGetMe);
}

function* watchGetUserStart() {
  yield takeLatest(AuthActionTypes.GET_USER_START, workerGetUser);
}

export function* authSagas() {
  yield all([
    call(watchSignInStart),
    call(watchSignUpStart),
    call(watchSignOutStart),
    call(watchForgotPasswordStart),
    call(watchUpdateMeStart),
    call(watchDeleteMeStart),
    call(watchGetMeStart),
    call(watchGetUserStart)
  ]);
}
