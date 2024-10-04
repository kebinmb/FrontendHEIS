import { createAction, props } from "@ngrx/store";


export const loadInstutionList = createAction('[Institution List] Load Department List');

export const loadInstutionListSuccess = createAction('[Institution List] Load Department List Success',
    props<{institutionList:any[]}>()
);

export const loadInstutionListFailure = createAction('[Institution List] Load Department List Failure',
    props<{error:any}>()
);