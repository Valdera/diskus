import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import authReducer from './auth/auth.reducer';
import commentReducer from './comment/comment.reducer';
import discussionReducer from './discussion/discussion.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  auth: authReducer,
  discussion: discussionReducer,
  comment: commentReducer
});

export default persistReducer(persistConfig, rootReducer);
