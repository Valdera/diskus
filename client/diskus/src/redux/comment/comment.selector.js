import { createSelector } from 'reselect';

const selectComment = (state) => state.comment;

export const selectErrorComment = createSelector(
  [selectComment],
  (comment) => comment.error
);

export const selectIsLoadingComment = createSelector(
  [selectComment],
  (comment) => comment.isLoading
);
