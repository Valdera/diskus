import { CommentActionTypes } from './comment.types';

const INITIAL_STATE = {
  error: null,
  isLoading: false
};

const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CommentActionTypes.DELETE_COMMENT_START:
    case CommentActionTypes.CREATE_COMMENT_START:
      return {
        ...state,
        isLoading: true
      };
    case CommentActionTypes.DELETE_COMMENT_SUCCESS:
    case CommentActionTypes.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case CommentActionTypes.DELETE_COMMENTS_FAILURE:
    case CommentActionTypes.CREATE_COMMENT_FAILURE:
    case CommentActionTypes.FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
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
