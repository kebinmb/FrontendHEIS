import {createAction,props} from '@ngrx/store';

export const loadDailyReports = createAction(
    '[Daily Report] Load Daily Reports',
    props <{date:string}> ()
);

export const loadDailyReportsSuccess = createAction(
    '[Daily Report] Load Daily Reports Success',
    props<{reports:any[]}>()
)

export const loadDailyReportsFailure = createAction(
    '[Daily Report] Load Daily Reports Failure',
    props<{error :any}>()
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