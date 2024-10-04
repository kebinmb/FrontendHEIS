import { createAction, props } from "@ngrx/store";

export const loadUserInstitutionList = createAction('[Institution Users] Load Institution Users');

export const loadUserInstitutionListSuccess = createAction('[Institution Users] Load Institution Users Success',
    props<{userInstitutionList:any[]}>()
);

export const loadUserInstitutionListFailure = createAction('[Institution Users] Load Institution Users Falure',
    props<{error:any[]}>()
);