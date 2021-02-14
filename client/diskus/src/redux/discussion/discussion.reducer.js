import { DiscussionActionTypes } from './discussion.types';

const INITIAL_STATE = {
  discussions: null,
  selectedDiscussion: null,
  isFetching: false,
  error: null,
  isLoading: false
};

const discussionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DiscussionActionTypes.CREATE_DISCUSSION_START:
      return {
        ...state,
        isLoading: true
      };
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
        error: null,
        isLoading: false
      };
    case DiscussionActionTypes.CREATE_DISCUSSION_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case DiscussionActionTypes.DELETE_DISCUSSION_START:
      return {
        ...state,
        isLoading: true
      };
    case DiscussionActionTypes.DELETE_DISCUSSION_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case DiscussionActionTypes.DELETE_DISCUSSION_FAILURE:
      return {
        ...state,
        isLoading: false
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
    case DiscussionActionTypes.VOTE_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case DiscussionActionTypes.CLEAN_ERROR_DISCUSSION:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default discussionReducer;
