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

export const selectMessageUser = createSelector(
  [selectUser],
  (auth) => auth.message
);

export const selectIsLoadingUser = createSelector(
  [selectUser],
  (auth) => auth.isLoading
);
