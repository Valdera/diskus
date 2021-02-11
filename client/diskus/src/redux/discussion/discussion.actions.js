import { DiscussionActionTypes } from './discussion.types';

export const fetchDiscussionsStart = (query) => ({
  type: DiscussionActionTypes.FETCH_DISCUSSIONS_START,
  payload: query
});

export const fetchDiscussionsSuccess = (DiscussionsMap) => ({
  type: DiscussionActionTypes.FETCH_DISCUSSIONS_SUCCESS,
  payload: DiscussionsMap
});

export const fetchDiscussionsFailure = (errMessage) => ({
  type: DiscussionActionTypes.FETCH_DISCUSSIONS_FAILURE,
  payload: errMessage
});

export const createDiscussionStart = (data) => ({
  type: DiscussionActionTypes.CREATE_DISCUSSION_START,
  payload: data
});

export const createDiscussionSuccess = () => ({
  type: DiscussionActionTypes.CREATE_DISCUSSION_SUCCESS
});

export const createDiscussionFailure = (err) => ({
  type: DiscussionActionTypes.CREATE_DISCUSSION_FAILURE,
  payload: err
});

export const getDiscussionStart = (id) => ({
  type: DiscussionActionTypes.GET_DISCUSSION_START,
  payload: id
});

export const getDiscussionFailure = (err) => ({
  type: DiscussionActionTypes.GET_DISCUSSION_START,
  payload: err
});

// export const getDiscussionFailure = (err) => ({
//   type: DiscussionActionTypes.GET_DISCUSSION_START,
//   payload: err
// });
