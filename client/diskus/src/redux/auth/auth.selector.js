import { createSelector } from 'reselect';

const selectUser = (state) => state.auth;

export const selectCurrentUser = createSelector(
  [selectUser],
  (auth) => auth.currentUser
);
