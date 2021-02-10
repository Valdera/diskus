import { DiscussionActionTypes } from './discussion.types';
import { all, takeLatest, call, put } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import {
  fetchDiscussionsFailure,
  fetchDiscussionsSuccess,
  createDiscussionFailure,
  createDiscussionSuccess
} from './discussion.actions';
import {
  getAllDiscussions,
  createDiscussion
} from '../../api/discussion.request';

//* WORKERS

function* workerCreateDiscussion({ payload }) {
  try {
    const jwt = new Cookies();
    yield jwt.get('jwt', { path: '/' });
    yield createDiscussion({ jwt: jwt.cookies.jwt, discussionData: payload });
    yield put(createDiscussionSuccess());
  } catch (err) {
    yield put(createDiscussionFailure(err));
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

export function* discussionSagas() {
  yield all([call(fetchDiscussionsStart), call(watchCreateDiscussionStart)]);
}
