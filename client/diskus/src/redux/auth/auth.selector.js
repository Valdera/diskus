import { createSelector } from 'reselect';

const selectUser = (state) => state.auth;

export const selectCurrentUser = createSelector(
  [selectUser],
  (auth) => auth.currentUser
);

export const selectSelectedUser = createSelector(
  [selectUser],
  (auth) => auth.selectedUser
);

export const selectErrorUser = createSelector(
  [selectUser],
  (auth) => auth.error
);
