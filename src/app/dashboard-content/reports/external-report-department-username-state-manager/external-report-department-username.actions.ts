import { createAction,props } from '@ngrx/store';

export const loadDepartmentUserNames = createAction('[Department and User Names] Load Department and User Names',
    props<{externalMonthlyReportsArray:any[]}>()
);

export const loadDepartmentUserNamesSuccess = createAction('[Department and User Names] Load Department and User Names Success',
    props<{departmentUserNames:any[]}>()
);

export const loadDepartmentUserNamesFailure = createAction('[Department and User Names] Load Department and User Names Failure',
    props<{error:any}>()
);

export const updateFinalExternalReports = createAction(
    '[Department and User Names]Update Final External Monthly Reports',
    props<{finalExternalMonthlyReports:any[]}>()
);