import { CommentActionTypes } from './comment.types';
import { all, takeLatest, call, put } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import {
  createCommentFailure,
  createCommentSuccess,
  deleteCommentFailure,
  deleteCommentSuccess
} from './comment.actions';
import { createComment, deleteComment } from '../../api/comment.request';
import { getDiscussionStart } from '../discussion/discussion.actions';

//* WORKERS

function* workerCreateComment({ payload }) {
  try {
    const jwt = new Cookies();
    yield jwt.get('jwt', { path: '/' });
    const comment = yield createComment({
      jwt: jwt.cookies.jwt,
      data: payload
    });
    yield put(createCommentSuccess());
    yield put(getDiscussionStart(comment.discussion));
  } catch (err) {
    yield put(createCommentFailure(err));
  }
}

function* workerDeleteComment({ payload }) {
  try {
    const jwt = new Cookies();
    yield jwt.get('jwt', { path: '/' });
    yield deleteComment({
      jwt: jwt.cookies.jwt,
      id: payload.id
    });
    yield put(deleteCommentSuccess());
    yield put(getDiscussionStart(payload.discussion));
  } catch (err) {
    yield put(deleteCommentFailure(err));
  }
}

//* WATCHERS

function* watchCreateCommentStart() {
  yield takeLatest(
    CommentActionTypes.CREATE_COMMENT_START,
    workerCreateComment
  );
}

function* watchDeleteCommentStart() {
  yield takeLatest(
    CommentActionTypes.DELETE_COMMENT_START,
    workerDeleteComment
  );
}

export function* commentSagas() {
  yield all([call(watchCreateCommentStart), call(watchDeleteCommentStart)]);
}
