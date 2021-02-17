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

export const cleanErrorComment = () => ({
  type: CommentActionTypes.CLEAN_ERROR_COMMENT
});

export const deleteCommentStart = (data) => ({
  type: CommentActionTypes.DELETE_COMMENT_START,
  payload: data
});

export const deleteCommentSuccess = () => ({
  type: CommentActionTypes.DELETE_COMMENT_SUCCESS
});

export const deleteCommentFailure = (err) => ({
  type: CommentActionTypes.DELETE_COMMENT_FAILURE,
  payload: err
});
