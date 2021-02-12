import { createSelector } from 'reselect';

export const selectDiscussion = (state) => state.discussion;

export const selectDiscussions = createSelector(
  [selectDiscussion],
  (discussion) => discussion.discussions
);

export const selectSelectedDiscussion = createSelector(
  [selectDiscussion],
  (discussion) => discussion.selectedDiscussion
);

export const selectDiscussionsLoaded = createSelector(
  [selectDiscussion],
  (discussion) => discussion.isFetching
);

export const selectErrorDiscussion = createSelector(
  [selectDiscussion],
  (discussion) => discussion.error
);
