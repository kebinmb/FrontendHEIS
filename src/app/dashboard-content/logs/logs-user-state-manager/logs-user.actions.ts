import { createAction, props } from "@ngrx/store";

export const loadUserLogsList = createAction('[Logs User] Load User in Logs');

export const loadUserLogsListSuccess = createAction('[Logs User] Load User in Logs Successfully',
    props<{userLogsList:any[]}>()
);

export const loadUserLogsListFailure = createAction('[Logs User] Load User in Logs Failed',
    props<{error:any[]}>()
)