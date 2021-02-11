import { DiscussionActionTypes } from './discussion.types';

const INITIAL_STATE = {
  discussions: null,
  selectedDiscussion: null,
  isFetching: false,
  error: null
};

const discussionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DiscussionActionTypes.FETCH_DISCUSSIONS_START:
      return {
        ...state,
        isFetching: true
      };
    case DiscussionActionTypes.FETCH_DISCUSSIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        discussions: action.payload
      };
    case DiscussionActionTypes.FETCH_DISCUSSIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case DiscussionActionTypes.CREATE_DISCUSSION_SUCCESS:
      return {
        ...state,
        error: null
      };
    case DiscussionActionTypes.CREATE_DISCUSSION_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case DiscussionActionTypes.GET_DISCUSSION_START:
      return {
        ...state,
        isFetching: true
      };
    case DiscussionActionTypes.GET_DISCUSSION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case DiscussionActionTypes.GET_DISCUSSION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        selectedDiscussion: action.payload
      };
    default:
      return state;
  }
};

export default discussionReducer;
