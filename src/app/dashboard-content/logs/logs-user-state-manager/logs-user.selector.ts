import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserLogsState } from "./logs-user.reducer";

export const selectUserLogsState = createFeatureSelector<UserLogsState>('userLogs');

export const selectUserLogsList = createSelector(
    selectUserLogsState,
    (state:UserLogsState)=>state.userLogsList
);

export const selectUserLogsLoading = createSelector(
    selectUserLogsState,
    (state:UserLogsState)=>state.loading
);

export const selectUserLogsFailure = createSelector(
    selectUserLogsState,
    (state:UserLogsState)=>state.error
);