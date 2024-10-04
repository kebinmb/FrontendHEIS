import { createSelector,createFeatureSelector } from '@ngrx/store';
import { ExternalMonthlyReportState } from './external-report.reducer';

export const selectExternalMonthlyReportState = createFeatureSelector<ExternalMonthlyReportState>('externalReports');

export const selectAllExternalReports = createSelector(
    selectExternalMonthlyReportState,
    (state:ExternalMonthlyReportState)=>state.externalReports
);

export const selectExternalReportsLoading = createSelector(
    selectExternalMonthlyReportState,
    (state:ExternalMonthlyReportState)=>state.loading
);

export const selectExternalReportsError = createSelector(
    selectExternalMonthlyReportState,
    (state:ExternalMonthlyReportState)=>state.error
);

