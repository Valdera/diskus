import { all, call } from 'redux-saga/effects';
import { authSagas } from './auth/auth.sagas';
import { discussionSagas } from './discussion/discussion.sagas';

export default function* rootSaga() {
  yield all([call(authSagas), call(discussionSagas)]);
}
