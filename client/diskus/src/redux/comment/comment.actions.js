import { CommentActionTypes } from './comment.types';

export const createCommentStart = (data) => ({
  type: CommentActionTypes.CREATE_COMMENT_START,
  payload: data
});

export const createCommentSuccess = () => ({
  type: CommentActionTypes.CREATE_COMMENT_SUCCESS
});

export const createCommentFailure = (err) => ({
  type: CommentActionTypes.CREATE_COMMENT_FAILURE,
  payload: err
});
