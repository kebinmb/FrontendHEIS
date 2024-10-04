import { createAction, props } from "@ngrx/store";

export const loadUserNames = createAction('[User Name] Load User Names',
    props<{dailyReportsArray:any[]}>()
);

export const loadUserNamesSuccess = createAction('[User Names] Load User Names Success',
    props<{userNames:any[]}>()
);

export const loadUserNamesFailure = createAction('[User Names] Load User Names Failure',
    props<{error:any}>()
);

export const updateFinalDailyReports = createAction(
    '[User Names] Update Final Daily Reports',
    props<{finalDailyReports:any[]}>()
)