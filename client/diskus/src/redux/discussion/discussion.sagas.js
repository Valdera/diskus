import { DiscussionActionTypes } from './discussion.types';
import { all, takeLatest, call, put } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import {
  fetchDiscussionsFailure,
  fetchDiscussionsSuccess,
  createDiscussionFailure,
  createDiscussionSuccess,
  getDiscussionSuccess,
  getDiscussionFailure
} from './discussion.actions';
import {
  getAllDiscussions,
  createDiscussion,
  getDiscussionById
} from '../../api/discussion.request';
import { getMeStart } from '../auth/auth.actions';

//* WORKERS

function* workerCreateDiscussion({ payload }) {
  try {
    const jwt = new Cookies();
    yield jwt.get('jwt', { path: '/' });
    yield createDiscussion({
      jwt: jwt.cookies.jwt,
      data: payload
    });
    yield put(createDiscussionSuccess());
    yield put(getMeStart());
  } catch (err) {
    yield put(createDiscussionFailure(err));
  }
}

function* workerGetDiscussion({ payload }) {
  try {
    const discussion = yield getDiscussionById(payload);
    yield put(getDiscussionSuccess(discussion));
  } catch (err) {
    yield put(getDiscussionFailure(err));
  }
}

function* fetchDiscussionsAsync({ payload }) {
  try {
    const discussionArray = yield getAllDiscussions(payload);
    yield put(fetchDiscussionsSuccess(discussionArray));
  } catch (err) {
    yield put(fetchDiscussionsFailure(err.message));
  }
}

//* WATCHERS

function* fetchDiscussionsStart() {
  yield takeLatest(
    DiscussionActionTypes.FETCH_DISCUSSIONS_START,
    fetchDiscussionsAsync
  );
}

function* watchCreateDiscussionStart() {
  yield takeLatest(
    DiscussionActionTypes.CREATE_DISCUSSION_START,
    workerCreateDiscussion
  );
}

function* watchGetDiscussionStart() {
  yield takeLatest(
    DiscussionActionTypes.GET_DISCUSSION_START,
    workerGetDiscussion
  );
}

export function* discussionSagas() {
  yield all([
    call(fetchDiscussionsStart),
    call(watchCreateDiscussionStart),
    call(watchGetDiscussionStart)
  ]);
}
