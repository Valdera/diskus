import { DiscussionActionTypes } from './discussion.types';
import { all, takeLatest, call, put } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import {
  fetchDiscussionsFailure,
  fetchDiscussionsSuccess,
  createDiscussionFailure,
  createDiscussionSuccess,
  getDiscussionSuccess,
  getDiscussionFailure,
  voteSuccess,
  voteFailure
} from './discussion.actions';
import {
  getAllDiscussions,
  createDiscussion,
  getDiscussionById,
  vote
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

function* workerVote({ payload }) {
  try {
    const jwt = new Cookies();
    yield jwt.get('jwt', { path: '/' });
    yield vote({
      jwt: jwt.cookies.jwt,
      id: payload.id,
      type: payload.type,
      vote: payload.vote
    });
    yield put(voteSuccess());
  } catch (err) {
    yield put(voteFailure(err));
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

function* watchFetchDiscussionsStart() {
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

function* watchVoteStart() {
  yield takeLatest(DiscussionActionTypes.VOTE_START, workerVote);
}

export function* discussionSagas() {
  yield all([
    call(watchFetchDiscussionsStart),
    call(watchCreateDiscussionStart),
    call(watchGetDiscussionStart),
    call(watchVoteStart)
  ]);
}
