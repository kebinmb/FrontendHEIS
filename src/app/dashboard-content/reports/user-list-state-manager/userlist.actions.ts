import { createAction, props } from '@ngrx/store';

export const loadUserList = createAction('[User] Load User List');

export const loadUserListSuccess = createAction(
  '[User] Load User List Success',
  props<{ userList: any[] }>()
);

export const loadUserListFailure = createAction(
  '[User] Load User List Failure',
  props<{ error: any }>()
);