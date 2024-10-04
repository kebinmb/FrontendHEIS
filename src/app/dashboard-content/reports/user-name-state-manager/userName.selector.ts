import { createFeatureSelector,createSelector } from "@ngrx/store";
import {UserNameState} from '../user-name-state-manager/userName.reducer'

export const selectUserNameState = createFeatureSelector<UserNameState>('userNames');

export const selectUserName = createSelector(
    selectUserNameState,
    (state:UserNameState)=> state.userNames
);

export const selectUserNameLoading = createSelector(
    selectUserNameState,
    (state:UserNameState)=>state.loading
);

export const selectedUserNameError = createSelector(
    selectUserNameState,
    (state:UserNameState)=>state.error
);

export const selectFinalDailyReports = createSelector(
    selectUserNameState,
    (state: UserNameState) => state.finalDailyReports
  );