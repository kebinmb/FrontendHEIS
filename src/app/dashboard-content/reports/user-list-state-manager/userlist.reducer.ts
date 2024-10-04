import { createReducer, on } from '@ngrx/store';
import {
  loadUserList,
  loadUserListSuccess,
  loadUserListFailure
} from './userlist.actions';

export interface UserState {
  userList: any[];
  loading: boolean;
  error: any;
}

export const initialState: UserState = {
  userList: [],
  loading: false,
  error: null
};

const _userReducer = createReducer(
  initialState,
  on(loadUserList, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadUserListSuccess, (state, { userList }) => ({
    ...state,
    userList,
    loading: false
  })),
  on(loadUserListFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);

export function userReducer(state:any, action:any) {
  return _userReducer(state, action);
}
