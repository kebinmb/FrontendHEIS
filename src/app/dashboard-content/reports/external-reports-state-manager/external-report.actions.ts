import { createAction, props } from "@ngrx/store";

export const loadExternalReports = createAction(
    '[External Reports] Load External Reports',
    props<{month:any,year:any}>()
);

export const loadExternalReportsSuccess = createAction(
    '[External Reports] Load External Reports Success',
    props<{externalReports:any[]}>()
);

export const loadExternalreportsFailure = createAction(
    '[External Reports] Load External Reports Failure',
    props<{error:any}>()
);

export const loadUserList = createAction(
    '[User List From External Reports] Load User List from External Reports'
);

export const loadUserListSuccess = createAction(
    '[User List From External Reports] Load User List from External Reports Success',
    props<{userList:any[]}>()
);

export const loadUserListFailure = createAction(
    '[User List From External Reports] Load User List from External Reports Failure',
    props<{error:any}>()
)