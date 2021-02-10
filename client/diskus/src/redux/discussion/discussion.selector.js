import { createSelector } from 'reselect';

export const selectDiscussion = (state) => state.discussion;

export const selectDiscussions = createSelector(
  [selectDiscussion],
  (discussion) => discussion.discussions
);

export const selectDiscussionsLoaded = createSelector(
  [selectDiscussion],
  (discussion) => discussion.isFetching
);
