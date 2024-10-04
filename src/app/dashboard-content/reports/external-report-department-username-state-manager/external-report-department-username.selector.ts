import {createFeatureSelector,createSelector} from '@ngrx/store';
import { DepartmentUserNamesState } from './external-report-department-username.reducer';

export const selectDepartmentUserNamesState = createFeatureSelector<DepartmentUserNamesState>('departmentUserNames');

export const selectDepartmentUserName = createSelector(
    selectDepartmentUserNamesState,
    (state:DepartmentUserNamesState)=>state.departmentUserNames
);

export const selectDepartmentUserNameLoading = createSelector(
    selectDepartmentUserNamesState,
    (state:DepartmentUserNamesState)=>state.loading
);

export const selectDepartmentUserNameFailure = createSelector(
    selectDepartmentUserNamesState,
    (state:DepartmentUserNamesState)=>state.error
);

export const selectFinalExternalMonthyReports = createSelector(
    selectDepartmentUserNamesState,
    (state:DepartmentUserNamesState)=>state.finalExternalMonthlyReports
);