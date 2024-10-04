import { createReducer, on } from '@ngrx/store';
import { loadDepartmentUserNames, loadDepartmentUserNamesFailure, loadDepartmentUserNamesSuccess, updateFinalExternalReports } from './external-report-department-username.actions';

export interface DepartmentUserNamesState {
    departmentUserNames: any[];
    finalExternalMonthlyReports: any[];
    loading: boolean;
    error: any;
}

export const initialState: DepartmentUserNamesState = {
    departmentUserNames: [],
    finalExternalMonthlyReports: [],
    loading: false,
    error: null
};

const _departmentUserNamesReducer = createReducer(
    initialState,
    on(loadDepartmentUserNames, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(loadDepartmentUserNamesSuccess, (state, { departmentUserNames }) => ({
        ...state,
        departmentUserNames,
        loading: false,
        error: null
    })),
    on(loadDepartmentUserNamesFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),
    on(updateFinalExternalReports, (state, { finalExternalMonthlyReports }) => ({
        ...state,
        finalExternalMonthlyReports
    }))
);

export function departmentUserNamesReducer(state: DepartmentUserNamesState | undefined, action: any) {
    return _departmentUserNamesReducer(state, action);
}
