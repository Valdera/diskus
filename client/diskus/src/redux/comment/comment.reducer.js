import { CommentActionTypes } from './comment.types';

const INITIAL_STATE = {
  error: null
};

const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CommentActionTypes.CREATE_COMMENT_FAILURE:
    case CommentActionTypes.FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case CommentActionTypes.CLEAN_ERROR_COMMENT:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default commentReducer;
