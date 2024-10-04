import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MonthlyReportsState } from "./monthly-reports.reducer";


export const selectMonthlyReportsState = createFeatureSelector<MonthlyReportsState>('monthlyReports');

export const selectAllMonthlyReports = createSelector(
    selectMonthlyReportsState,
    (state:MonthlyReportsState)=>state.monthlyReports
);

export const selectMonthlyReportsLoading = createSelector(
    selectMonthlyReportsState,
    (state:MonthlyReportsState)=>state.loading
);

export const selectMonthlyReportsError = createSelector(
    selectMonthlyReportsState,
    (state:MonthlyReportsState)=>state.error
);