import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DailyReportState } from './daily-report.reducer';

export const selectDailyReportState = createFeatureSelector<DailyReportState>('dailyReport');

export const selectAllReports = createSelector(
  selectDailyReportState,
  (state: DailyReportState) => state.reports
);

export const selectReportsLoading = createSelector(
  selectDailyReportState,
  (state: DailyReportState) => state.loading
);

export const selectReportsError = createSelector(
  selectDailyReportState,
  (state: DailyReportState) => state.error
);
