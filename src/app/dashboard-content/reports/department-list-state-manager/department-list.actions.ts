import { createAction, props } from "@ngrx/store";

export const loadDepartmentList = createAction('[Departments] Load Department List');

export const loadDepartmentListSuccess = createAction('[Departments] Load Department List Success',
    props<{departmentList:any[]}>()
);

export const loadDepartmentListFailure = createAction(
    '[Departments] Load Department List failure',
    props<{error:any}>()
);