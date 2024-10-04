import { createAction,props } from "@ngrx/store";

export const loadDepartmentNames = createAction('[Department Name] Load Department Names',
    props<{monthlyReportsArray:any[]}>()
);

export const loadDepartmentNamesSuccess = createAction('[Department Names] Load Department Names Success',
    props<{departmentNames:any[]}>()
);

export const loadDepartmentNamesFailure = createAction('[Department Names] Load Department Names Failure',
    props<{error:any}>()
);

export const updateFinalMonthlyReports = createAction(
    '[Department Names] Update Final Monthly Reports',
    props<{finalMonthlyReports:any[]}>()
);

export const loadUserList = createAction(
    '[User List] Load User List',
);

export const loadUserListSuccess = createAction(
    '[User List] Load User List Success',
    props<{userList:any[]}>()
);

export const loadUserListFailure = createAction(
    '[User List] Load User List Failure',
    props<{error:any}>()
);